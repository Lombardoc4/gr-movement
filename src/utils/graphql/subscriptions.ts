/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateWallCountries = /* GraphQL */ `subscription OnCreateWallCountries(
  $filter: ModelSubscriptionWallCountriesFilterInput
) {
  onCreateWallCountries(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateWallCountriesSubscriptionVariables,
  APITypes.OnCreateWallCountriesSubscription
>;
export const onUpdateWallCountries = /* GraphQL */ `subscription OnUpdateWallCountries(
  $filter: ModelSubscriptionWallCountriesFilterInput
) {
  onUpdateWallCountries(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateWallCountriesSubscriptionVariables,
  APITypes.OnUpdateWallCountriesSubscription
>;
export const onDeleteWallCountries = /* GraphQL */ `subscription OnDeleteWallCountries(
  $filter: ModelSubscriptionWallCountriesFilterInput
) {
  onDeleteWallCountries(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteWallCountriesSubscriptionVariables,
  APITypes.OnDeleteWallCountriesSubscription
>;
export const onCreateMapEntry = /* GraphQL */ `subscription OnCreateMapEntry($filter: ModelSubscriptionMapEntryFilterInput) {
  onCreateMapEntry(filter: $filter) {
    id
    email
    town
    state
    latitude
    longitude
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMapEntrySubscriptionVariables,
  APITypes.OnCreateMapEntrySubscription
>;
export const onUpdateMapEntry = /* GraphQL */ `subscription OnUpdateMapEntry($filter: ModelSubscriptionMapEntryFilterInput) {
  onUpdateMapEntry(filter: $filter) {
    id
    email
    town
    state
    latitude
    longitude
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMapEntrySubscriptionVariables,
  APITypes.OnUpdateMapEntrySubscription
>;
export const onDeleteMapEntry = /* GraphQL */ `subscription OnDeleteMapEntry($filter: ModelSubscriptionMapEntryFilterInput) {
  onDeleteMapEntry(filter: $filter) {
    id
    email
    town
    state
    latitude
    longitude
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMapEntrySubscriptionVariables,
  APITypes.OnDeleteMapEntrySubscription
>;
export const onCreateAmbassador = /* GraphQL */ `subscription OnCreateAmbassador(
  $filter: ModelSubscriptionAmbassadorFilterInput
) {
  onCreateAmbassador(filter: $filter) {
    id
    name
    email
    state
    info_perms
    email_perms
    volunteer_options
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAmbassadorSubscriptionVariables,
  APITypes.OnCreateAmbassadorSubscription
>;
export const onUpdateAmbassador = /* GraphQL */ `subscription OnUpdateAmbassador(
  $filter: ModelSubscriptionAmbassadorFilterInput
) {
  onUpdateAmbassador(filter: $filter) {
    id
    name
    email
    state
    info_perms
    email_perms
    volunteer_options
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAmbassadorSubscriptionVariables,
  APITypes.OnUpdateAmbassadorSubscription
>;
export const onDeleteAmbassador = /* GraphQL */ `subscription OnDeleteAmbassador(
  $filter: ModelSubscriptionAmbassadorFilterInput
) {
  onDeleteAmbassador(filter: $filter) {
    id
    name
    email
    state
    info_perms
    email_perms
    volunteer_options
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAmbassadorSubscriptionVariables,
  APITypes.OnDeleteAmbassadorSubscription
>;
export const onCreateHeroes = /* GraphQL */ `subscription OnCreateHeroes($filter: ModelSubscriptionHeroesFilterInput) {
  onCreateHeroes(filter: $filter) {
    id
    firstName
    lastName
    email
    heroName
    heroEmail
    state
    bio
    heroPhotos
    heroVideo
    framePhoto
    heroProfile
    verified
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateHeroesSubscriptionVariables,
  APITypes.OnCreateHeroesSubscription
>;
export const onUpdateHeroes = /* GraphQL */ `subscription OnUpdateHeroes($filter: ModelSubscriptionHeroesFilterInput) {
  onUpdateHeroes(filter: $filter) {
    id
    firstName
    lastName
    email
    heroName
    heroEmail
    state
    bio
    heroPhotos
    heroVideo
    framePhoto
    heroProfile
    verified
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateHeroesSubscriptionVariables,
  APITypes.OnUpdateHeroesSubscription
>;
export const onDeleteHeroes = /* GraphQL */ `subscription OnDeleteHeroes($filter: ModelSubscriptionHeroesFilterInput) {
  onDeleteHeroes(filter: $filter) {
    id
    firstName
    lastName
    email
    heroName
    heroEmail
    state
    bio
    heroPhotos
    heroVideo
    framePhoto
    heroProfile
    verified
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteHeroesSubscriptionVariables,
  APITypes.OnDeleteHeroesSubscription
>;
export const onCreatePerson = /* GraphQL */ `subscription OnCreatePerson($filter: ModelSubscriptionPersonFilterInput) {
  onCreatePerson(filter: $filter) {
    id
    firstName
    lastName
    foreverAge
    country
    state
    imgUrl
    email
    name
    permission
    possibleDuplicate
    town
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePersonSubscriptionVariables,
  APITypes.OnCreatePersonSubscription
>;
export const onUpdatePerson = /* GraphQL */ `subscription OnUpdatePerson($filter: ModelSubscriptionPersonFilterInput) {
  onUpdatePerson(filter: $filter) {
    id
    firstName
    lastName
    foreverAge
    country
    state
    imgUrl
    email
    name
    permission
    possibleDuplicate
    town
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePersonSubscriptionVariables,
  APITypes.OnUpdatePersonSubscription
>;
export const onDeletePerson = /* GraphQL */ `subscription OnDeletePerson($filter: ModelSubscriptionPersonFilterInput) {
  onDeletePerson(filter: $filter) {
    id
    firstName
    lastName
    foreverAge
    country
    state
    imgUrl
    email
    name
    permission
    possibleDuplicate
    town
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePersonSubscriptionVariables,
  APITypes.OnDeletePersonSubscription
>;
