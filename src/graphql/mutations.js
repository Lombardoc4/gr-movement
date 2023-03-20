/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      bio
      heroProfile
      heroPhotos
      heroVideo
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
      bio
      heroProfile
      heroPhotos
      heroVideo
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
      bio
      heroProfile
      heroPhotos
      heroVideo
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
export const createImgPerson = /* GraphQL */ `
  mutation CreateImgPerson(
    $input: CreateImgPersonInput!
    $condition: ModelImgPersonConditionInput
  ) {
    createImgPerson(input: $input, condition: $condition) {
      id
      name
      image_id
      forever_age
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateImgPerson = /* GraphQL */ `
  mutation UpdateImgPerson(
    $input: UpdateImgPersonInput!
    $condition: ModelImgPersonConditionInput
  ) {
    updateImgPerson(input: $input, condition: $condition) {
      id
      name
      image_id
      forever_age
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteImgPerson = /* GraphQL */ `
  mutation DeleteImgPerson(
    $input: DeleteImgPersonInput!
    $condition: ModelImgPersonConditionInput
  ) {
    deleteImgPerson(input: $input, condition: $condition) {
      id
      name
      image_id
      forever_age
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
