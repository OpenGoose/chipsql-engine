import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperand } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { JoinDirection } from "../../../../src/chips-ql/types/joins/join-directions.enum";
import { JoinInclude } from "../../../../src/chips-ql/types/joins/join-includes.enum";
import { JoinType } from "../../../../src/chips-ql/types/joins/join-types.enum";
import { QueryType } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { ExecutionWillFailException } from "../../../../src/errors/warnings/execution-will-fail.exception";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { mssqlWarningMessages } from "../../../../src/languages/mssql/warnings/mssql-warning-messages.constant";
import { WarningLevel } from "../../../../src/warnings/warning-levels.enum";
import { TestService } from "../../../test.service";
import { LimitMode } from "../../../../src/chips-ql/types/limit/limit-mode.enum";

const service = new TestService(SqlLanguage.MSSQL);

// Select

service.expectWarning(
  "ORDER BY is required when using OFFSET",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
    offset: {
      valueType: ValueType.RAW_VALUE,
      value: 10,
    },
  },
  {
    level: WarningLevel.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.OFFSET_WITHOUT_GROUP_BY,
  }
);

service.expectWarning(
  "GROUP BY is required when using HAVING",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
    having: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperand.EQUALS,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "phone",
      },
      targetValue: {
        valueType: ValueType.RAW_VALUE,
        value: "555 xx xx xx",
      },
    },
  },
  {
    level: WarningLevel.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.HAVING_WITHOUT_GROUP_BY,
  }
);

service.expectWarning(
  "A select statement requires at least one selected value",
  {
    queryType: QueryType.SELECT,
    fields: [],
    from: [
      {
        name: "customers",
      },
    ],
  },
  {
    level: WarningLevel.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.EMPTY_SELECT,
  }
);

service.expectWarning(
  "A select from statement requires at least one datasource",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
      },
    ],
    from: [],
  },
  {
    level: WarningLevel.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.EMPTY_FROM,
  }
);

service.expectException(
  "A select from statement requires at least one datasource (throw error on ExecutionWillFail)",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
  queryType: QueryType.SELECT,
  from: [
    {
      name: 'customers',
      schema: 'sales'
  }
  ],
  fields: [
    {
      valueType: ValueType.ALL_COLUMNS,
    }
  ],
  limit: {
      value: {
          value: 10,
          valueType: ValueType.RAW_VALUE,
      },
      limitMode: LimitMode.PERCENT,
  },
  offset: {
    value: 10,
    valueType: ValueType.RAW_VALUE,
  }
}, {
  level: WarningLevel.EXECUTION_WILL_FAIL,
  message: mssqlWarningMessages.PERCENT_LIMIT_WITH_OFfSET,
});

// Joins

service.expectWarning(
  "Cannot perform an FULL INNER JOIN",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
    joins: [
      {
        joinType: JoinType.TABLE,
        table: {
          name: "customers",
        },
        direction: JoinDirection.FULL,
        include: JoinInclude.INNER,
      },
    ],
  },
  {
    level: WarningLevel.EXECUTION_WILL_FAIL,
    message: mssqlWarningMessages.NO_FULL_INNER_JOIN,
  }
);
