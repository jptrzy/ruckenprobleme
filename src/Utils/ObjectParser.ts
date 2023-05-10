
// TODO make it work with unidentify data

import { Type } from "typescript";

export function isOfClass<T extends object>(TCreator: { new (): T; }, object: object): boolean {
    const TObject: T = new TCreator();

    // Check for equal keys
    if (Object.keys(object).sort().toString() !== Object.keys(TObject).sort().toString()) return false;
    
    // Check for equal types
    return !Object.keys(TObject).some(key => typeof (object  as any)[key] !== typeof (TObject  as any)[key]);
}