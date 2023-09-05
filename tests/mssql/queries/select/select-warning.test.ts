import { ConditionType } from "../../../../src/chips-lq/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-lq/types/conditions/operands/condition-operands.enum";
import { JoinDirections } from "../../../../src/chips-lq/types/joins/join-directions.enum";
import { JoinIncludes } from "../../../../src/chips-lq/types/joins/join-includes.enum";
import { JoinTypes } from "../../../../src/chips-lq/types/joins/join-types.enum";
import { QueryTypes } from "../../../../src/chips-lq/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-lq/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { mssqlWarningMessages } from "../../../../src/warnings/mssql/mssql-warning-messages.constant";
import { WarningLevels } from "../../../../src/warnings/warning-levels.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectWarning(
  "ORDER BY is required when using OFFSET",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
    offset: {
      valueType: ValueTypes.RAW_VALUE,
      value: 10,
    },
  },
  {
    level: WarningLevels.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.OFFSET_WITHOUT_GROUP_BY,
  }
);

service.expectWarning(
  "GROUP BY is required when using HAVING",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
    having: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.EQUALS,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "phone",
      },
      targetValue: {
        valueType: ValueTypes.RAW_VALUE,
        value: "555 xx xx xx",
      },
    },
  },
  {
    level: WarningLevels.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.HAVING_WITHOUT_GROUP_BY,
  }
);

service.expectWarning(
  "Cannot perform an FULL INNER JOIN",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
    joins: [
      {
        joinType: JoinTypes.TABLE,
        table: {
          name: 'customers'
        },
        direction: JoinDirections.FULL,
        include: JoinIncludes.INNER,
      }
    ]
  },
  {
    level: WarningLevels.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.NO_FULL_INNER_JOIN,
  }
);