// 1. integerNumber може бути присутнім або відсутнім
export type OptionalInteger = number | null;
export let integerNumber: OptionalInteger = null;

// 2. decimalNumber може бути присутнім або відсутнім
export type OptionalDecimal = number | null;
export let decimalNumber: OptionalDecimal = null;

// 3. Присвоїти значення integerNumber
integerNumber = 42;

// 4. Додати до integerNumber те ж значення, використовуючи інкремент/декремент
// (аналогічно: збільшити на саме себе -> integerNumber += integerNumber)
export const integer_before_increment = integerNumber;
integerNumber = (integerNumber ?? 0) + (integer_before_increment ?? 0);

// 5. Змінити знак числа на протилежний
export const integer_before_negate = integerNumber;
integerNumber = integerNumber !== null ? -integerNumber : null;

// 6. Присвоїти decimalNumber значенням integerNumber
decimalNumber = integerNumber;

// 7. pairOrValues що містить або не містить обидва значення
export type PairOrValues = { integerNumber: OptionalInteger; decimalNumber: OptionalDecimal } | null;
export let pairOrValues: PairOrValues = { integerNumber, decimalNumber };

export const decimalNumber1: number | null = null; // або null
export const decimalNumber2: number | null = 12.34; // або null


