import { ColumnarValue, Value } from "./value.type";

export type Set<T extends Object> = (Omit<ColumnarValue<T>, 'valueType'> & {
    value: Value<T>;
})[];