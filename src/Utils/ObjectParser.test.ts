import { isOfClass } from "./ObjectParser";
import { FakePerson } from "./FakePerson"

describe('ObjectParser', () => {
    it('proper object', async () => {
        expect(
            isOfClass(FakePerson, 
                {name: "", age: 0, PESEL: undefined})
            ).toBeTruthy();
    })

    it('proper object', async () => {
        expect(
            isOfClass(FakePerson, 
                {name: "", age: 0, PESEL: 231})
            ).toBeTruthy();
    })

    it('too many properties', async () => {
        expect(
            isOfClass(FakePerson, 
                {name: "", age: 0, PESEL: undefined, surname: ""})
            ).toBeFalsy();
    })

    it('less properties', async () => {
        expect(
            isOfClass(FakePerson, 
                {name: "", PESEL: undefined})
            ).toBeFalsy();
    })

    it('different type', async () => {
        expect(
            isOfClass(FakePerson, 
                {name: "", age: '0', PESEL: undefined})
            ).toBeFalsy();
    })

    it('empty', async () => {
        expect(
            isOfClass(FakePerson, {})
            ).toBeFalsy();
    })

    it('empty', async () => {
        expect(
            isOfClass(FakePerson, [])
            ).toBeFalsy();
    })
})