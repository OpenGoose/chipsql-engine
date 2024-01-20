import { Functions } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectFunction(
  `CUSTOM function`,
  {
    function: Functions.CUSTOM,
    name: "MAXIMUM",
    parameters: [
      {
        valueType: ValueTypes.COLUMN,
        field: "id",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "param",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: 1,
      },
    ],
  },
  "MAXIMUM([id], 'param', 1)"
);
