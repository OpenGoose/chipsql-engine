import { Value } from "../values/value.type";
import { ConditionType } from "./condition-type.enum";
import { ConditionOperand } from "./operands/condition-operands.enum";
import { JoinerOperand } from "./operands/joiner-operands.enum";

export type Condition<T extends Object> =
  | {
      conditionType: ConditionType.CONDITION;
      sourceValue: Value<T>;
      targetValue: Value<T>;
      conditionOperand: ConditionOperand;
    }
  | {
      conditionType: ConditionType.JOINER;
      conditions: Condition<T>[];
      joinerOperand: JoinerOperand;
    };
