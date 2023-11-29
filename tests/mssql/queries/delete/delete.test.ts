import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { LimitMode } from "../../../../src/chips-ql/types/limit/limit-mode.enum";
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

service.expectQuery('Delete user by id (without semicolon)', {
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
}, 'DELETE FROM [auth].[users] WHERE [id] = 1', {
    endWithSemicolon: false,
});

service.expectQuery('Delete top 10 rows of table', {
    queryType: QueryTypes.DELETE,
    from: {
        name: 'users',
        schema: 'auth'
    },
    limit: {
        value: {
            valueType: ValueTypes.RAW_VALUE,
            value: 10,
        },
    }
}, 'DELETE TOP (10) FROM [auth].[users];');

service.expectQuery('DELETE TOP 10 PERCENT rows of table', {
    queryType: QueryTypes.DELETE,
    from: {
        name: 'customers',
        schema: 'sales'
    },
    limit: {
        value: {
            value: 10,
            valueType: ValueTypes.RAW_VALUE,
        },
        limitMode: LimitMode.PERCENT,
    }
}, 'DELETE TOP (10) PERCENT FROM [sales].[customers];');