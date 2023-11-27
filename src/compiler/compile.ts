import { Query } from "../chips-ql/types/queries/query.type";
import { SqlLanguages } from "../sql/sql-languages.enum";
import { QueryCompiler } from "./query/query.compiler";

export const compile = (query: Query<Object>, language: SqlLanguages) => {
  return new QueryCompiler(language).compile(query);
};
