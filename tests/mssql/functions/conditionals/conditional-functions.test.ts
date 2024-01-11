import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { Functions } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

// IIF
service.expectFunction(
  "IIF function",
  {
    function: Functions.IF,
    condition: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.IS_NOT,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "id",
      },
      targetValue: {
        valueType: ValueTypes.RAW_VALUE,
        value: null,
      },
    },
    whenTrue: {
      valueType: ValueTypes.RAW_VALUE,
      value: 1,
    },
    whenFalse: {
      valueType: ValueTypes.RAW_VALUE,
      value: 0,
    },
  },
  "IIF([id] IS NOT NULL, 1, 0)"
);
service.expectFunction(
  "IIF function (as compact query)",
  {
    function: Functions.IF,
    condition: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.IS_NOT,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "id",
      },
      targetValue: {
        valueType: ValueTypes.RAW_VALUE,
        value: null,
      },
    },
    whenTrue: {
      valueType: ValueTypes.RAW_VALUE,
      value: 1,
    },
    whenFalse: {
      valueType: ValueTypes.RAW_VALUE,
      value: 0,
    },
  },
  "IIF([id] IS NOT NULL,1,0)",
  {
    compactQuery: true,
  }
);
