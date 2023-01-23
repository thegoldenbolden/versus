import type { QueryClient } from "@tanstack/react-query";

export function optimisticLike(qc: QueryClient, versusId: string) {
 const queries = qc.getQueriesData<Versus.MutateFeed | Versus.Versus>(["versus"]);

 if (queries) {
  queries.forEach(([query, snapshot]) => {
   if (snapshot) {
    snapshot = snapshot as Versus.MutateFeed;
    if (!snapshot.pages) {
     // Remove specific versus from query.
     snapshot = snapshot as unknown as Versus.Versus;
     if (snapshot.id.toString() === versusId) {
      qc.setQueryData(query, {
       ...snapshot,
       userLikes: !snapshot.userLikes,
       likes: snapshot.likes + (snapshot.userLikes ? -1 : 1),
      });
     }
     return;
    }

    qc.setQueryData(query, {
     pageParams: snapshot.pageParams,
     pages: snapshot.pages.map((snap) => ({
      ...snap,
      items: snap.items.map((item) => {
       if (item.id.toString() !== versusId) return item;
       return {
        ...item,
        userLikes: !item.userLikes,
        likes: item.likes + (item.userLikes ? -1 : 1),
       };
      }),
     })),
    });
   }
  });
 }

 return { queries };
}

export function optimisticDelete(qc: QueryClient, versusId: string) {
 const queries = qc.getQueriesData<Versus.MutateFeed | Versus.Versus>(["versus"]);

 if (queries) {
  queries.forEach(([query, snapshot]) => {
   if (snapshot) {
    snapshot = snapshot as Versus.MutateFeed;
    if (!snapshot.pages) {
     // Remove specific versus from query.
     snapshot = snapshot as unknown as Versus.Versus;
     if (snapshot.id.toString() === versusId) {
      qc.removeQueries({ queryKey: query });
     }
     return;
    }

    qc.setQueryData<Versus.MutateFeed>(query, (old) => {
     if (!old) return old;
     return {
      ...old,
      pages: old.pages.map((page) => ({
       ...page,
       items: page.items.filter((item) => item.id.toString() !== versusId),
      })),
     };
    });
   }
  });
 }

 return { queries };
}

export function optimisticVote(qc: QueryClient, versusId: string, optionId: string) {
 const queries = qc.getQueriesData<Versus.MutateFeed<Versus.Versus> | Versus.Versus>([
  "versus",
 ]);

 if (queries) {
  optionId = optionId.toString();

  queries.forEach(([query, snapshot]) => {
   if (snapshot) {
    snapshot = snapshot as Versus.MutateFeed<Versus.Versus>;
    if (!snapshot.pages) {
     snapshot = snapshot as unknown as Versus.Versus;
     // Remove specific versus from query.
     if (snapshot.id.toString() === versusId) {
      qc.setQueryData<Versus.Versus>(["versus", { versusId }], (old) => {
       if (!old) return old;

       return {
        ...old,
        userCanVote: false,
        options: old.options.map((option) => {
         if (option.id.toString() !== optionId) return option;
         return { ...option, votes: option.votes + 1 };
        }),
       };
      });
     }
     return;
    }

    qc.setQueryData<Versus.MutateFeed<Versus.Versus>>(query, (old) => {
     if (!old) return old;
     return {
      pageParams: old.pageParams,
      pages: old.pages.map((page) => ({
       ...page,
       items: page.items.map((item) => {
        if (item.id.toString() !== versusId) return item;
        return {
         ...item,
         userCanVote: false,
         options: item.options.map((option) => {
          if (option.id !== optionId) return option;
          return { ...option, votes: option.votes + 1 };
         }),
        };
       }),
      })),
     };
    });
   }
  });
 }

 return { queries };
}
