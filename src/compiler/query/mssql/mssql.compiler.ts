import { Query, QueryTypes } from "../../../chips-lq/types/queries/query.type";
import { Select } from "../../../chips-lq/types/queries/select.type";
import { SqlLanguages } from "../../../sql/sql-languages.enum";
import { QueryWarn } from "../../../warnings/query-warn.service";
import { WarningLevels } from "../../../warnings/warning-levels.enum";
import { UnavailableFeatureError } from "../../features/unavailable-feature.error";
import { joinParts } from "../../utils/query-generation/join-parts.util";
import { IQueryCompiler } from "../query-compiler.interface";
import { IQueryPartsCompiler } from "../query-parts-compiler.interface";
import { MssqlPartsCompiler } from "./mssql-parts.compiler";

type CompileOptions = {
  semicolon?: boolean;
};

export class MssqlCompiler<T extends Object> implements IQueryCompiler<T> {
  protected readonly language: SqlLanguages;
  readonly query: Query<T>;
  readonly partsCompiler: IQueryPartsCompiler<T>;

  constructor(
    query: Query<T>,
    private readonly options: CompileOptions = { semicolon: true }
  ) {
    this.language = SqlLanguages.MSSQL;
    this.query = query;
    this.partsCompiler = new MssqlPartsCompiler<T>();
  }

  public compile = () => {
    const warnings = MssqlCompiler.processQueryWarnings(this.query);
    warnings.warn();

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
    ...select
  }: Select<T>) => {
    return (
      joinParts([
        "SELECT",
        limit && !offset ? `TOP ${this.partsCompiler.limit(limit)}` : null,
        this.partsCompiler.fields(fields),
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
      ]) + (this.options?.semicolon ? ";" : "")
    );
  };

  static processQueryWarnings = <T extends Object>(query: Query<T>) => {
    const queryWarn = new QueryWarn(query, SqlLanguages.MSSQL);
    switch (query.queryType) {
      /*
        SELECT WARNINGS
      */
      case QueryTypes.SELECT:
        const { offset, orderBy, groupBy, having } = query;
        if (offset && (!orderBy || orderBy.length <= 0))
          queryWarn.appendWarning(
            "ORDER BY is required when using OFFSET",
            WarningLevels.EXECUTION_WILL_FAIL
          );
        if (having && (!groupBy || groupBy.length <= 0)) {
          queryWarn.appendWarning(
            "GROUP BY is required when using HAVING",
            WarningLevels.EXECUTION_WILL_FAIL
          );
        }
        break;
    }
    return queryWarn;
  };
}
