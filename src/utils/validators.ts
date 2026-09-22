

type IValidationResult = {
  isValid: boolean;
  message?: string;
};

export function validateRequired(value: string, fieldName: string): IValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: `Поле "${fieldName}" є обов'язковим.` };
  }
  return { isValid: true };
}

export function validateYear(yearStr: string): IValidationResult {
  const regex = /^(19|20)\d{2}$/;
  if (!regex.test(yearStr)) {
    return {
      isValid: false,
      message: 'Рік видання повинен бути 4-значним числом у діапазоні 1900-2099.'
    };
  }
  return { isValid: true };
}


export function validateNumericId(idStr: string): IValidationResult {
  const regex = /^\d+$/;
  if (!regex.test(idStr)) {
    return { isValid: false, message: 'ID користувача повинен містити тільки цифри.' };
  }
  return { isValid: true };
}

export function validateEmail(email: string): IValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Некоректний формат Email адреси.' };
  }
  return { isValid: true };
}