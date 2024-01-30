import { JoinInclude } from "./join-includes.enum";

export interface InnerJoin<T extends Object> {
  joinType: JoinInclude.INNER;
}
