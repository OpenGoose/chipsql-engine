import { JoinDirections } from "../../chips-lq/types/joins/join-directions.enum";
import { JoinIncludes } from "../../chips-lq/types/joins/join-includes.enum";
import { Join } from "../../chips-lq/types/joins/join.type";
import { Query, QueryTypes } from "../../chips-lq/types/queries/query.type";
import { Select } from "../../chips-lq/types/queries/select.type";
import { SqlLanguages } from "../../sql/sql-languages.enum";
import { QueryWarningsService } from "../query-warnings.service";
import { WarningLevels } from "../warning-levels.enum";
import { UnavailableFeatureError } from "../../compiler/features/unavailable-feature.error";
import { QueryCompilerOptions } from "../../compiler/query/query-compiler-options.type";
import { QueryWarnings } from "../query-warnings.abstract";
import { mssqlWarningMessages } from "./mssql-warning-messages.constant";

export class MssqlWarnings<T extends Object = Object> extends QueryWarnings<T> {
  constructor(query: Query<T>, queryCompilerOptions?: QueryCompilerOptions) {
    super(query, SqlLanguages.MSSQL, queryCompilerOptions);
  }

  processWarnings = () => {
    const queryWarnings = new QueryWarningsService(this.query, this.language);

    switch (this.query.queryType) {
      case QueryTypes.SELECT:
        return this.processSelectWarnings(this.query, queryWarnings);
    }
    throw new UnavailableFeatureError();
  };

  private processSelectWarnings = (
    query: Select<T>,
    queryWarnings: QueryWarningsService<T>
  ) => {
    const { offset, orderBy, groupBy, having, joins } = query;

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

    if (joins && joins.length > 0) this.processJoinWarnings(joins, queryWarnings);

    return queryWarnings;
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
