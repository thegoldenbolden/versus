export const versusKeys = {
 all: ["versus"] as const,
 lists: () => [...versusKeys.all, "list"] as const,
 list: (filters: any = {}) => [...versusKeys.lists(), { ...filters }] as const,
 details: () => [...versusKeys.all, "detail"] as const,
 detail: (id: string) => [...versusKeys.details(), id] as const,
};
