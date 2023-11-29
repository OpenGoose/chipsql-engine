import { ColumnarValue, Value } from "./value.type";

export interface Set<T extends Object> extends Omit<ColumnarValue<T>, 'valueType'> {
    value: Value<T>;
}