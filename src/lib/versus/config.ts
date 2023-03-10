type VersusConfig = {
 MAX_VERSUS_PER_PAGE: 20 | 5;
 MAX_COMMENTS_PER_PAGE: 20;

 MAX_VERSUS_TITLE_LENGTH: 100;
 MAX_VERSUS_DESCRIPTION_LENGTH: 768;
 MAX_VERSUS_OPTION_LENGTH: 100;
 MAX_COMMENT_LENGTH: 300;
 MAX_USERNAME_LENGTH: 32;
 MAX_NAME_LENGTH: 100;

 REGEX_DESCRIPTION: RegExp;
 REGEX_COMMENT: RegExp;
 REGEX_TITLE: RegExp;
 REGEX_OPTIONS: RegExp;
 REGEX_USERNAME: RegExp;
 REGEX_NAME: RegExp;
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

 MAX_USERNAME_LENGTH: 32,
 REGEX_USERNAME: /^[a-zA-Z0-9._]{1,32}$/,

 MAX_NAME_LENGTH: 100,
 REGEX_NAME: /^[a-zA-Z0-9'\s._]{1,100}$/,
};

export default CONFIG;
