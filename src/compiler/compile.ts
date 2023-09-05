import { Query } from "../chips-lq/types/queries/query.type";
import { SqlLanguages } from "../sql/sql-languages.enum";
import { UnavailableFeatureError } from "../errors/compiler/unavailable-feature.error";
import { QueryCompiler } from "./query/query.compiler";

export const compile = (query: Query<Object>, language: SqlLanguages) => {
    return new QueryCompiler(query, language).compile();
    throw new UnavailableFeatureError();
}