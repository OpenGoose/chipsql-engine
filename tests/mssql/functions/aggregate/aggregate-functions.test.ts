import { Function } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

// MAX
service.expectFunction(
  "MAX function",
  {
    function: Function.MAX,
    value: {
      valueType: ValueType.COLUMN,
      field: "id",
    },
  },
  "MAX([id])"
);

// MIN
service.expectFunction(
  "MIN function",
  {
    function: Function.MIN,
    value: {
      valueType: ValueType.COLUMN,
      field: "id",
    },
  },
  "MIN([id])"
);

// COUNT
service.expectFunction(
  "COUNT function",
  {
    function: Function.COUNT,
    value: {
      valueType: ValueType.COLUMN,
      field: "id",
    },
  },
  "COUNT([id])"
);
