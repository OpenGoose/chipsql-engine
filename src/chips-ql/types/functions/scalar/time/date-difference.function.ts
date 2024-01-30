import { TimeInterval } from "../../../intervals/time-interval.enum";
import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface DateDifferenceFunction<T extends Object> {
    function: Function.DATE_DIFFERENCE;
    interval?: TimeInterval;
    origin: Value<T>;
    target: Value<T>;
}