/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAmbassador = /* GraphQL */ `
  mutation CreateAmbassador(
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
    }
  }
`;
export const updateAmbassador = /* GraphQL */ `
  mutation UpdateAmbassador(
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
    }
  }
`;
export const deleteAmbassador = /* GraphQL */ `
  mutation DeleteAmbassador(
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
    }
  }
`;
export const createHeroes = /* GraphQL */ `
  mutation CreateHeroes(
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
    }
  }
`;
export const updateHeroes = /* GraphQL */ `
  mutation UpdateHeroes(
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
    }
  }
`;
export const deleteHeroes = /* GraphQL */ `
  mutation DeleteHeroes(
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
    }
  }
`;
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
