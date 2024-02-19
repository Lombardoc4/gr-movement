/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMapEntry = /* GraphQL */ `mutation CreateMapEntry(
  $input: CreateMapEntryInput!
  $condition: ModelMapEntryConditionInput
) {
  createMapEntry(input: $input, condition: $condition) {
    id
    email
    state
    town
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMapEntryMutationVariables,
  APITypes.CreateMapEntryMutation
>;
export const updateMapEntry = /* GraphQL */ `mutation UpdateMapEntry(
  $input: UpdateMapEntryInput!
  $condition: ModelMapEntryConditionInput
) {
  updateMapEntry(input: $input, condition: $condition) {
    id
    email
    state
    town
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMapEntryMutationVariables,
  APITypes.UpdateMapEntryMutation
>;
export const deleteMapEntry = /* GraphQL */ `mutation DeleteMapEntry(
  $input: DeleteMapEntryInput!
  $condition: ModelMapEntryConditionInput
) {
  deleteMapEntry(input: $input, condition: $condition) {
    id
    email
    state
    town
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMapEntryMutationVariables,
  APITypes.DeleteMapEntryMutation
>;
export const createAmbassador = /* GraphQL */ `mutation CreateAmbassador(
  $input: CreateAmbassadorInput!
  $condition: ModelAmbassadorConditionInput
) {
  createAmbassador(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAmbassadorMutationVariables,
  APITypes.CreateAmbassadorMutation
>;
export const updateAmbassador = /* GraphQL */ `mutation UpdateAmbassador(
  $input: UpdateAmbassadorInput!
  $condition: ModelAmbassadorConditionInput
) {
  updateAmbassador(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAmbassadorMutationVariables,
  APITypes.UpdateAmbassadorMutation
>;
export const deleteAmbassador = /* GraphQL */ `mutation DeleteAmbassador(
  $input: DeleteAmbassadorInput!
  $condition: ModelAmbassadorConditionInput
) {
  deleteAmbassador(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAmbassadorMutationVariables,
  APITypes.DeleteAmbassadorMutation
>;
export const createHeroes = /* GraphQL */ `mutation CreateHeroes(
  $input: CreateHeroesInput!
  $condition: ModelHeroesConditionInput
) {
  createHeroes(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateHeroesMutationVariables,
  APITypes.CreateHeroesMutation
>;
export const updateHeroes = /* GraphQL */ `mutation UpdateHeroes(
  $input: UpdateHeroesInput!
  $condition: ModelHeroesConditionInput
) {
  updateHeroes(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateHeroesMutationVariables,
  APITypes.UpdateHeroesMutation
>;
export const deleteHeroes = /* GraphQL */ `mutation DeleteHeroes(
  $input: DeleteHeroesInput!
  $condition: ModelHeroesConditionInput
) {
  deleteHeroes(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteHeroesMutationVariables,
  APITypes.DeleteHeroesMutation
>;
export const createPerson = /* GraphQL */ `mutation CreatePerson(
  $input: CreatePersonInput!
  $condition: ModelPersonConditionInput
) {
  createPerson(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePersonMutationVariables,
  APITypes.CreatePersonMutation
>;
export const updatePerson = /* GraphQL */ `mutation UpdatePerson(
  $input: UpdatePersonInput!
  $condition: ModelPersonConditionInput
) {
  updatePerson(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePersonMutationVariables,
  APITypes.UpdatePersonMutation
>;
export const deletePerson = /* GraphQL */ `mutation DeletePerson(
  $input: DeletePersonInput!
  $condition: ModelPersonConditionInput
) {
  deletePerson(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePersonMutationVariables,
  APITypes.DeletePersonMutation
>;
