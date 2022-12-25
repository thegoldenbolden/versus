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
import Head from "next/head";

// # TODO: improve

const initial = {
 title: "",
 description: "",
 options: ["", ""] as string[],
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
   return { title: "", description: "", options: [] as string[], tags: [] as string[] };
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

  request.reset(() => dispatch({ type: "reset" }));
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
  <>
   <Head>
    <title>VersusZero</title>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8d07a" />
    <meta name="msapplication-TileColor" content="#f8d07a" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="description" content="Create a versus" />
   </Head>
   <div className="min-h-screen flex flex-col items-center xs:justify-center">
    <ErrorBoundary>
     <form
      id="create-versus"
      title="Create Versus"
      className="rounded-md bg-transparent flex flex-col gap-4 p-4 w-full sm:max-w-[640px]"
      onSubmit={handleSubmit}
     >
      <h1 className="font-display text-3xl">Create A Versus</h1>
      {request.error && <span className="text-red-500">{request.error}</span>}
      {request.success && <span className="text-green-500">Created versus!</span>}

      <div className="flex flex-col gap-2">
       <label
        className="text-sm opacity-75 border-b-2 border-b-dark/25 dark:border-b-light/75  w-max font-bold"
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
        className="p-2 border-b-solid border-b-2 dark:border-b-white/50 hover:dark:border-b-light focus:dark:border-b-light border-b-dark/25 hover:border-b-dark focus:border-b-dark"
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
         className="text-sm opacity-75 border-b-2 border-b-black/25 dark:border-b-light/75 w-max font-bold"
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
         className="p-2 border-b-solid border-b-2 dark:border-b-white/50 hover:dark:border-b-light focus:dark:border-b-light border-b-dark/25 hover:border-b-dark focus:border-b-dark"
        />
       </div>
       <div className="flex flex-col gap-2 w-full xs:w-max xs:grow">
        <label
         className="text-sm opacity-75 border-b-2 border-b-black/25 dark:border-b-light/75 w-max font-bold"
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
         className="p-2 border-b-solid border-b-2 dark:border-b-white/50 hover:dark:border-b-light focus:dark:border-b-light border-b-dark/25 hover:border-b-dark focus:border-b-dark"
        />
       </div>
      </div>
      <div className="flex flex-col gap-2">
       <label
        className="text-sm opacity-75 border-b-2 border-b-black/25 dark:border-b-light/75 w-max font-bold"
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
        className="outline-none p-2 border-b-solid border-b-2 dark:border-b-white/50 hover:dark:border-b-light focus:dark:border-b-light border-b-dark/25 hover:border-b-dark focus:border-b-dark"
        onChange={handleInput}
       />
      </div>
      <div className="flex flex-col gap-2">
       <label
        className="text-sm opacity-75 border-b-2 border-b-black/25 dark:border-b-light/75 w-max font-bold"
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
        className="font-display transition-colors text-xl color-theme rounded-full px-4 border-solid border-2 border-red-800 py-1 min-w-[100px] hover:text-light focus:text-light hover:bg-red-800 focus:bg-red-800"
        type="reset"
        onClick={() => dispatch({ type: "reset" })}
       >
        Clear
       </button>
       <button
        className="font-display transition-colors text-xl color-theme rounded-full px-4 py-1 border-solid border-2 border-indigo-700 min-w-[100px] hover:text-light focus:text-light hover:bg-indigo-700 focus:bg-indigo-700"
        disabled={request.submitting}
        type="submit"
       >
        {request.submitting ? <Spinner /> : "Post"}
       </button>
      </div>
     </form>
    </ErrorBoundary>
   </div>
  </>
 );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const session = await getUser(req, res);
 if (!session?.user.id) return { redirect: { destination: "/login", permanent: false } };
 return { props: { uid: session.user.id } };
};

Create.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Create;
