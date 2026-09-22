import type { IValidationResult } from '../types';
export declare namespace Validation {
    function validateRequired(value: string, fieldName: string): IValidationResult;
    function validateYear(yearStr: string): IValidationResult;
    function validateEmail(email: string): IValidationResult;
}
//# sourceMappingURL=validators.d.ts.map