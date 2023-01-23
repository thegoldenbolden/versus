// prettier-ignore
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useReducer, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// prettier-ignore
import Schemas, { Description, Options, SchemaTypes, Title } from "@lib/zod-schemas/versus";
import { postRequest } from "@lib/make-requests";
import CONFIG from "@lib/versus/config";

import { ICheckmarkFill } from "../ui/icons";
import Spinner from "../loading/spinner";
import ErrorBoundary from "../error-boundary";
import Preview from "../versus/preview";
import Tabs from "../ui/tabs";
import Accordion from "../ui/accordion";

const initial: State = {
 values: {
  title: "",
  "option-one": "",
  "option-two": "",
  description: "",
  tags: [],
  nsfw: false,
 },
 errors: {
  description: null,
  tags: null,
  nsfw: null,
  title: null,
  "option-one": null,
  "option-two": null,
 },
};

export default function Create(props: { user: User; closeModal: CloseModal }) {
 const [{ values, errors }, dispatch] = useReducer(reducer, initial);
 const [tab, setTab] = useState(0);

 const queryClient = useQueryClient();

 const mutation = useMutation({
  mutationFn: async (versus: SchemaTypes["PostVersus"]) => {
   const response = await postRequest<SchemaTypes["PostVersus"]>("/api/versus", {
    ...versus,
    options: Array.from(versus.options),
   });
   return response.data.ok ? response.data.data : null;
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["versus"] });
   dispatch({ type: "reset" });
  },
 });

 const hasErrors: boolean = Object.values(errors).some(
  (error) => typeof error === "string"
 );

 const handleOptionInput: HandleInput = (e) => {
  const { value, id: key } = e.target;
  if (key !== "option-one" && key !== "option-two") return;
  const inactiveKey = key === "option-one" ? "option-two" : "option-one";

  const parsed = Options.safeParse(
   key === "option-one" ? [value, values["option-two"]] : [values["option-one"], value]
  );

  if (errors[key] && parsed.success) {
   dispatch({ type: "set-error", key, error: null });

   if (errors[inactiveKey] === "No duplicates allowed") {
    dispatch({ type: "set-error", key: inactiveKey, error: null });
   }
  }

  dispatch({ type: "set-value", key, value });
 };

 const handleInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
  const { value, id: key } = e.target as { value: string; id: "title" | "description" };
  if (key !== "title" && key !== "description") return;
  const Parse = key === "title" ? Title : Description;
  const parsed = Parse.safeParse(value);

  if (errors[key] && parsed.success) {
   dispatch({ type: "set-error", key, error: null });
  }

  dispatch({ type: "set-value", key, value });
 };

 const handleTagSelect = (id: number) => {
  const key = "tags";
  const type = "set-value";
  const { tags } = values;
  const toRemove = tags.some((tagId: number) => tagId === id);
  if (!toRemove) return dispatch({ type, key, value: [...tags, id] });
  dispatch({ type, key, value: tags.filter((tagId: number) => tagId !== id) });
  return;
 };

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  if (mutation.isLoading) return;

  const validated = Schemas.Versus.safeParse({
   title: values.title,
   // prettier-ignore
   description: values.description.trim().length > 0 ? values.description.trim() : undefined,
   nsfw: values.nsfw,
   tags: values.tags,
   options: [values["option-one"], values["option-two"]],
   userId: props.user.id,
  });

  if (!validated.success) {
   validated.error.issues.forEach((issue) => {
    issue.path.forEach((path) => {
     const key = path.toString() as VersusDataKeys;
     if (errors[key] !== null) return;
     dispatch({ type: "set-error", key, error: issue.message });
    });
   });
   return;
  }

  mutation.mutate(validated.data);
 };

 return (
  <ErrorBoundary>
   <Tabs tabs={[{ text: "Create" }, { text: "Preview" }]} tab={tab} setTab={setTab} />
   <form
    noValidate
    id="create-versus"
    aria-labelledby="Create versus"
    className="flex flex-col w-full gap-4 py-2 bg-transparent border-t-2 border-t-solid border-t-smoky-black-translucent dark:border-t-lotion-translucent"
    onSubmit={handleSubmit}
   >
    {mutation.isError && (
     <span className="px-2">
      <FormError error={(mutation.error as any).message ?? ""} />
     </span>
    )}

    {tab === 0 ? (
     <div className="flex flex-col gap-4 px-4 grow">
      <div className="flex flex-col gap-1">
       <label
        htmlFor="title"
        className="text-sm font-bold after:content-['_*'] after:text-red-600"
       >
        Title
       </label>
       <input
        minLength={1}
        maxLength={CONFIG.MAX_VERSUS_TITLE_LENGTH}
        id="title"
        name="title"
        title={`A title with at most ${CONFIG.MAX_VERSUS_TITLE_LENGTH} alphanumeric characters is required`}
        autoComplete="off"
        aria-autocomplete="none"
        type="text"
        className="px-4 py-2 border-2 border-solid rounded-md border-smoky-black-translucent dark:border-lotion-translucent"
        required
        value={values.title}
        aria-required
        placeholder="Enter a title"
        onChange={handleInput}
       />
       <FormError error={errors.title} />
      </div>
      <div className="flex flex-col w-full gap-2">
       <Option
        id="option-one"
        value={values["option-one"]}
        error={errors["option-one"]}
        handleInput={handleOptionInput}
       />
       <Option
        id="option-two"
        value={values["option-two"]}
        error={errors["option-two"]}
        handleInput={handleOptionInput}
       />
      </div>
      <div className="flex flex-col gap-2">
       <Accordion.Container>
        <Accordion.Button>
         <div>
          <label className="text-sm font-bold" htmlFor="description">
           Description
          </label>
         </div>
        </Accordion.Button>
        <Accordion.Panel>
         <textarea
          minLength={1}
          maxLength={CONFIG.MAX_VERSUS_DESCRIPTION_LENGTH}
          id="description"
          value={values.description}
          name="description"
          placeholder="Enter a description"
          title={`A description must be less than or equal to ${CONFIG.MAX_VERSUS_DESCRIPTION_LENGTH} characters`}
          className="w-full px-4 py-2 border-2 border-solid rounded-md resize-none border-smoky-black-translucent dark:border-lotion-translucent"
          onChange={handleInput}
         />
         <FormError error={errors.description} />
        </Accordion.Panel>
       </Accordion.Container>
      </div>
      <div className="flex flex-col gap-2">
       <Accordion.Container>
        <Accordion.Button className="">
         <label className="text-sm font-bold" htmlFor="tags">
          <span>Tags</span>
         </label>
        </Accordion.Button>
        <Accordion.Panel>
         <div
          role="listbox"
          aria-multiselectable={true}
          title="Select tags for the versus"
          id="tags"
          className="flex flex-wrap gap-2 p-2 border-2 border-solid rounded-md xs:grid xs:grid-cols-2 border-smoky-black-tramslucent dark:border-lotion-translucent"
         >
          {CONFIG.TAGS.map((tag) => {
           const active = values.tags.some((t: any) => t === tag.id);
           const activeClass = active
            ? "border-smoky-black-translucent bg-smoky-black-translucent dark:border-lotion-translucent dark:bg-lotion-translucent"
            : "border-transparent bg-transparent focus:bg-transparent";
           return (
            <button
             role="option"
             aria-selected={active}
             aria-labelledby={`add the tag ${tag.name}`}
             title={tag.name}
             type="button"
             className={`${activeClass} hover:dark:bg-lotion-translucent hover:bg-smoky-black-translucent border-solid border-2 px-2 text-sm rounded-sm items-center flex gap-2`}
             onClick={() => handleTagSelect(tag.id)}
             key={tag.id}
            >
             {active && <ICheckmarkFill />}
             {tag.name}
            </button>
           );
          })}
         </div>
        </Accordion.Panel>
       </Accordion.Container>
      </div>
     </div>
    ) : (
     <Preview
      title={values.title}
      options={[values["option-one"], values["option-two"]]}
      description={values.description}
      tags={values.tags}
      author={{
       name: props.user.name ?? "Anonymous",
       username: props.user.username ?? "Anonymous",
       image: props.user.image ?? "",
      }}
     />
    )}
    <div className="flex w-full gap-2 px-4 wrap">
     <button
      type="button"
      onClick={() => props.closeModal()}
      title="Back"
      aria-labelledby="close versus dialog"
      className="flex items-center justify-center w-full py-2 rounded-sm bg-zinc-700 drop-shadow-md text-lotion font-display"
     >
      Back
     </button>
     <button
      aria-disabled={mutation.isLoading || hasErrors}
      className="flex items-center justify-center w-full py-2 transition-colors rounded-sm bg-primary dark:bg-secondary drop-shadow-md text-lotion font-display"
      disabled={mutation.isLoading || hasErrors}
      type={mutation.isLoading ? "button" : "submit"}
     >
      {mutation.isLoading ? (
       <span className="flex items-center gap-4">
        <Spinner border="border-b-lotion dark:border-b-lotion border-l-lotion dark:border-l-lotion" />{" "}
        Creating versus..
       </span>
      ) : (
       "Create"
      )}
     </button>
    </div>
   </form>
  </ErrorBoundary>
 );
}

