declare namespace Versus {
	interface Base {
		createdAt: string;
		author: Author;
	}

	interface Author {
		name: string;
		image: string | null;
	}

 interface Prompt extends Base {
		number: number;
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
		pid: string;
		uid: string;
	}

	interface PostLikeArgs extends ArgsBase {
		type: "comment" | "prompt",
		cid?: string;
	}

	interface PostVoteArgs extends ArgsBase {
		oid: string;
	}

	interface PostPromptArgs extends Omit<ArgsBase, "pid"> {
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
  uid?: string;
		root?: string;
		cursor?: string;
	}

	interface GetPromptArgs extends ArgsBase {
		uid?: string;
		take: string | number;
		status?: "APPROVED" | "REJECTED" | "PENDING",
  q?: string; // Can be title, or options
  date?: string;
  tags?: string;
		description?: boolean;
  cursor?: string | number;
		recent?: "asc" | "desc"
	}


	type CreatePrompt = (data: PostPromptArgs) => Promise<number | undefined>;
	type GetManyPrompts = (data: Omit<GetPromptArgs, "pid">) => Promise<Versus.Prompt[]>;
	type DeletePrompt = (pid: string, uid: string) => Promise<void>;

	type CreateComment = (pid: string, uid: string, message: string, parentId?: string) => Promise<Comment | null>;
	type GetComments = (pid: string, uid?: string, cid?: string, cursor?: string) => Promise<Comment[]>;
	type GetReplies = (pid: string, parentId: string, uid?: string, cursor?: string) => Promise<Comment[]>;
	type DeleteComment = (cid: string, uid: string) => Promise<void>;
}
