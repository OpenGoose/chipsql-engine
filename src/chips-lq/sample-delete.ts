import { ConditionType } from "./types/conditions/condition-type.enum";
import { ConditionOperands } from "./types/conditions/operands/condition-operands.enum";
import { Query, QueryTypes } from "./types/queries/query.type";
import { ValueTypes } from "./types/values/value.type";

const _: Query<{}> = {
    queryType: QueryTypes.DELETE,
    from: {
        name: 'users',
    },
    where: {
        conditionType: ConditionType.CONDITION,
        conditionOperand: ConditionOperands.IN,
        sourceValue: {
            valueType: ValueTypes.RAW_VALUE,
            value: 123
        },
        targetValue: {
            valueType: ValueTypes.RAW_SQL,
            sql: 'SELECT id FROM users WHERE dni = @dni',
        },
    },
}