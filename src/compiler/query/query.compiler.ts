import { Query } from "../../chips-ql/types/queries/query.type";
import { SqlLanguage } from "../../sql/sql-languages.enum";
import { UnavailableFeatureError } from "../../errors/compiler/unavailable-feature.error";
import { QueryCompilerOptions } from "./query-compiler-options.type";
import { MssqlCompiler } from "../../languages/mssql/query-parts-compiler/mssql.compiler";
import { ExecutionWillFailException } from "../../errors/warnings/execution-will-fail.exception";
import { WarningLevel } from "../../warnings/warning-levels.enum";

export class QueryCompiler<T extends Object> {
  constructor(
    private readonly sqlLanguage: SqlLanguage,
    private readonly options?: QueryCompilerOptions
  ) {}

  public compile = (query: Query<T>, options?: QueryCompilerOptions) => {
    // Process warnings
    const warnings = this.getWarnings(query, options ?? this.options);
    warnings.warn();

    if (
      this.options?.warningOptions?.throwExceptionOnExecutionWillFail &&
      warnings.warnings.some(
        (w) => w.level === WarningLevel.EXECUTION_WILL_FAIL
      )
    )
      throw new ExecutionWillFailException();

    // Compile query
    const compiler = QueryCompiler.getCompiler(
      this.sqlLanguage,
      query,
      options ?? this.options
    );
    return compiler.compile();
  };

  private getWarnings = (
    query: Query<T>,
    compilerOptions?: QueryCompilerOptions
  ) => {
    switch (this.sqlLanguage) {
      case SqlLanguage.MSSQL:
        return MssqlCompiler.processQueryWarnings(query, compilerOptions);
    }
  };

  public static getCompiler = <T extends Object>(
    sqlLanguage: SqlLanguage,
    query: Query<T>,
    options?: QueryCompilerOptions
  ) => {
    switch (sqlLanguage) {
      case SqlLanguage.MSSQL:
        return new MssqlCompiler(query, options);
    }
    throw new UnavailableFeatureError(sqlLanguage);
  };
}
