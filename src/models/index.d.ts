import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type HeroesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PersonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerHeroes = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly heroName?: string | null;
  readonly heroEmail?: string | null;
  readonly state?: string | null;
  readonly bio?: string | null;
  readonly heroPhotos?: (string | null)[] | null;
  readonly heroVideo?: string | null;
  readonly framePhoto?: (string | null)[] | null;
  readonly heroProfile?: string | null;
  readonly verified?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHeroes = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly heroName?: string | null;
  readonly heroEmail?: string | null;
  readonly state?: string | null;
  readonly bio?: string | null;
  readonly heroPhotos?: (string | null)[] | null;
  readonly heroVideo?: string | null;
  readonly framePhoto?: (string | null)[] | null;
  readonly heroProfile?: string | null;
  readonly verified?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Heroes = LazyLoading extends LazyLoadingDisabled ? EagerHeroes : LazyHeroes

export declare const Heroes: (new (init: ModelInit<Heroes, HeroesMetaData>) => Heroes) & {
  copyOf(source: Heroes, mutator: (draft: MutableModel<Heroes, HeroesMetaData>) => MutableModel<Heroes, HeroesMetaData> | void): Heroes;
}

type EagerPerson = {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly foreverAge?: string | null;
  readonly country?: string | null;
  readonly state?: string | null;
  readonly imgUrl?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPerson = {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly foreverAge?: string | null;
  readonly country?: string | null;
  readonly state?: string | null;
  readonly imgUrl?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Person = LazyLoading extends LazyLoadingDisabled ? EagerPerson : LazyPerson

export declare const Person: (new (init: ModelInit<Person, PersonMetaData>) => Person) & {
  copyOf(source: Person, mutator: (draft: MutableModel<Person, PersonMetaData>) => MutableModel<Person, PersonMetaData> | void): Person;
}