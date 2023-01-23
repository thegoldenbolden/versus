declare namespace Versus {
	interface Base {
		createdAt: string;
		author: Author;
	}

	interface Author {
		name: string;
		username: string | null;
		image: string | null;
	}

 interface Versus extends Base {
		id: number;
  title: string;
  description: string | null;
  likes: number;
  comments: number;
		tags: number[],
  userCanDelete: boolean;
  userCanVote: boolean;
		userLikes: boolean;
		status: "APPROVED" | "PENDING" | "REJECTED";
  options: { id: string; text: string; votes: number }[];
 };

	interface Comment extends Base {
		id: string;
		userCanDelete:boolean;
  userLikes: boolean;
		likes: number;
  message: string;
		parent: Author & Omit<Comment, "userCanDelete" | "userLikes" | "parent">
	};

	export type Tag = (
			'Anime & Manga' | "Art & Music" | 
			"Fantasy" | "Fashion" | 'Food & Drink' | 
			"Games" | 
			"Life" | 
			"Nature & Science" | 
			"Occupations" | 
			'Pop Culture' | 
			"Sports" |	"Suffering" |  
			"TV Shows & Movies" | "Technology" | "Travel" |
			"Violence");

	interface ArgsBase {
		versusId: number;
		userId: string;
	}

	interface PostLikeArgs extends ArgsBase {
		type: "comment" | "versus",
		commentId?: string;
	}

	interface PostVoteArgs extends ArgsBase {
		optionId: string;
	}

	interface PostVersusArgs extends Omit<ArgsBase, "versusId"> {
		title: string;
		description: string;
		tags: number[]
		options: string[];
	};

 interface PostCommentArgs extends ArgsBase {
		message: string;
		root?: string;
	}

	interface GetCommentArgs extends ArgsBase {
  userId?: string;
		root?: string;
		cursor?: string;
	}

	interface GetVersusArgs extends ArgsBase {
		userId?: string;
		take: string | number;
		status?: "APPROVED" | "REJECTED" | "PENDING",
  q?: string; // Can be title, or options
  date?: string;
  tags?: string;
		description?: boolean;
  cursor?: string | number;
		recent?: "asc" | "desc"
	}

	interface AxiosResponse {
		ok: boolean;
		status: number;
	}

	interface ResponseData<Type> extends AxiosResponse {
		data: Type;
	}

	interface ResponsePagination<Type> extends AxiosResponse {
		items: Type[];
		pagination: {	cursor: number | null }
	};

type MutateFeed<Type = (Versus | Comment)> = {
 pages: ResponsePagination<Type>[];
 pageParams: any[];
};

	type CreateVersus = (data: PostVersusArgs) => Promise<number | undefined>;
	type GetManyVersus = (data: Omit<GetVersusArgs, "versusId">) => Promise<Versus.Versus[]>;
	type DeleteVersus = (versusId: string, userId: string) => Promise<void>;
	type CreateComment = (versusId: string, userId: string, message: string, parentId?: string) => Promise<Comment | null>;
	type GetComments = (versusId: string, userId?: string, commentId?: string, cursor?: string) => Promise<Comment[]>;
	type GetReplies = (versusId: string, parentId: string, userId?: string, cursor?: string) => Promise<Comment[]>;
	type DeleteComment = (commentId: string, userId: string) => Promise<void>;

}
