type VersusConfig = {
 MAX_VERSUS_PER_PAGE: 20 | 5;
 MAX_COMMENTS_PER_PAGE: 20;

 MAX_VERSUS_TITLE_LENGTH: 100;
 MAX_VERSUS_DESCRIPTION_LENGTH: 768;
 MAX_VERSUS_OPTION_LENGTH: 100;
 MAX_COMMENT_LENGTH: 300;

 REGEX_DESCRIPTION: RegExp;
 REGEX_COMMENT: RegExp;
 REGEX_TITLE: RegExp;
 REGEX_OPTIONS: RegExp;

 TAGS: { id: number; name: Versus.Tag }[];
};

const CONFIG: VersusConfig = {
 MAX_VERSUS_PER_PAGE: process.env.NODE_ENV === "development" ? 5 : 20,
 MAX_VERSUS_TITLE_LENGTH: 100,
 REGEX_TITLE: /^[a-zA-Z0-9\s.!?@#&:'\(\)\-\"]{1,100}$/,

 MAX_VERSUS_DESCRIPTION_LENGTH: 768,
 REGEX_DESCRIPTION: /^[a-zA-Z0-9\s.!?@#&:'\(\)\-\"]{1,768}$/,

 MAX_COMMENTS_PER_PAGE: 20,
 MAX_COMMENT_LENGTH: 300,
 REGEX_COMMENT: /^[a-zA-Z0-9\s.!?@#&:'\(\)\-\"]{1,300}$/,

 MAX_VERSUS_OPTION_LENGTH: 100,
 REGEX_OPTIONS: /^[a-zA-Z0-9\s.!?@#&:'\(\)\-\"]{1,100}$/,

 TAGS: [
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
 ],
};

export default CONFIG;
