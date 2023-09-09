import { QueryTypes } from "../../../../src/chips-lq/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-lq/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectQuery(
  "Basic INSERT statement",
  {
    queryType: QueryTypes.INSERT,
    into: {
      name: "customers",
      schema: "sales",
    },
    values: [
      [
        {
          field: "name",
          value: {
            valueType: ValueTypes.RAW_VALUE,
            value: "Gloria",
          },
        },
        {
          field: "lastname",
          value: {
            valueType: ValueTypes.RAW_VALUE,
            value: "Gaynor",
          },
        },
      ],
    ],
  },
  "INSERT INTO [sales].[customers] ([name], [lastname]) VALUES ('Gloria', 'Gaynor');"
);

service.expectQuery(
  "Basic batch INSERT statement",
  {
    queryType: QueryTypes.INSERT,
    into: {
      name: "customers",
      schema: "sales",
    },
    values: [
      [
        {
          field: "name",
          value: {
            valueType: ValueTypes.RAW_VALUE,
            value: "Gloria",
          },
        },
        {
          field: "lastname",
          value: {
            valueType: ValueTypes.RAW_VALUE,
            value: "Gaynor",
          },
        },
      ],
      [
        {
          field: "name",
          value: {
            valueType: ValueTypes.RAW_VALUE,
            value: "Roxie",
          },
        },
        {
          field: "lastname",
          value: {
            valueType: ValueTypes.RAW_VALUE,
            value: "Hart",
          },
        },
      ],
    ],
  },
  "INSERT INTO [sales].[customers] ([name], [lastname]) VALUES ('Gloria', 'Gaynor'), ('Roxie', 'Hart');"
);
