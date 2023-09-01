import { Query, QueryTypes } from "./types/queries/query.type";
import { ValueTypes } from "./types/values/value.type";

const  _: Query<{}> = {
    queryType: QueryTypes.INSERT,
    into: {
        name: 'users',
        schema: 'db_sch',
        alias: 'table',
    },
    values: [
        {
            test: {
                valueType: ValueTypes.RAW_VALUE,
                value: 'b',
            },
            a: {
                valueType: ValueTypes.RAW_VALUE,
                value: 'a',
            }
        }
    ]
}