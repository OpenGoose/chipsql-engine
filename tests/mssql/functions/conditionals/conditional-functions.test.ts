import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperand } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { Function } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

// IF
service.expectFunction(
  "IIF function",
  {
    function: Function.IF,
    condition: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperand.IS_NOT,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "id",
      },
      targetValue: {
        valueType: ValueType.RAW_VALUE,
        value: null,
      },
    },
    whenTrue: {
      valueType: ValueType.RAW_VALUE,
      value: 1,
    },
    whenFalse: {
      valueType: ValueType.RAW_VALUE,
      value: 0,
    },
  },
  "IIF([id] IS NOT NULL, 1, 0)"
);
service.expectFunction(
  "IIF function (as compact query)",
  {
    function: Function.IF,
    condition: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperand.IS_NOT,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "id",
      },
      targetValue: {
        valueType: ValueType.RAW_VALUE,
        value: null,
      },
    },
    whenTrue: {
      valueType: ValueType.RAW_VALUE,
      value: 1,
    },
    whenFalse: {
      valueType: ValueType.RAW_VALUE,
      value: 0,
    },
  },
  "IIF([id] IS NOT NULL,1,0)",
  {
    compactQuery: true,
  }
);

// IF NULL
service.expectFunction(
  "IF_NULL function",
  {
    function: Function.IF_NULL,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: null,
    },
    whenNull: {
      valueType: ValueType.RAW_VALUE,
      value: "Is null!",
    },
  },
  "ISNULL(NULL, 'Is null!')"
);

// COALESCE
service.expectFunction(
  "COALESCE function",
  {
    function: Function.COALESCE,
    values: [
      {
        valueType: ValueType.RAW_VALUE,
        value: null,
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: "Not null",
      },
    ],
  },
  "COALESCE(NULL, 'Not null')"
);
