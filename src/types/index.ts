import type { UseVersusMutation } from "@hooks/use-versus-mutation";
import type { User, VersusLike, Option, Tag as VersusTag } from "@prisma/client";
import type { Versus } from "@lib/versus/getVersus";

export type Mutate = UseVersusMutation;
export type MutateData<Type> = Type & { mutation: Mutate };

export type MutateFeed<Type> = {
 pages: Pagination<Type>[];
 pageParams: VersusQuery[];
};


/**
	*  Versus 
	*/
export type DefaultQuery = {
	limit?: string;
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

export type GetManyVersus = Pagination<NonNullable<Versus>>;
export type Tag = Pick<VersusTag, "id" | "name">;
export type DefaultPermissions = {	userCanDelete: boolean };
export type TAuthor = Pick<User, "id" | "role" | "image" | "name" | "username">;
export type TLike = VersusLike;

export type TOption = Omit<Option, "versusId"> & { 
	_count: { votes: number },
	votes: { userId?: string }[];
};

export type TComment = {} & DefaultPermissions;

export type ProfileProps = { params: { username: string } };


export type APIUserParams = {
	userId: string;
	followingId?: string;
}