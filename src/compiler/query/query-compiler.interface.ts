import { Query } from "../../chips-lq/types/queries/query.type";

export interface IQueryCompiler<T extends Object> {
    readonly query: Query<T>;
    compile: () => string;
}