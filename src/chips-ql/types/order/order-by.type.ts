import { Value } from "../values/value.type";
import { OrderDirection } from "./order-direction.enum";

export interface OrderBy<T extends NonNullable<unknown>> {
    direction?: OrderDirection;
    field: number | Value<T>;
}