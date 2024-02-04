import { Function } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

service.expectFunction(
  `CUSTOM function`,
  {
    function: Function.CUSTOM,
    name: "MAXIMUM",
    parameters: [
      {
        valueType: ValueType.COLUMN,
        field: "id",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: "param",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: 1,
      },
    ],
  },
  "MAXIMUM([id], 'param', 1)"
);
