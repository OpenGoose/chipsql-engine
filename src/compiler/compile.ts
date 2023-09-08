import { Query } from "../chips-lq/types/queries/query.type";
import { SqlLanguages } from "../sql/sql-languages.enum";
import { QueryCompiler } from "./query/query.compiler";

export const compile = (query: Query<Object>, language: SqlLanguages) => {
  return new QueryCompiler(language).compile(query);
};
