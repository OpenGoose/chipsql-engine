import { ColumnarValue, Value } from "./value.type";

export type Set<T extends NonNullable<unknown>> = (Omit<ColumnarValue<T>, 'valueType'> & {
    value: Value<T>;
})[];