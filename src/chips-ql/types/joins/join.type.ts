import { Where } from "../conditions/where.type";
import { Select } from "../queries/select.type";
import { Table } from "../tables/table.type";
import { JoinDirection } from "./join-directions.enum";
import { JoinInclude } from "./join-includes.enum";
import { JoinType } from "./join-types.enum";

type JoinOn<T extends Object> =
  | {
      joinType: JoinType.SELECT;
      on?: Where<T>;
      select: Omit<Select<Object>, "queryType">; // <-- Object, as it is another table
      alias: string;
    }
  | {
      joinType: JoinType.TABLE;
      on?: Where<T>;
      table: Table<Object>; // <-- Object, as it is another table
    };

export type Join<T extends Object> = JoinOn<T> & {
  on?: Where<T>;
  direction?: JoinDirection;
  include?: JoinInclude;
};
