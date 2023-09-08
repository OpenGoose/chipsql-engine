import { QueryWarningsService } from "../../warnings/query-warnings.service";
import { WarningOptions } from "../../warnings/warning-options.type";

export type QueryCompilerOptions = {
  compactQuery?: boolean;
  endWithSemicolon?: boolean;
  warningOptions?: WarningOptions;
};
