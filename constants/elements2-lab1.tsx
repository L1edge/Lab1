import { JSX } from "react";

// Task 2 
export const stringValue4: string = "Hello World. This is Swift programming language";

export const lenght = stringValue4.length;

export const replacedItoU = stringValue4.replaceAll("i", "u"); 

        const removeAt = (s: string, position1Based: number[]) => {
             const posSet = new Set(position1Based.map(p => p-1));
            return Array.from(s).filter((_, i) => !posSet.has (i)).join("");
        };
export const removed_4_7_10 = removeAt(stringValue4, [4, 7, 10]);

export const Modified = stringValue4 + "(modified)";

export const isEmpty = stringValue4.length === 0;

export const addDot = stringValue4 + ".";

export const StartHello = stringValue4.startsWith("Hello");

export const EndWorld = stringValue4.endsWith("World");

const insertAfter1Based = (s: string, pos1Based: number, insert: string) => {
  const i = pos1Based;
  return s.slice(0, i) + insert + s.slice(i);
};

export const insertDashAfter10 = insertAfter1Based(stringValue4, 10, "-");


export const replaceThusus = replacedItoU.replaceAll("Thus us", "It is");


const charAt1Based = (s: string, pos1Based: number) => (pos1Based >= 1 && pos1Based <= s.length ? s.charAt(pos1Based - 1) : "");

export const char10 = charAt1Based(stringValue4, 10);
export const char15 = charAt1Based(stringValue4, 15);
export const substring_10_inclusive_15_exclusive = stringValue4.slice(10 - 1, 15 - 1);
export function map(arg0: ([key, value]: [any, any]) => JSX.Element): { [s: string]: unknown; } | ArrayLike<unknown> {
  throw new Error("Function not implemented.");
}

