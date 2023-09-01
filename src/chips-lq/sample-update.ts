import { ConditionType } from "./types/conditions/condition-type.enum";
import { ConditionOperands } from "./types/conditions/operands/condition-operands.enum";
import { JoinerOperands } from "./types/conditions/operands/joiner-operands.enum";
import { Query, QueryTypes } from "./types/queries/query.type";
import { ValueTypes } from "./types/values/value.type";

const _: Query<{}> = {
    queryType: QueryTypes.UPDATE,
    from: {
        name: 'users',
        schema: 'db',
    },
    values: {
        a: {
            valueType: ValueTypes.COLUMN,
            field: 'colname',
        },
    },
    where: {
        conditionType: ConditionType.JOINER,
        joinerOperand: JoinerOperands.AND,
        conditions: [
            {
                conditionType: ConditionType.CONDITION,
                conditionOperand: ConditionOperands.EQUALS,
                sourceValue: {
                    valueType: ValueTypes.COLUMN,
                    field: 'columnName'
                },
                targetValue: {
                    valueType: ValueTypes.RAW_VALUE,
                    value: 'a',
                }
            }
        ]
    }
}