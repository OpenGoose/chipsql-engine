import { JoinIncludes } from "./join-includes.enum";

export interface InnerJoin<T extends NonNullable<unknown>> {
  joinType: JoinIncludes.INNER;
}
