import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { QueryTypes } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectQuery('Delete all table', {
    queryType: QueryTypes.DELETE,
    from: {
        name: 'users',
        schema: 'auth'
    }
}, 'DELETE FROM [auth].[users];');

service.expectQuery('Delete user by id', {
    queryType: QueryTypes.DELETE,
    from: {
        name: 'users',
        schema: 'auth'
    },
    where: {
        conditionType: ConditionType.CONDITION,
        sourceValue: {
            valueType: ValueTypes.COLUMN,
            field: 'id'
        },
        targetValue: {
            valueType: ValueTypes.RAW_VALUE,
            value: 1,
        },
        conditionOperand: ConditionOperands.EQUALS,
    }
}, 'DELETE FROM [auth].[users] WHERE [id] = 1;');