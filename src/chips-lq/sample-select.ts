import { ConditionType } from "./types/conditions/condition-type.enum";
import { ConditionOperands } from "./types/conditions/operands/condition-operands.enum";
import { JoinerOperands } from "./types/conditions/operands/joiner-operands.enum";
import { Functions } from "./types/functions/functions.enum";
import { JoinTypes } from "./types/joins/join-types.enum";
import { OrderDirection } from "./types/order/order-direction.enum";
import { Query, QueryTypes } from "./types/queries/query.type";
import { ValueTypes } from "./types/values/value.type";

const _: Query<{}> = {
  queryType: QueryTypes.SELECT,
  from: [
    {
      name: "users",
      alias: "u",
    },
  ],
  where: {
    conditionType: ConditionType.JOINER,
    joinerOperand: JoinerOperands.OR,
    conditions: [
      {
        conditionType: ConditionType.CONDITION,
        sourceValue: {
          valueType: ValueTypes.COLUMN,
          field: "email",
        },
        targetValue: {
          valueType: ValueTypes.RAW_VALUE,
          value: "testmail",
        },
        conditionOperand: ConditionOperands.EQUALS,
      },
      {
        conditionType: ConditionType.CONDITION,
        sourceValue: {
          valueType: ValueTypes.VARIABLE,
          name: "test_var",
        },
        targetValue: {
          valueType: ValueTypes.SUBSELECT,
          fields: [
            {
              valueType: ValueTypes.COLUMN,
              field: "idPedido",
            },
          ],
          from: [
            {
              name: "pedidos",
            },
          ],
        },
        conditionOperand: ConditionOperands.IN,
      },
    ],
  },
  fields: [
    {
      valueType: ValueTypes.ALL_COLUMNS,
    },
    {
      valueType: ValueTypes.FUNCTION,
      function: Functions.LOWER,
      value: {
        valueType: ValueTypes.COLUMN,
        field: "name",
      },
      alias: "lowered",
    },
    {
      valueType: ValueTypes.FUNCTION,
      function: Functions.CUSTOM,
      name: "JSON_VALUES",
      parameters: [
        {
          valueType: ValueTypes.RAW_VALUE,
          value: '{"name":"test"}',
        },
      ],
      alias: "json_vals",
    },
  ],
  groupBy: [
    1,
    {
      valueType: ValueTypes.COLUMN,
      field: "surname",
    },
  ],
  orderBy: [
    {
      direction: OrderDirection.ASC,
      field: {
        valueType: ValueTypes.COLUMN,
        field: "name",
      },
    },
  ],
  limit: {
    valueType: ValueTypes.RAW_VALUE,
    value: 100,
  },
  offset: {
    valueType: ValueTypes.RAW_VALUE,
    value: 0,
  },
  joins: [
    {
      joinType: JoinTypes.TABLE,
      table: {
        name: 'employees',
        alias: 'e',
      },
    },
    {
      joinType: JoinTypes.SELECT,
      select: {
        fields: [
          {
            valueType: ValueTypes.ALL_COLUMNS,
          }
        ],
        from: [
          {
            name: 'agenda',
            alias: 'a',
          }
        ]
      },
      alias: 'a',
    }
  ]
};