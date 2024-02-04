import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperand } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { JoinerOperand } from "../../../../src/chips-ql/types/conditions/operands/joiner-operands.enum";
import { JoinInclude } from "../../../../src/chips-ql/types/joins/join-includes.enum";
import { JoinType } from "../../../../src/chips-ql/types/joins/join-types.enum";
import { LimitMode } from "../../../../src/chips-ql/types/limit/limit-mode.enum";
import { QueryType } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { ExecutionWillFailException } from "../../../../src/errors/warnings/execution-will-fail.exception";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

service.expectQuery<{ zip_code: string }>(
  "Basic UPDATE statement",
  {
    queryType: QueryType.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
    },
    values: [
      {
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "1234",
        },
        field: "zip_code",
      },
    ],
  },
  "UPDATE [sales].[customers] SET [zip_code] = '1234' FROM [sales].[customers];"
);

service.expectQuery<{ zip_code: string }>(
  "Basic UPDATE statement in compact mode",
  {
    queryType: QueryType.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
    },
    values: [
      {
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "1234",
        },
        field: "zip_code",
      },
    ],
  },
  "UPDATE [sales].[customers] SET [zip_code]='1234' FROM [sales].[customers];",
  {
    compactQuery: true,
  }
);

service.expectQuery<{ zip_code: string }>(
  "Basic UPDATE statement with WHERE and alias",
  {
    queryType: QueryType.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
      alias: "c",
    },
    where: {
      conditionType: ConditionType.JOINER,
      joinerOperand: JoinerOperand.AND,
      conditions: [
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.EQUALS_OR_GREATER_THAN,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "age",
            tableAlias: "c",
          },
          targetValue: {
            valueType: ValueType.RAW_VALUE,
            value: 18,
          },
        },
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.LIKE,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "name",
            tableAlias: "c",
          },
          targetValue: {
            valueType: ValueType.RAW_VALUE,
            value: "Tanjiro",
          },
        },
      ],
    },
    values: [
      {
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "1234",
        },
        field: "zip_code",
      },
    ],
  },
  "UPDATE [c] SET [zip_code] = '1234' FROM [sales].[customers] [c] WHERE ([c].[age] >= 18 AND [c].[name] LIKE 'Tanjiro');"
);

service.expectQuery<{ zip_code: string }>(
  "UPDATE statement with TOP 10",
  {
    queryType: QueryType.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
    },
    values: [
      {
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "1234",
        },
        field: "zip_code",
      },
    ],
    limit: {
      value: {
        valueType: ValueType.RAW_VALUE,
        value: 10,
      },
    },
  },
  "UPDATE TOP (10) [sales].[customers] SET [zip_code] = '1234' FROM [sales].[customers];"
);

service.expectQuery<{ zip_code: string }>(
  "UPDATE statement with TOP 10 PERCENT",
  {
    queryType: QueryType.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
    },
    values: [
      {
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "1234",
        },
        field: "zip_code",
      },
    ],
    limit: {
      value: {
        valueType: ValueType.RAW_VALUE,
        value: 10,
      },
      limitMode: LimitMode.PERCENT,
    },
  },
  "UPDATE TOP (10) PERCENT [sales].[customers] SET [zip_code] = '1234' FROM [sales].[customers];"
);

service.expectQuery<{ zip_code: string }>(
  "UPDATE statement with JOINS and WHERE",
  {
    queryType: QueryType.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
      alias: "c",
    },
    where: {
      conditionType: ConditionType.JOINER,
      joinerOperand: JoinerOperand.AND,
      conditions: [
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.EQUALS_OR_GREATER_THAN,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "age",
            tableAlias: "c",
          },
          targetValue: {
            valueType: ValueType.RAW_VALUE,
            value: 18,
          },
        },
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.LIKE,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "name",
            tableAlias: "c",
          },
          targetValue: {
            valueType: ValueType.RAW_VALUE,
            value: "Tanjiro",
          },
        },
      ],
    },
    joins: [
      {
        joinType: JoinType.TABLE,
        include: JoinInclude.INNER,
        table: {
          name: "locations",
          schema: "sales",
          alias: "l",
        },
        on: {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.EQUALS,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "name",
            tableAlias: "l",
          },
          targetValue: {
            valueType: ValueType.RAW_VALUE,
            value: "Baetulo",
          },
        },
      },
    ],
    values: [
      {
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "1234",
        },
        field: "zip_code",
      },
    ],
  },
  "UPDATE [c] SET [zip_code] = '1234' FROM [sales].[customers] [c] INNER JOIN [sales].[locations] [l] ON [l].[name] = 'Baetulo' WHERE ([c].[age] >= 18 AND [c].[name] LIKE 'Tanjiro');"
);
