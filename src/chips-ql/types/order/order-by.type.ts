import { Value } from "../values/value.type";
import { OrderDirection } from "./order-direction.enum";

export interface OrderBy<T extends Object> {
    direction?: OrderDirection;
    field: number | Value<T>;
}