function FormError({ error }: { error: string | null }) {
 if (!error) return null;
 return <span className="text-xs font-bold text-red-600">{error}</span>;
}

function Option(data: OptionProps) {
 return (
  <div className="flex flex-col gap-2 grow">
   <label
    className="text-sm font-bold after:content-['_*'] after:text-red-600"
    htmlFor={data.id}
   >
    Contender
   </label>
   <FormError error={data.error} />
   <input
    minLength={1}
    maxLength={CONFIG.MAX_VERSUS_OPTION_LENGTH}
    id={data.id}
    autoComplete="off"
    name="Contender"
    title={`Contenders must be at most ${CONFIG.MAX_VERSUS_OPTION_LENGTH} alphanumeric characters and be distinct`}
    type="text"
    value={data.value}
    required
    aria-required
    placeholder={data.id === "option-one" ? "e.g. Apple Music" : "e.g. Spotify"}
    onChange={data.handleInput}
    className="px-4 py-2 border-2 border-solid rounded-md border-smoky-black-translucent dark:border-lotion-translucent"
   />
  </div>
 );
}

function reducer(state: State, action: Action): State {
 switch (action.type) {
  default:
   throw new Error("Invalid action type");
  case "set-value":
   return { ...state, values: { ...state.values, [action.key]: action.value } };
  case "set-error":
   return { ...state, errors: { ...state.errors, [action.key]: action.error } };
  case "reset":
   return {
    ...state,
    values: {
     title: "",
     "option-one": "",
     "option-two": "",
     description: "",
     tags: [],
     nsfw: false,
    },
    errors: {
     description: null,
     tags: null,
     nsfw: null,
     title: null,
     "option-one": null,
     "option-two": null,
    },
   };
 }
}

type User = {
 id: string;
 name?: string | null;
 username?: string | null;
 image?: string | null;
};

type HandleInput = ChangeEventHandler<HTMLInputElement>;
type OptionProps = {
 error: string | null;
 value: string;
 handleInput: HandleInput;
 id: "option-one" | "option-two";
};

type CloseModal = () => void;

type StateVersusValue = {
 title: string;
 ["option-one"]: string;
 ["option-two"]: string;
 description: string;
 tags: number[];
 nsfw: boolean;
};

type StateVersusError = Record<keyof StateVersusValue, string | null>;
type State = { values: StateVersusValue; errors: StateVersusError };
type VersusDataKeys = keyof StateVersusValue;

type Action =
 | { type: "set-value"; key: VersusDataKeys; value: StateVersusValue[VersusDataKeys] }
 | { type: "set-error"; key: VersusDataKeys; error: StateVersusError[VersusDataKeys] }
 | { type: "reset" };
