import { ConditionType } from "../../../../src/chips-lq/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-lq/types/conditions/operands/condition-operands.enum";
import { JoinerOperands } from "../../../../src/chips-lq/types/conditions/operands/joiner-operands.enum";
import { Functions } from "../../../../src/chips-lq/types/functions/functions.enum";
import { JoinDirections } from "../../../../src/chips-lq/types/joins/join-directions.enum";
import { JoinIncludes } from "../../../../src/chips-lq/types/joins/join-includes.enum";
import { JoinTypes } from "../../../../src/chips-lq/types/joins/join-types.enum";
import { OrderDirection } from "../../../../src/chips-lq/types/order/order-direction.enum";
import { QueryTypes } from "../../../../src/chips-lq/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-lq/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectQuery(
  "Generate SELECT ALL",
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
  "SELECT muliple fields",
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
  "SELECT multiple fields with aliases",
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
  "SELECT using COUNT function",
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
  "SELECT using custom function",
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
  "SELECT using subselect",
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
  "SELECT with simple WHERE with escaping character",
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
            value: "%test@themineway.cat%",
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
  "SELECT [c].* FROM [sales].[customers] [c] WHERE ([c].[email] LIKE '%test@themineway.cat%' OR ([c].[city] = 'ol'' Baetulo' AND [c].[phone] != '555 xx xx xx'));"
);

service.expectQuery(
  "SELECT with INNER JOIN and IN statement",
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

service.expectQuery(
  "SELECT using a WHERE statement and a SUBSELECT inside a SET using a TOP clause",
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
    where: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.IN,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "zip_code",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueTypes.SET,
        values: [
          {
            valueType: ValueTypes.RAW_VALUE,
            value: "xxxxx",
          },
          {
            valueType: ValueTypes.SUBSELECT,
            fields: [
              {
                valueType: ValueTypes.COLUMN,
                field: "zip_code",
                tableAlias: "c2",
              },
            ],
            from: [
              {
                name: "customers",
                schema: "sales",
                alias: "c2",
              },
            ],
            where: {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperands.EQUALS,
              sourceValue: {
                valueType: ValueTypes.COLUMN,
                field: "email",
                tableAlias: "c2",
              },
              targetValue: {
                valueType: ValueTypes.RAW_VALUE,
                value: "x@themineway.cat",
              },
            },
            limit: {
              valueType: ValueTypes.RAW_VALUE,
              value: 1,
            },
          },
        ],
      },
    },
  },
  "SELECT * FROM [sales].[customers] [c] WHERE [c].[zip_code] IN ('xxxxx', (SELECT TOP 1 [c2].[zip_code] FROM [sales].[customers] [c2] WHERE [c2].[email] = 'x@themineway.cat'));"
);

service.expectQuery(
  "SELECT using ORDER BY, LIMIT and OFFSET",
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
      },
    ],
    orderBy: [
      {
        direction: OrderDirection.DESC,
        field: {
          valueType: ValueTypes.COLUMN,
          field: "zip_code",
        },
      },
    ],
    limit: {
      valueType: ValueTypes.RAW_VALUE,
      value: 25,
    },
    offset: {
      valueType: ValueTypes.RAW_VALUE,
      value: 10,
    },
  },
  "SELECT * FROM [sales].[customers] ORDER BY [zip_code] DESC OFFSET 10 ROWS FETCH FIRST 25 ROWS ONLY;"
);

service.expectQuery(
  "SELECT with GROUP BY and COUNT",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "city",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "customer_id",
          tableAlias: "c",
        },
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
        alias: "c",
      },
    ],
    groupBy: [
      {
        valueType: ValueTypes.COLUMN,
        field: "city",
        tableAlias: "c",
      },
    ],
  },
  "SELECT [c].[city], COUNT([c].[customer_id]) AS 'count' FROM [sales].[customers] [c] GROUP BY [c].[city];"
);

service.expectQuery(
  "SELECT with FULL OUTER JOIN",
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
        table: {
          name: "orders",
          schema: "sales",
          alias: "o",
        },
        direction: JoinDirections.FULL,
        include: JoinIncludes.OUTER,
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
  },
  "SELECT * FROM [sales].[customers] [c] FULL OUTER JOIN [sales].[orders] [o] ON [o].[customer_id] = [c].[customer_id];"
);

service.expectQuery(
  "SELECT with GROUP BY and HAVING",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "customer_id",
          tableAlias: "c",
        },
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
        alias: "c",
      },
    ],
    groupBy: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
    ],
    having: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.EQUALS,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueTypes.FUNCTION,
        function: Functions.MAX,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "age",
          tableAlias: "c",
        },
      },
    },
  },
  "SELECT [c].[age], COUNT([c].[customer_id]) AS 'count' FROM [sales].[customers] [c] GROUP BY [c].[age] HAVING [c].[age] = MAX([c].[age]);"
);
