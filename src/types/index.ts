import type { UseVersusMutation } from "@hooks/use-versus-mutation";
import type { User, VersusLike, VersusOption } from "@prisma/client";
import type { Versus } from "@lib/versus/getVersus";

export type Mutate = UseVersusMutation;
export type MutateData<Type> = Type & { mutation: Mutate };

export type MutateFeed<Type> = {
 pages: Response<Pagination<Versus>>[];
 pageParams: any[];
};


/**
	*  Versus 
	*/
export type DefaultQuery = {
	take?: string;
	cursor?: string | null;
	userId?: string | null;
}

export type VersusQuery = DefaultQuery & {
	q?: string;
	title?: string;
	author?: string;
	tags?: string;
	skip?: string;
};

export type Pagination<Type> = {
	items: Type[],
	pagination: {
		cursor: string | number | null;
	}
};

export type Response<Type> = {
	ok: boolean;
	status: number;
} & Type;

export type GetManyVersus = Response<Pagination<NonNullable<Versus>>>;

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


export type DefaultPermissions = {
	userCanDelete: boolean;
}

export type TAuthor = Pick<User, "id" | "role" | "image" | "name" | "username">;
export type TLike = VersusLike;

export type TOption = Omit<VersusOption, "versusId"> & { 
	_count: { votes: number },
	votes: { userId?: string }[];
};

export type TComment = {} & DefaultPermissions;