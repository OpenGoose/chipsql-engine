import { QueryWarningsService } from "./query-warnings.service";

export type WarningOptions = {
  throwExceptionOnExecutionWillFail?: boolean;
  logger?:
    | ((message: string, warning: QueryWarningsService<Object>) => void)
    | null;
};
