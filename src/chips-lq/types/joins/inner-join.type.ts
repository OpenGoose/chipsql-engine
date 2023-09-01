import { JoinTypes } from "./join-types.enum";

export interface InnerJoin<T extends Object> {
    joinType: JoinTypes.INNER;
}