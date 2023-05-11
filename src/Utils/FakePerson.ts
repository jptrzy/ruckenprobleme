/*
 * Only for testing
 */

export class FakePerson {
  name: string = "";
  age: number = 0;
  PESEL?: number = undefined;
}

export interface IFakePerson extends FakePerson {}
