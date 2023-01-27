const versusKeys = {
 all: ["versus"] as const,
 details: () => [...versusKeys.all, "detail"] as const,
 detail: (versusId: string) => [...versusKeys.details(), versusId] as const,

 lists: () => [...versusKeys.all, "list"] as const,
 list: (filters: any = {}) => [...versusKeys.lists(), { ...filters }] as const,
 likes: (userId: string) => [...versusKeys.lists(), userId, "likes"] as const,
 votes: (userId: string) => [...versusKeys.lists(), userId, "votes"] as const,
 versus: (userId: string) => [...versusKeys.lists(), userId, "versus"] as const,

 users: () => [...versusKeys.all, "user"] as const,
 user: (filters: UserFilters) => [...versusKeys.users(), filters] as const,
};

type UserFilters = {
 sessionUserId?: string | null;
 username?: string | null;
 type?: "createdVersus" | "votedVersus" | "likedVersus";
};

export default versusKeys;
