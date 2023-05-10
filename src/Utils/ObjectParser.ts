
// TODO make it work with unidentify data

import { Type } from "typescript";

type PropType<T, P extends keyof T> = Pick<T, P>[P]

export function isPartiallyOfClass<T extends object>(TCreator: { new (): T; }, object: object): boolean {
    const TObject: T = new TCreator();

    // Check for equal keys
    if (!Object.keys(object).some(key => !(key in Object.keys(TObject)))) return false;
    
    // Check for equal types
    return !Object.keys(object).some(key => typeof (object  as any)[key] !== typeof (TObject  as any)[key]);
}

export function isOfClass<T extends object>(TCreator: { new (): T; }, object: object): boolean {
    const TObject: T = new TCreator();

    // Check for equal keys
    if (Object.keys(object).sort().toString() !== Object.keys(TObject).sort().toString()) return false;
    
    // Check for equal types
    return !Object.keys(TObject).some(key => typeof (object  as any)[key] !== typeof (TObject  as any)[key]);
}