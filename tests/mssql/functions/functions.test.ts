import { Functions } from "../../../src/chips-lq/types/functions/functions.enum";
import { ValueTypes } from "../../../src/chips-lq/types/values/value.type";
import { SqlLanguages } from "../../../src/sql/sql-languages.enum";
import { TestService } from "../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.testFunction(
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
