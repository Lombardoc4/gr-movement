/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAmbassador = /* GraphQL */ `
  query GetAmbassador($id: ID!) {
    getAmbassador(id: $id) {
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
export const listAmbassadors = /* GraphQL */ `
  query ListAmbassadors(
    $filter: ModelAmbassadorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAmbassadors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAmbassadors = /* GraphQL */ `
  query SyncAmbassadors(
    $filter: ModelAmbassadorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAmbassadors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getHeroes = /* GraphQL */ `
  query GetHeroes($id: ID!) {
    getHeroes(id: $id) {
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
export const listHeroes = /* GraphQL */ `
  query ListHeroes(
    $filter: ModelHeroesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeroes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncHeroes = /* GraphQL */ `
  query SyncHeroes(
    $filter: ModelHeroesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHeroes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
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
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPeople = /* GraphQL */ `
  query SyncPeople(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPeople(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
