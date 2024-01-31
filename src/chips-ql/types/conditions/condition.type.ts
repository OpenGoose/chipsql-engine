import { Value } from "../values/value.type";
import { ConditionType } from "./condition-type.enum";
import { ConditionOperands } from "./operands/condition-operands.enum";
import { JoinerOperands } from "./operands/joiner-operands.enum";

export type Condition<T extends NonNullable<unknown>> =
  | {
      conditionType: ConditionType.CONDITION;
      sourceValue: Value<T>;
      targetValue: Value<T>;
      conditionOperand: ConditionOperands;
    }
  | {
      conditionType: ConditionType.JOINER;
      conditions: Condition<T>[];
      joinerOperand: JoinerOperands;
    };
