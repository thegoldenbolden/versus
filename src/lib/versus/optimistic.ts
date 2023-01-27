import type { QueryClient } from "@tanstack/react-query";
import versusKeys from "./queryKeys";

const Optimistic: OptimisicUpdates = {
 remove(qc, versusId) {
  qc.setQueriesData<Versus.MutateFeed<Versus.Versus>>(versusKeys.lists(), (previous) => {
   if (!previous) return previous;
   return {
    pageParams: previous.pageParams,
    pages: previous.pages.map((page) => {
     return {
      ...page,
      items: page.items.filter((item) => item.id.toString() !== versusId),
     };
    }),
   };
  });
 },
 like(qc, versusId) {
  // Update single versus in cache.
  qc.setQueryData<Versus.Versus>(versusKeys.detail(versusId), (previous) => {
   if (!previous) return previous;
   return {
    ...previous,
    userLikes: !previous.userLikes,
    likes: previous.likes + (previous.userLikes ? -1 : 1),
   };
  });

  // Update all feeds where versus is included.
  qc.setQueriesData<Versus.MutateFeed<Versus.Versus>>(versusKeys.lists(), (previous) => {
   if (!previous) return previous;
   return {
    pageParams: previous.pageParams,
    pages: previous.pages.map((page) => {
     return {
      ...page,
      items: page.items.map((item) => {
       if (item.id.toString() !== versusId) return item;
       return {
        ...item,
        userLikes: !item.userLikes,
        likes: item.likes + (item.userLikes ? -1 : 1),
       };
      }),
     };
    }),
   };
  });
 },
 vote(qc, versusId, optionId) {
  // Update single versus cache
  qc.setQueryData<Versus.Versus>(versusKeys.detail(versusId), (previous) => {
   if (!previous) return previous;
   return {
    ...previous,
    userCanVote: false,
    options: previous.options.map((option) => {
     if (option.id !== optionId) return option;
     return { ...option, votes: option.votes + 1 };
    }),
   };
  });

  // Update all feeds where versus is included.
  qc.setQueriesData<Versus.MutateFeed<Versus.Versus>>(versusKeys.lists(), (previous) => {
   if (!previous) return previous;
   return {
    pageParams: previous.pageParams,
    pages: previous.pages.map((page) => {
     return {
      ...page,
      items: page.items.map((item) => {
       if (item.id.toString() !== versusId) return item;
       return {
        ...item,
        userCanVote: false,
        options: item.options.map((option) => {
         if (optionId !== option.id) return option;
         return {
          ...option,
          votes: option.votes + 1,
         };
        }),
       };
      }),
     };
    }),
   };
  });
 },
};

export default Optimistic;
type OptimisicUpdates = {
 remove: (qc: QueryClient, versusId: string) => unknown;
 like: (qc: QueryClient, versusId: string) => unknown;
 vote: (qc: QueryClient, versusId: string, optionId?: string) => unknown;
};
