
// TODO make it work with unidentify data
export function isOfClass<T extends object>(TCreator: { new (): T; }, object: object): boolean {
    const TObject: T = new TCreator();
    
    // Debug
    // console.log (`TEST 1 ${Object.keys(object).toString()} ${Object.keys(TObject).toString()}`);

    // Check for equal keys
    if (Object.keys(object).sort().toString() !== Object.keys(TObject).sort().toString()) return false;
    
    // Debug
    // Object.keys(TObject).forEach(key => {
    //     if (typeof (object  as any)[key] != typeof (TObject  as any)[key]) {
    //         console.log(`TEST 2 ${key}: ${typeof (object  as any)[key]} != ${typeof (TObject  as any)[key]}`);
    //     }
    // })

    // Check for equal types
    return !Object.keys(TObject).some(key => typeof (object  as any)[key] != typeof (TObject  as any)[key]);
}