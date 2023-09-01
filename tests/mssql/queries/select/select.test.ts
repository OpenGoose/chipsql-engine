import {
  QueryTypes,
} from "../../../../src/chips-lq/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-lq/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectQuery(
  "Generate select all",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "users",
      },
    ],
  },
  "SELECT * FROM [users];"
);

service.expectQuery('Select muliple fields',
{
    queryType: QueryTypes.SELECT,
    fields: [
        {
            valueType: ValueTypes.COLUMN,
            field: 'name',
        },
        {
            valueType: ValueTypes.RAW_VALUE,
            value: 'TheMineWay',
            alias: 'admin',
        }
    ],
    from: [
        {
            name: 'employees',
        }
    ]
}, "SELECT [name], 'TheMineWay' AS 'admin' FROM [employees];");

service.expectQuery(
  "Select multiple fields with aliases",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "iban",
        tableAlias: "a",
      },
      {
        valueType: ValueTypes.COLUMN,
        field: "name",
        tableAlias: "u",
      },
    ],
    from: [
      {
        name: "accounts",
        alias: "a",
      },
      {
        name: "users",
        alias: "u",
        schema: 'auth',
      },
    ],
  },
  "SELECT [a].[iban], [u].[name] FROM [accounts] a, [auth].[users] u;"
);