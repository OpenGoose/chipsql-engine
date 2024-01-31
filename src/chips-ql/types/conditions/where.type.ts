import { Condition } from "./condition.type";

export type Where<T extends NonNullable<unknown>> = Condition<T>;