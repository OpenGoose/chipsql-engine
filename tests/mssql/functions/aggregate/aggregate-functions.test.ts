import { Functions } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

// MAX
service.expectFunction(
  "MAX function",
  {
    function: Functions.MAX,
    value: {
      valueType: ValueTypes.COLUMN,
      field: "id",
    },
  },
  "MAX([id])"
);

// MIN
service.expectFunction(
  "MIN function",
  {
    function: Functions.MIN,
    value: {
      valueType: ValueTypes.COLUMN,
      field: "id",
    },
  },
  "MIN([id])"
);

// COUNT
service.expectFunction(
  "COUNT function",
  {
    function: Functions.COUNT,
    value: {
      valueType: ValueTypes.COLUMN,
      field: "id",
    },
  },
  "COUNT([id])"
);
