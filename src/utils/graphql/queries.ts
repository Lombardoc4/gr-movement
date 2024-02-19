/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getMapEntry = /* GraphQL */ `query GetMapEntry($id: ID!) {
  getMapEntry(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMapEntryQueryVariables,
  APITypes.GetMapEntryQuery
>;
export const listMapEntries = /* GraphQL */ `query ListMapEntries(
  $filter: ModelMapEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listMapEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMapEntriesQueryVariables,
  APITypes.ListMapEntriesQuery
>;
export const syncMapEntries = /* GraphQL */ `query SyncMapEntries(
  $filter: ModelMapEntryFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMapEntries(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMapEntriesQueryVariables,
  APITypes.SyncMapEntriesQuery
>;
export const getAmbassador = /* GraphQL */ `query GetAmbassador($id: ID!) {
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
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAmbassadorQueryVariables,
  APITypes.GetAmbassadorQuery
>;
export const listAmbassadors = /* GraphQL */ `query ListAmbassadors(
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
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAmbassadorsQueryVariables,
  APITypes.ListAmbassadorsQuery
>;
export const syncAmbassadors = /* GraphQL */ `query SyncAmbassadors(
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
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncAmbassadorsQueryVariables,
  APITypes.SyncAmbassadorsQuery
>;
export const getHeroes = /* GraphQL */ `query GetHeroes($id: ID!) {
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
    __typename
  }
}
` as GeneratedQuery<APITypes.GetHeroesQueryVariables, APITypes.GetHeroesQuery>;
export const listHeroes = /* GraphQL */ `query ListHeroes(
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
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHeroesQueryVariables,
  APITypes.ListHeroesQuery
>;
export const syncHeroes = /* GraphQL */ `query SyncHeroes(
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
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncHeroesQueryVariables,
  APITypes.SyncHeroesQuery
>;
export const getPerson = /* GraphQL */ `query GetPerson($id: ID!) {
  getPerson(id: $id) {
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
` as GeneratedQuery<APITypes.GetPersonQueryVariables, APITypes.GetPersonQuery>;
export const listPeople = /* GraphQL */ `query ListPeople(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPeopleQueryVariables,
  APITypes.ListPeopleQuery
>;
export const syncPeople = /* GraphQL */ `query SyncPeople(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncPeopleQueryVariables,
  APITypes.SyncPeopleQuery
>;
