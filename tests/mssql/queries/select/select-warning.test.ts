import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { JoinDirections } from "../../../../src/chips-ql/types/joins/join-directions.enum";
import { JoinIncludes } from "../../../../src/chips-ql/types/joins/join-includes.enum";
import { JoinTypes } from "../../../../src/chips-ql/types/joins/join-types.enum";
import { QueryTypes } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { ExecutionWillFailException } from "../../../../src/errors/warnings/execution-will-fail.exception";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { mssqlWarningMessages } from "../../../../src/languages/mssql/warnings/mssql-warning-messages.constant";
import { WarningLevels } from "../../../../src/warnings/warning-levels.enum";
import { TestService } from "../../../test.service";
import { LimitMode } from "../../../../src/chips-ql/types/limit/limit-mode.enum";

const service = new TestService(SqlLanguages.MSSQL);

// Select

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
  "A select statement requires at least one selected value",
  {
    queryType: QueryTypes.SELECT,
    fields: [],
    from: [
      {
        name: "customers",
      },
    ],
  },
  {
    level: WarningLevels.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.EMPTY_SELECT,
  }
);

service.expectWarning(
  "A select from statement requires at least one datasource",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [],
  },
  {
    level: WarningLevels.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.EMPTY_FROM,
  }
);

service.expectException(
  "A select from statement requires at least one datasource (throw error on ExecutionWillFail)",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [],
  },
  ExecutionWillFailException,
  {
    warningOptions: {
      throwExceptionOnExecutionWillFail: true,
    },
  }
);

// Limit & Offset

service.expectWarning('Test warning when trying to set LIMIT with PERCENT and OFFSET', {
  queryType: QueryTypes.SELECT,
  from: [
    {
      name: 'customers',
      schema: 'sales'
  }
  ],
  fields: [
    {
      valueType: ValueTypes.ALL_COLUMNS,
    }
  ],
  limit: {
      value: {
          value: 10,
          valueType: ValueTypes.RAW_VALUE,
      },
      limitMode: LimitMode.PERCENT,
  },
  offset: {
    value: 10,
    valueType: ValueTypes.RAW_VALUE,
  }
}, {
  level: WarningLevels.EXECUTION_WILL_FAIL,
  message: mssqlWarningMessages.PERCENT_LIMIT_WITH_OFfSET,
});

// Joins

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
          name: "customers",
        },
        direction: JoinDirections.FULL,
        include: JoinIncludes.INNER,
      },
    ],
  },
  {
    level: WarningLevels.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.NO_FULL_INNER_JOIN,
  }
);
