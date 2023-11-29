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
          value: '1234'
        },
        field: 'zip_code',
      }
    ]
  },
  "UPDATE [customers] SET [zip_code] = '1234' FROM [sales].[customers];"
);