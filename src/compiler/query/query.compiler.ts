import { Query } from "../../chips-lq/types/queries/query.type";
import { SqlLanguages } from "../../sql/sql-languages.enum";
import { UnavailableFeatureError } from "../../errors/compiler/unavailable-feature.error";
import { QueryCompilerOptions } from "./query-compiler-options.type";
import { MssqlCompiler } from "../../languages/mssql/query-parts-compiler/mssql.compiler";

export class QueryCompiler<T extends Object> {
  constructor(
    private readonly sqlLanguage: SqlLanguages,
    private readonly options?: QueryCompilerOptions
  ) {}

  public compile = (query: Query<T>, options?: QueryCompilerOptions) => {
    const compiler = QueryCompiler.getCompiler(
      this.sqlLanguage,
      query,
      options ?? this.options
    );
    return compiler.compile();
  };

  public static getCompiler = <T extends Object>(
    sqlLanguage: SqlLanguages,
    query: Query<T>,
    options?: QueryCompilerOptions
  ) => {
    switch (sqlLanguage) {
      case SqlLanguages.MSSQL:
        return new MssqlCompiler(query, options);
    }
    throw new UnavailableFeatureError(sqlLanguage);
  };
}
