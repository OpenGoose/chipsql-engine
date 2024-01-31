import { Functions } from "../../functions.enum";

export interface CurrentTimeFunction<T extends NonNullable<unknown>> {
    function: Functions.CURRENT_TIME,
}