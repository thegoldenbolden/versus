import { ChangeEventHandler, FormEventHandler, useReducer } from "react";
import { GetServerSideProps } from "next";

import { validatePostPrompt } from "@lib/versus/validate";
import { MAX_MESSAGE_LENGTH, TAGS } from "@lib/constants";
import { makePostRequest } from "@lib/make-requests";
import { ICheckmark } from "@components/icons";
import ErrorBoundary from "@components/error";
import useRequest from "@hooks/useRequest";
import Spinner from "@components/spinner";
import RootLayout from "@layouts/root";
import getUser from "@lib/get-user";

// # TODO: improve

const initial = {
 title: "",
 description: "",
 options: [] as string[],
 tags: [] as string[],
};

const reducer = (state: any, payload: any) => {
 switch (payload.type) {
  default:
   throw new Error("Type not supported");
  case "description":
   return { ...state, [payload.type]: payload.description };
  case "title":
   return { ...state, [payload.type]: payload.title };
  case "options":
   return { ...state, [payload.type]: payload.options };
  case "tags":
   return { ...state, [payload.type]: payload.tags };
  case "reset":
   return { ...initial };
 }
};

const Create = (props: { uid: string }) => {
 const [state, dispatch] = useReducer(reducer, initial);

 const request = useRequest(async () => {
  const validated = validatePostPrompt({
   uid: props.uid,
   title: state.title,
   description: state.description,
   options: state.options,
   tags: state.tags,
  });

  await makePostRequest("/api/prompts", validated, "POST").then(() => {
   request.error && request.setError(null);
   request.reset(() => dispatch({ type: "reset" }));
  });
 });

 const handleInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
  const { value, id } = e.target;
  const type =
   id === "description" ? "description" : id === "title" ? "title" : "options";
  dispatch({
   type: type,
   [type]:
    id === "option-one"
     ? [value, state?.options[1]]
     : id === "option-two"
     ? [state?.options[0], value]
     : value,
  });
  request.setError(null);
 };

 const handleTagSelect = (id: number) => {
  const toRemove = state.tags.some((tId: number) => tId === id);
  if (toRemove) {
   dispatch({
    type: "tags",
    tags: state.tags.filter((tId: number) => tId !== id),
   });
  } else {
   dispatch({
    type: "tags",
    tags: [...state.tags, id],
   });
  }
 };

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  request.trigger();
 };

 return (
  <div className="min-h-screen flex flex-col items-center xs:justify-center">
   <ErrorBoundary>
    <form
     id="create-versus"
     title="Create Versus"
     className="rounded-md shadow-lg shadow-black bg-transparent flex flex-col gap-4 p-4 w-full sm:max-w-[640px]"
     onSubmit={handleSubmit}
    >
     <h1 className="font-display text-3xl">Create A Versus</h1>
     {request.error && <span className="text-red-500">{request.error}</span>}
     {request.success && <span className="text-green-500">Created versus!</span>}

     <div className="flex flex-col gap-2">
      <label
       className="text-sm opacity-75 border-b-2 border-b-black/25 w-max font-bold"
       htmlFor="title"
      >
       Title
      </label>
      <input
       minLength={2}
       maxLength={128}
       id="title"
       name="title"
       pattern="^[\w\s.,!?\x22']{1,128}"
       title="Title must contain alphanumeric characters and up to 128 characters"
       autoComplete="off"
       aria-autocomplete="none"
       className="p-2 border-b-solid border-b-2 border-b-white/50 hover:border-b-white focus:border-b-white"
       type="text"
       required
       value={state.title}
       aria-required
       placeholder="Enter a title"
       onChange={handleInput}
      />
     </div>
     <div className="flex flex-wrap gap-2 w-full">
      <div className="flex flex-col gap-2 grow">
       <label
        className="text-sm opacity-75 border-b-2 border-b-black/25 w-max font-bold"
        htmlFor="option-one"
       >
        Option One
       </label>
       <input
        minLength={3}
        maxLength={128}
        id="option-one"
        autoComplete="off"
        name="Option One"
        title="Enter the first option for the versus"
        type="text"
        value={state.options[0]}
        pattern="^[\w\s.,!?\x22']{1,128}"
        required
        aria-required
        placeholder="e.g. Spotify"
        onChange={handleInput}
        className="p-2 border-b-solid border-b-2 border-b-white/50 hover:border-b-white focus:border-b-white"
       />
      </div>
      <div className="flex flex-col gap-2 w-full xs:w-max xs:grow">
       <label
        className="text-sm opacity-75 border-b-2 border-b-black/25 w-max font-bold"
        htmlFor="option-two"
       >
        Option Two
       </label>
       <input
        minLength={3}
        maxLength={128}
        autoComplete="off"
        id="option-two"
        name="Option Two"
        type="text"
        title="Enter the second option for the versus"
        pattern="^[\w\s.,!?\x22']{1,128}"
        required
        aria-required
        value={state.options[1]}
        onChange={handleInput}
        placeholder="e.g. Apple Music"
        className="p-2 border-b-solid border-b-2 border-b-white/50 hover:border-b-white focus:border-b-white"
       />
      </div>
     </div>
     <div className="flex flex-col gap-2">
      <label
       className="text-sm opacity-75 border-b-2 border-b-black/25 w-max font-bold"
       htmlFor="description"
      >
       Description
      </label>
      <textarea
       minLength={2}
       maxLength={MAX_MESSAGE_LENGTH}
       id="description"
       value={state.description}
       name="description"
       placeholder="Enter a description"
       title="Enter a description"
       className="outline-none p-2 border-b-solid border-b-2 border-b-white/50 hover:border-b-white focus:border-b-white"
       onChange={handleInput}
      />
     </div>
     <div className="flex flex-col gap-2">
      <label
       className="text-sm opacity-75 border-b-2 border-b-black/25 w-max font-bold"
       htmlFor="tags"
      >
       Tags
      </label>
      <div title="Select tags for the versus" id="tags" className="flex flex-wrap gap-2">
       {TAGS.map((tag) => {
        const active = state.tags.some((t: any) => t === tag.id);
        const activeClass = active ? "border-sky-900" : "border-transparent";
        return (
         <button
          title={tag.name}
          type="button"
          className={`${activeClass} hover:bg-sky-100/25 border-solid border-2 px-2 text-xs items-center flex gap-2`}
          onClick={() => handleTagSelect(tag.id)}
          key={tag.id}
         >
          {active && <ICheckmark />}
          {tag.name}
         </button>
        );
       })}
      </div>
     </div>
     <div className="self-end flex flex-wrap gap-2">
      <button
       className="font-display text-xl rounded-sm px-4 py-1 min-w-[100px] hover:bg-green-300 focus:bg-green-300"
       type="reset"
       onClick={() => dispatch({ type: "reset" })}
      >
       Clear
      </button>
      <button
       className="font-display text-xl rounded-sm px-4 py-1 min-w-[100px] hover:bg-green-300 focus:bg-green-300"
       disabled={request.submitting}
       type="submit"
      >
       {request.submitting ? <Spinner /> : "Post"}
      </button>
     </div>
    </form>
   </ErrorBoundary>
  </div>
 );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const session = await getUser(req, res);
 if (!session?.user.id) return { redirect: { destination: "/login", permanent: false } };
 return { props: { uid: session.user.id } };
};

Create.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Create;
