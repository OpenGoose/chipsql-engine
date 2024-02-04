import { Query } from "../chips-ql/types/queries/query.type";
import { SqlLanguage } from "../sql/sql-languages.enum";
import { QueryCompiler } from "./query/query.compiler";

export const compile = (query: Query<Object>, language: SqlLanguage) => {
  return new QueryCompiler(language).compile(query);
};
