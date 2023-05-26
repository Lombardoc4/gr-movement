/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAmbassador = /* GraphQL */ `
  subscription OnCreateAmbassador(
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
    }
  }
`;
export const onUpdateAmbassador = /* GraphQL */ `
  subscription OnUpdateAmbassador(
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
    }
  }
`;
export const onDeleteAmbassador = /* GraphQL */ `
  subscription OnDeleteAmbassador(
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
    }
  }
`;
export const onCreateHeroes = /* GraphQL */ `
  subscription OnCreateHeroes($filter: ModelSubscriptionHeroesFilterInput) {
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
    }
  }
`;
export const onUpdateHeroes = /* GraphQL */ `
  subscription OnUpdateHeroes($filter: ModelSubscriptionHeroesFilterInput) {
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
    }
  }
`;
export const onDeleteHeroes = /* GraphQL */ `
  subscription OnDeleteHeroes($filter: ModelSubscriptionHeroesFilterInput) {
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
    }
  }
`;
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onCreatePerson(filter: $filter) {
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
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onUpdatePerson(filter: $filter) {
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
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson($filter: ModelSubscriptionPersonFilterInput) {
    onDeletePerson(filter: $filter) {
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