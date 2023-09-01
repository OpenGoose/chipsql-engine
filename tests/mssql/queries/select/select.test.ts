import { ConditionType } from "../../../../src/chips-lq/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-lq/types/conditions/operands/condition-operands.enum";
import { JoinerOperands } from "../../../../src/chips-lq/types/conditions/operands/joiner-operands.enum";
import { Functions } from "../../../../src/chips-lq/types/functions/functions.enum";
import { JoinIncludes } from "../../../../src/chips-lq/types/joins/join-includes.enum";
import { JoinTypes } from "../../../../src/chips-lq/types/joins/join-types.enum";
import { QueryTypes } from "../../../../src/chips-lq/types/queries/query.type";
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
        name: "customers",
      },
    ],
  },
  "SELECT * FROM [customers];"
);

service.expectQuery(
  "Select muliple fields",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "first_name",
        alias: "name",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "TheMineWay",
        alias: "admin",
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
  },
  "SELECT [first_name] AS 'name', 'TheMineWay' AS 'admin' FROM [customers];"
);

service.expectQuery(
  "Select multiple fields with aliases",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "customer_id",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.COLUMN,
        field: "order_id",
        tableAlias: "o",
      },
    ],
    from: [
      {
        name: "customers",
        alias: "c",
      },
      {
        name: "orders",
        alias: "o",
        schema: "sales",
      },
    ],
  },
  "SELECT [c].[customer_id], [o].[order_id] FROM [customers] [c], [sales].[orders] [o];"
);

service.expectQuery(
  "Select using COUNT function",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "store_id",
          tableAlias: "s",
        },
        alias: "stores_count",
      },
    ],
    from: [
      {
        name: "stores",
        schema: "sales",
        alias: "s",
      },
    ],
  },
  "SELECT COUNT([s].[store_id]) AS 'stores_count' FROM [sales].[stores] [s];"
);

service.expectQuery(
  "Select using custom function",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.CUSTOM,
        name: "COUNT",
        parameters: [
          {
            valueType: ValueTypes.COLUMN,
            field: "store_id",
            tableAlias: "s",
          },
        ],
        alias: "stores_count",
      },
    ],
    from: [
      {
        name: "stores",
        schema: "sales",
        alias: "s",
      },
    ],
  },
  "SELECT COUNT([s].[store_id]) AS 'stores_count' FROM [sales].[stores] [s];"
);

service.expectQuery(
  "Query using subselect",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "first_name",
        alias: "name",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.SUBSELECT,
        fields: [
          {
            valueType: ValueTypes.FUNCTION,
            function: Functions.COUNT,
            value: {
              valueType: ValueTypes.COLUMN,
              field: "order_id",
              tableAlias: "o",
            },
          },
        ],
        from: [
          {
            name: "orders",
            alias: "o",
            schema: "sales",
          },
        ],
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        alias: "c",
        schema: "sales",
      },
    ],
  },
  "SELECT [c].[first_name] AS 'name', (SELECT COUNT([o].[order_id]) FROM [sales].[orders] [o]) AS 'count' FROM [sales].[customers] [c];"
);

service.expectQuery(
  "Select with simple WHERE with escaping character",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
        tableAlias: "c",
      },
    ],
    from: [
      {
        name: "customers",
        alias: "c",
        schema: "sales",
      },
    ],
    where: {
      conditionType: ConditionType.JOINER,
      joinerOperand: JoinerOperands.OR,
      conditions: [
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.LIKE,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            tableAlias: "c",
            field: "email",
          },
          targetValue: {
            valueType: ValueTypes.RAW_VALUE,
            value: "%test@tmw.cat%",
          },
        },
        {
          conditionType: ConditionType.JOINER,
          joinerOperand: JoinerOperands.AND,
          conditions: [
            {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperands.EQUALS,
              sourceValue: {
                valueType: ValueTypes.COLUMN,
                field: "city",
                tableAlias: "c",
              },
              targetValue: {
                valueType: ValueTypes.RAW_VALUE,
                value: "ol' Baetulo",
              },
            },
            {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperands.NOT_EQUALS,
              sourceValue: {
                valueType: ValueTypes.COLUMN,
                tableAlias: "c",
                field: "phone",
              },
              targetValue: {
                valueType: ValueTypes.RAW_VALUE,
                value: "555 xx xx xx",
              },
            },
          ],
        },
      ],
    },
  },
  "SELECT [c].* FROM [sales].[customers] [c] WHERE ([c].[email] LIKE '%test@tmw.cat%' OR ([c].[city] = 'ol'' Baetulo' AND [c].[phone] != '555 xx xx xx'));"
);

service.expectQuery(
  "Select with INNER JOIN and IN statement",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
        alias: "c",
      },
    ],
    joins: [
      {
        joinType: JoinTypes.TABLE,
        include: JoinIncludes.INNER,
        table: {
          name: "orders",
          schema: "sales",
          alias: "o",
        },
        on: {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.EQUALS,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "o",
          },
          targetValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "c",
          },
        },
      },
    ],
    where: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.IN,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "store_id",
        tableAlias: "o",
      },
      targetValue: {
        valueType: ValueTypes.SET,
        values: [
          {
            valueType: ValueTypes.RAW_VALUE,
            value: 17,
          },
          {
            valueType: ValueTypes.RAW_VALUE,
            value: 14,
          },
        ],
      },
    },
  },
  "SELECT * FROM [sales].[customers] [c] INNER JOIN [sales].[orders] [o] ON [o].[customer_id] = [c].[customer_id] WHERE [o].[store_id] IN (17, 14);"
);
