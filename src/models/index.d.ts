import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PersonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImgPersonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Person {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly foreverAge?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Person, PersonMetaData>);
  static copyOf(source: Person, mutator: (draft: MutableModel<Person, PersonMetaData>) => MutableModel<Person, PersonMetaData> | void): Person;
}

export declare class ImgPerson {
  readonly id: string;
  readonly name: string;
  readonly image_id?: string | null;
  readonly forever_age?: number | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ImgPerson, ImgPersonMetaData>);
  static copyOf(source: ImgPerson, mutator: (draft: MutableModel<ImgPerson, ImgPersonMetaData>) => MutableModel<ImgPerson, ImgPersonMetaData> | void): ImgPerson;
}