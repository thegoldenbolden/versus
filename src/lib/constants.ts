export const BASE_URL =
 process.env.NODE_ENV === "production"
  ? "https://versuszero.vercel.app"
  : "http://localhost:3000";

export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_COMMENTS_PER = 10;
export const MAX_PROMPTS_PER = 20;

export const TAGS: { id: number; name: string }[] = [
 { id: 1, name: "Pop Culture" },
 { id: 2, name: "Food & Drink" },
 { id: 3, name: "Technology" },
 { id: 4, name: "TV Shows & Movies" },
 { id: 5, name: "Nature & Science" },
 { id: 6, name: "Anime & Manga" },
 { id: 7, name: "Life" },
 { id: 8, name: "Violence" },
 { id: 9, name: "Fantasy" },
 { id: 10, name: "Art & Music" },
 { id: 11, name: "Games" },
 { id: 12, name: "Occupations" },
 { id: 13, name: "Travel" },
 { id: 14, name: "Fashion" },
 { id: 15, name: "Suffering" },
 { id: 16, name: "Sports" },
];
