import { JoinDirections } from "../../../chips-ql/types/joins/join-directions.enum";
import { JoinIncludes } from "../../../chips-ql/types/joins/join-includes.enum";
import { Join } from "../../../chips-ql/types/joins/join.type";
import { Insert } from "../../../chips-ql/types/queries/insert.type";
import { Query, QueryTypes } from "../../../chips-ql/types/queries/query.type";
import { Select } from "../../../chips-ql/types/queries/select.type";
import { From } from "../../../chips-ql/types/tables/from.type";
import { QueryCompilerOptions } from "../../../compiler/query/query-compiler-options.type";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { SqlLanguages } from "../../../sql/sql-languages.enum";
import { QueryWarnings } from "../../../warnings/query-warnings.abstract";
import { QueryWarningsService } from "../../../warnings/query-warnings.service";
import { WarningLevels } from "../../../warnings/warning-levels.enum";
import { mssqlWarningMessages } from "./mssql-warning-messages.constant";

export class MssqlWarnings<T extends Object = Object> extends QueryWarnings<T> {
  constructor(query: Query<T>, queryCompilerOptions?: QueryCompilerOptions) {
    super(query, SqlLanguages.MSSQL, queryCompilerOptions);
  }

  processWarnings = () => {
    const queryWarnings = new QueryWarningsService(
      this.query,
      this.language,
      this.queryCompilerOptions?.warningOptions
    );

    switch (this.query.queryType) {
      case QueryTypes.SELECT:
        return this.processSelectWarnings(this.query, queryWarnings);
      case QueryTypes.INSERT:
        return this.processInsertWarnings(this.query, queryWarnings);
    }
    throw new UnavailableFeatureError();
  };

  private processSelectWarnings = (
    query: Select<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    const { offset, orderBy, groupBy, having, joins, from, fields } = query;

    if (offset && (!orderBy || orderBy.length <= 0))
      queryWarnings.appendWarning(
        mssqlWarningMessages.OFFSET_WITHOUT_GROUP_BY,
        WarningLevels.EXECUTION_WILL_FAIL
      );
    if (having && (!groupBy || groupBy.length <= 0)) {
      queryWarnings.appendWarning(
        mssqlWarningMessages.HAVING_WITHOUT_GROUP_BY,
        WarningLevels.EXECUTION_WILL_FAIL
      );
    }

    if (fields.length <= 0)
      queryWarnings.appendWarning(
        mssqlWarningMessages.EMPTY_SELECT,
        WarningLevels.EXECUTION_WILL_FAIL
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

  private processFromWarnings = (
    from: From<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    if (from.length <= 0)
      queryWarnings.appendWarning(
        mssqlWarningMessages.EMPTY_FROM,
        WarningLevels.EXECUTION_WILL_FAIL
      );
  };

  private processJoinWarnings = (
    joins: Join<T>[],
    queryWarnings: QueryWarningsService<T>
  ) => {
    if (
      joins?.some(
        (d) =>
          d.direction === JoinDirections.FULL &&
          d.include === JoinIncludes.INNER
      )
    ) {
      queryWarnings.appendWarning(
        mssqlWarningMessages.NO_FULL_INNER_JOIN,
        WarningLevels.EXECUTION_WILL_FAIL
      );
    }

    return QueryWarnings;
  };
}
