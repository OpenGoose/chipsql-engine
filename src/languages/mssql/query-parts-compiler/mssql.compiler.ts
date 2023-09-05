import { Query, QueryTypes } from "../../../chips-lq/types/queries/query.type";
import { Select } from "../../../chips-lq/types/queries/select.type";
import { SqlLanguages } from "../../../sql/sql-languages.enum";
import { WarningLevels } from "../../../warnings/warning-levels.enum";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlPartsCompiler } from "./mssql-parts.compiler";
import { ExecutionWillFailException } from "../../../errors/warnings/execution-will-fail.exception";
import { IQueryCompiler } from "../../../compiler/query/query-compiler.interface";
import { IQueryPartsCompiler } from "../../../compiler/query/query-parts-compiler.interface";
import { QueryCompilerOptions } from "../../../compiler/query/query-compiler-options.type";
import { joinParts } from "../../../compiler/utils/query-generation/join-parts.util";
import { MssqlWarnings } from "../warnings/mssql.warnings";

export class MssqlCompiler<T extends Object> implements IQueryCompiler<T> {
  protected readonly language: SqlLanguages;
  readonly query: Query<T>;
  readonly partsCompiler: IQueryPartsCompiler<T>;

  constructor(
    query: Query<T>,
    private readonly options?: QueryCompilerOptions
  ) {
    this.language = SqlLanguages.MSSQL;
    this.query = query;
    this.partsCompiler = new MssqlPartsCompiler<T>(options);
  }

  public compile = () => {
    const warnings = MssqlCompiler.processQueryWarnings(this.query);
    warnings.warn();

    if (
      this.options?.warningOptions?.throwExceptionOnExecutionWillFail &&
      warnings.warnings.some(
        (w) => w.level === WarningLevels.EXECUTION_WILL_FAIL
      )
    )
      throw new ExecutionWillFailException();

    switch (this.query.queryType) {
      case QueryTypes.SELECT:
        return this.compileSelect(this.query);
    }
    throw new UnavailableFeatureError(this.query.queryType);
  };

  compileSelect = ({
    fields,
    from,
    where,
    joins,
    limit,
    offset,
    orderBy,
    having,
    groupBy,
    into,
  }: Select<T>) => {
    return (
      joinParts([
        "SELECT",
        limit && !offset ? `TOP ${this.partsCompiler.limit(limit)}` : null,
        this.partsCompiler.fields(fields),
        into ? joinParts(["INTO", this.partsCompiler.into(into)]) : null,
        "FROM",
        this.partsCompiler.from(from),
        joins ? this.partsCompiler.joins(joins) : null,
        where ? joinParts(["WHERE", this.partsCompiler.where(where)]) : null,
        groupBy
          ? joinParts(["GROUP BY", this.partsCompiler.grouping(groupBy)])
          : null,
        having
          ? joinParts(["HAVING", this.partsCompiler.having(having)])
          : having,
        orderBy ? `ORDER BY ${this.partsCompiler.orders(orderBy)}` : null,
        offset ? `OFFSET ${this.partsCompiler.offset(offset)} ROWS` : null,
        limit && offset
          ? `FETCH FIRST ${this.partsCompiler.limit(limit)} ROWS ONLY`
          : null,
      ]) + (this.options?.endWithSemicolon === false ? "" : ";")
    );
  };

  static processQueryWarnings = <T extends Object>(
    query: Query<T>,
    queryCompilerOptions?: QueryCompilerOptions
  ) => {
    return new MssqlWarnings<T>(query, queryCompilerOptions).processWarnings();
  };
}
