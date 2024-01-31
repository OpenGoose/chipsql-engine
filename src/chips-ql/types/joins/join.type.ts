import { Where } from "../conditions/where.type";
import { Select } from "../queries/select.type";
import { Table } from "../tables/table.type";
import { JoinDirections } from "./join-directions.enum";
import { JoinIncludes } from "./join-includes.enum";
import { JoinTypes } from "./join-types.enum";

type JoinOn<T extends NonNullable<unknown>> =
  | {
      joinType: JoinTypes.SELECT;
      on?: Where<T>;
      select: Omit<Select<NonNullable<unknown>>, "queryType">; // <-- NonNullable<unknown>, as it is another table
      alias: string;
    }
  | {
      joinType: JoinTypes.TABLE;
      on?: Where<T>;
      table: Table<NonNullable<unknown>>; // <-- NonNullable<unknown>, as it is another table
    };

export type Join<T extends NonNullable<unknown>> = JoinOn<T> & {
  on?: Where<T>;
  direction?: JoinDirections;
  include?: JoinIncludes;
};
