import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { JoinerOperands } from "../../../../src/chips-ql/types/conditions/operands/joiner-operands.enum";
import { QueryTypes } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { ExecutionWillFailException } from "../../../../src/errors/warnings/execution-will-fail.exception";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectQuery<{ zip_code: string }>(
  "Basic UPDATE statement",
  {
    queryType: QueryTypes.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
    },
    values: [
      {
        value: {
          valueType: ValueTypes.RAW_VALUE,
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
    queryType: QueryTypes.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
    },
    values: [
      {
        value: {
          valueType: ValueTypes.RAW_VALUE,
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
    queryType: QueryTypes.UPDATE,
    from: {
      name: "customers",
      schema: "sales",
      alias: "c",
    },
    where: {
      conditionType: ConditionType.JOINER,
      joinerOperand: JoinerOperands.AND,
      conditions: [
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.EQUALS_OR_GREATER_THAN,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            field: "age",
            tableAlias: "c",
          },
          targetValue: {
            valueType: ValueTypes.RAW_VALUE,
            value: 18,
          },
        },
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.LIKE,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            field: "name",
            tableAlias: "c",
          },
          targetValue: {
            valueType: ValueTypes.RAW_VALUE,
            value: "Tanjiro",
          },
        },
      ],
    },
    values: [
      {
        value: {
          valueType: ValueTypes.RAW_VALUE,
          value: "1234",
        },
        field: "zip_code",
      },
    ],
  },
  "UPDATE [c] SET [zip_code] = '1234' FROM [sales].[customers] [c] WHERE ([c].[age] >= 18 AND [c].[name] LIKE 'Tanjiro');"
);
