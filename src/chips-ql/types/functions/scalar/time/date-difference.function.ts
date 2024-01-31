import { TimeInterval } from "../../../intervals/time-interval.enum";
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface DateDifferenceFunction<T extends NonNullable<unknown>> {
    function: Functions.DATE_DIFFERENCE;
    interval?: TimeInterval;
    origin: Value<T>;
    target: Value<T>;
}