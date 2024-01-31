import { JoinIncludes } from "./join-includes.enum";

export interface InnerJoin<T extends Object> {
  joinType: JoinIncludes.INNER;
}
