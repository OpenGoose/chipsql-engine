import { JoinDirection } from "../../../chips-ql/types/joins/join-directions.enum";
import { JoinInclude } from "../../../chips-ql/types/joins/join-includes.enum";
import { Join } from "../../../chips-ql/types/joins/join.type";
import { LimitMode } from "../../../chips-ql/types/limit/limit-mode.enum";
import { Delete } from "../../../chips-ql/types/queries/delete.type";
import { Insert } from "../../../chips-ql/types/queries/insert.type";
import { Query, QueryType } from "../../../chips-ql/types/queries/query.type";
import { Select } from "../../../chips-ql/types/queries/select.type";
import { Update } from "../../../chips-ql/types/queries/update.type";
import { From } from "../../../chips-ql/types/tables/from.type";
import { QueryCompilerOptions } from "../../../compiler/query/query-compiler-options.type";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { SqlLanguage } from "../../../sql/sql-languages.enum";
import { QueryWarnings } from "../../../warnings/query-warnings.abstract";
import { QueryWarningsService } from "../../../warnings/query-warnings.service";
import { WarningLevel } from "../../../warnings/warning-levels.enum";
import { mssqlWarningMessages } from "./mssql-warning-messages.constant";

export class MssqlWarnings<T extends Object = Object> extends QueryWarnings<T> {
  constructor(query: Query<T>, queryCompilerOptions?: QueryCompilerOptions) {
    super(query, SqlLanguage.MSSQL, queryCompilerOptions);
  }

  processWarnings = () => {
    const queryWarnings = new QueryWarningsService(
      this.query,
      this.language,
      this.queryCompilerOptions?.warningOptions
    );

    switch (this.query.queryType) {
      case QueryType.SELECT:
        return this.processSelectWarnings(this.query, queryWarnings);
      case QueryType.INSERT:
        return this.processInsertWarnings(this.query, queryWarnings);
      case QueryType.DELETE:
        return this.processDeleteWarnings(this.query, queryWarnings);
      case QueryType.UPDATE:
        return this.processUpdateWarnings(this.query, queryWarnings);
    }
    throw new UnavailableFeatureError();
  };

  private processSelectWarnings = (
    query: Select<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    const { groupBy, having, joins, from, fields } = query;

    this.processLimitAndOffsetWarnings(queryWarnings, query);

    if (having && (!groupBy || groupBy.length <= 0)) {
      queryWarnings.appendWarning(
        mssqlWarningMessages.HAVING_WITHOUT_GROUP_BY,
        WarningLevel.EXECUTION_WILL_FAIL
      );
    }

    if (fields.length <= 0)
      queryWarnings.appendWarning(
        mssqlWarningMessages.EMPTY_SELECT,
        WarningLevel.EXECUTION_WILL_FAIL
      );

    this.processFromWarnings(from, queryWarnings);

    if (joins && joins.length > 0)
      this.processJoinWarnings(joins, queryWarnings);

    return queryWarnings;
  };

  private processInsertWarnings = (
    query: Insert<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    return queryWarnings;
  };

  private processUpdateWarnings = (
    query: Update<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    return queryWarnings;
  };

  private processDeleteWarnings = (
    query: Delete<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    return queryWarnings;
  };

  private processFromWarnings = (
    from: From<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    if (from.length <= 0)
      queryWarnings.appendWarning(
        mssqlWarningMessages.EMPTY_FROM,
        WarningLevel.EXECUTION_WILL_FAIL
      );
  };

  private processJoinWarnings = (
    joins: Join<T>[],
    queryWarnings: QueryWarningsService<T>
  ) => {
    if (
      joins?.some(
        (d) =>
          d.direction === JoinDirection.FULL &&
          d.include === JoinInclude.INNER
      )
    ) {
      queryWarnings.appendWarning(
        mssqlWarningMessages.NO_FULL_INNER_JOIN,
        WarningLevel.EXECUTION_WILL_FAIL
      );
    }
  };

  private processLimitAndOffsetWarnings = (queryWarnings: QueryWarningsService<T>, {limit, offset, orderBy }: Partial<Select<T>>) => {
    if (offset && limit && limit.limitMode === LimitMode.PERCENT) queryWarnings.appendWarning(mssqlWarningMessages.PERCENT_LIMIT_WITH_OFfSET, WarningLevel.EXECUTION_WILL_FAIL);

    if (offset && (!orderBy || orderBy.length <= 0))
    queryWarnings.appendWarning(
      mssqlWarningMessages.OFFSET_WITHOUT_GROUP_BY,
      WarningLevel.EXECUTION_WILL_FAIL
    );
  }
}
