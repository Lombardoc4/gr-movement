/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAmbassadorInput = {
  id?: string | null,
  name: string,
  email?: string | null,
  state: string,
  info_perms?: boolean | null,
  email_perms?: boolean | null,
  volunteer_options?: Array< string | null > | null,
  _version?: number | null,
};

export type ModelAmbassadorConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  state?: ModelStringInput | null,
  info_perms?: ModelBooleanInput | null,
  email_perms?: ModelBooleanInput | null,
  volunteer_options?: ModelStringInput | null,
  and?: Array< ModelAmbassadorConditionInput | null > | null,
  or?: Array< ModelAmbassadorConditionInput | null > | null,
  not?: ModelAmbassadorConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Ambassador = {
  __typename: "Ambassador",
  id: string,
  name: string,
  email?: string | null,
  state: string,
  info_perms?: boolean | null,
  email_perms?: boolean | null,
  volunteer_options?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateAmbassadorInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  state?: string | null,
  info_perms?: boolean | null,
  email_perms?: boolean | null,
  volunteer_options?: Array< string | null > | null,
  _version?: number | null,
};

export type DeleteAmbassadorInput = {
  id: string,
  _version?: number | null,
};

export type CreateHeroesInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  heroName?: string | null,
  heroEmail?: string | null,
  state?: string | null,
  bio?: string | null,
  heroPhotos?: Array< string | null > | null,
  heroVideo?: string | null,
  framePhoto?: Array< string | null > | null,
  heroProfile?: string | null,
  verified?: boolean | null,
  _version?: number | null,
};

export type ModelHeroesConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  heroName?: ModelStringInput | null,
  heroEmail?: ModelStringInput | null,
  state?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  heroPhotos?: ModelStringInput | null,
  heroVideo?: ModelStringInput | null,
  framePhoto?: ModelStringInput | null,
  heroProfile?: ModelStringInput | null,
  verified?: ModelBooleanInput | null,
  and?: Array< ModelHeroesConditionInput | null > | null,
  or?: Array< ModelHeroesConditionInput | null > | null,
  not?: ModelHeroesConditionInput | null,
};

export type Heroes = {
  __typename: "Heroes",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  heroName?: string | null,
  heroEmail?: string | null,
  state?: string | null,
  bio?: string | null,
  heroPhotos?: Array< string | null > | null,
  heroVideo?: string | null,
  framePhoto?: Array< string | null > | null,
  heroProfile?: string | null,
  verified?: boolean | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateHeroesInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  heroName?: string | null,
  heroEmail?: string | null,
  state?: string | null,
  bio?: string | null,
  heroPhotos?: Array< string | null > | null,
  heroVideo?: string | null,
  framePhoto?: Array< string | null > | null,
  heroProfile?: string | null,
  verified?: boolean | null,
  _version?: number | null,
};

export type DeleteHeroesInput = {
  id: string,
  _version?: number | null,
};

export type CreatePersonInput = {
  id?: string | null,
  firstName: string,
  lastName: string,
  foreverAge?: string | null,
  country?: string | null,
  state?: string | null,
  imgUrl?: string | null,
  _version?: number | null,
};

export type ModelPersonConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  foreverAge?: ModelStringInput | null,
  country?: ModelStringInput | null,
  state?: ModelStringInput | null,
  imgUrl?: ModelStringInput | null,
  and?: Array< ModelPersonConditionInput | null > | null,
  or?: Array< ModelPersonConditionInput | null > | null,
  not?: ModelPersonConditionInput | null,
};

export type Person = {
  __typename: "Person",
  id: string,
  firstName: string,
  lastName: string,
  foreverAge?: string | null,
  country?: string | null,
  state?: string | null,
  imgUrl?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdatePersonInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  foreverAge?: string | null,
  country?: string | null,
  state?: string | null,
  imgUrl?: string | null,
  _version?: number | null,
};

export type DeletePersonInput = {
  id: string,
  _version?: number | null,
};

export type ModelAmbassadorFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  state?: ModelStringInput | null,
  info_perms?: ModelBooleanInput | null,
  email_perms?: ModelBooleanInput | null,
  volunteer_options?: ModelStringInput | null,
  and?: Array< ModelAmbassadorFilterInput | null > | null,
  or?: Array< ModelAmbassadorFilterInput | null > | null,
  not?: ModelAmbassadorFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelAmbassadorConnection = {
  __typename: "ModelAmbassadorConnection",
  items:  Array<Ambassador | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelHeroesFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  heroName?: ModelStringInput | null,
  heroEmail?: ModelStringInput | null,
  state?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  heroPhotos?: ModelStringInput | null,
  heroVideo?: ModelStringInput | null,
  framePhoto?: ModelStringInput | null,
  heroProfile?: ModelStringInput | null,
  verified?: ModelBooleanInput | null,
  and?: Array< ModelHeroesFilterInput | null > | null,
  or?: Array< ModelHeroesFilterInput | null > | null,
  not?: ModelHeroesFilterInput | null,
};

export type ModelHeroesConnection = {
  __typename: "ModelHeroesConnection",
  items:  Array<Heroes | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelPersonFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  foreverAge?: ModelStringInput | null,
  country?: ModelStringInput | null,
  state?: ModelStringInput | null,
  imgUrl?: ModelStringInput | null,
  and?: Array< ModelPersonFilterInput | null > | null,
  or?: Array< ModelPersonFilterInput | null > | null,
  not?: ModelPersonFilterInput | null,
};

export type ModelPersonConnection = {
  __typename: "ModelPersonConnection",
  items:  Array<Person | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionAmbassadorFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  info_perms?: ModelSubscriptionBooleanInput | null,
  email_perms?: ModelSubscriptionBooleanInput | null,
  volunteer_options?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAmbassadorFilterInput | null > | null,
  or?: Array< ModelSubscriptionAmbassadorFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionHeroesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  heroName?: ModelSubscriptionStringInput | null,
  heroEmail?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  heroPhotos?: ModelSubscriptionStringInput | null,
  heroVideo?: ModelSubscriptionStringInput | null,
  framePhoto?: ModelSubscriptionStringInput | null,
  heroProfile?: ModelSubscriptionStringInput | null,
  verified?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionHeroesFilterInput | null > | null,
  or?: Array< ModelSubscriptionHeroesFilterInput | null > | null,
};

export type ModelSubscriptionPersonFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  foreverAge?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  imgUrl?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPersonFilterInput | null > | null,
  or?: Array< ModelSubscriptionPersonFilterInput | null > | null,
};

export type CreateAmbassadorMutationVariables = {
  input: CreateAmbassadorInput,
  condition?: ModelAmbassadorConditionInput | null,
};

export type CreateAmbassadorMutation = {
  createAmbassador?:  {
    __typename: "Ambassador",
    id: string,
    name: string,
    email?: string | null,
    state: string,
    info_perms?: boolean | null,
    email_perms?: boolean | null,
    volunteer_options?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateAmbassadorMutationVariables = {
  input: UpdateAmbassadorInput,
  condition?: ModelAmbassadorConditionInput | null,
};

export type UpdateAmbassadorMutation = {
  updateAmbassador?:  {
    __typename: "Ambassador",
    id: string,
    name: string,
    email?: string | null,
    state: string,
    info_perms?: boolean | null,
    email_perms?: boolean | null,
    volunteer_options?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteAmbassadorMutationVariables = {
  input: DeleteAmbassadorInput,
  condition?: ModelAmbassadorConditionInput | null,
};

export type DeleteAmbassadorMutation = {
  deleteAmbassador?:  {
    __typename: "Ambassador",
    id: string,
    name: string,
    email?: string | null,
    state: string,
    info_perms?: boolean | null,
    email_perms?: boolean | null,
    volunteer_options?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateHeroesMutationVariables = {
  input: CreateHeroesInput,
  condition?: ModelHeroesConditionInput | null,
};

export type CreateHeroesMutation = {
  createHeroes?:  {
    __typename: "Heroes",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    heroName?: string | null,
    heroEmail?: string | null,
    state?: string | null,
    bio?: string | null,
    heroPhotos?: Array< string | null > | null,
    heroVideo?: string | null,
    framePhoto?: Array< string | null > | null,
    heroProfile?: string | null,
    verified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateHeroesMutationVariables = {
  input: UpdateHeroesInput,
  condition?: ModelHeroesConditionInput | null,
};

export type UpdateHeroesMutation = {
  updateHeroes?:  {
    __typename: "Heroes",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    heroName?: string | null,
    heroEmail?: string | null,
    state?: string | null,
    bio?: string | null,
    heroPhotos?: Array< string | null > | null,
    heroVideo?: string | null,
    framePhoto?: Array< string | null > | null,
    heroProfile?: string | null,
    verified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteHeroesMutationVariables = {
  input: DeleteHeroesInput,
  condition?: ModelHeroesConditionInput | null,
};

export type DeleteHeroesMutation = {
  deleteHeroes?:  {
    __typename: "Heroes",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    heroName?: string | null,
    heroEmail?: string | null,
    state?: string | null,
    bio?: string | null,
    heroPhotos?: Array< string | null > | null,
    heroVideo?: string | null,
    framePhoto?: Array< string | null > | null,
    heroProfile?: string | null,
    verified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreatePersonMutationVariables = {
  input: CreatePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type CreatePersonMutation = {
  createPerson?:  {
    __typename: "Person",
    id: string,
    firstName: string,
    lastName: string,
    foreverAge?: string | null,
    country?: string | null,
    state?: string | null,
    imgUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePersonMutationVariables = {
  input: UpdatePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type UpdatePersonMutation = {
  updatePerson?:  {
    __typename: "Person",
    id: string,
    firstName: string,
    lastName: string,
    foreverAge?: string | null,
    country?: string | null,
    state?: string | null,
    imgUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePersonMutationVariables = {
  input: DeletePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type DeletePersonMutation = {
  deletePerson?:  {
    __typename: "Person",
    id: string,
    firstName: string,
    lastName: string,
    foreverAge?: string | null,
    country?: string | null,
    state?: string | null,
    imgUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetAmbassadorQueryVariables = {
  id: string,
};

export type GetAmbassadorQuery = {
  getAmbassador?:  {
    __typename: "Ambassador",
    id: string,
    name: string,
    email?: string | null,
    state: string,
    info_perms?: boolean | null,
    email_perms?: boolean | null,
    volunteer_options?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListAmbassadorsQueryVariables = {
  filter?: ModelAmbassadorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAmbassadorsQuery = {
  listAmbassadors?:  {
    __typename: "ModelAmbassadorConnection",
    items:  Array< {
      __typename: "Ambassador",
      id: string,
      name: string,
      email?: string | null,
      state: string,
      info_perms?: boolean | null,
      email_perms?: boolean | null,
      volunteer_options?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAmbassadorsQueryVariables = {
  filter?: ModelAmbassadorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAmbassadorsQuery = {
  syncAmbassadors?:  {
    __typename: "ModelAmbassadorConnection",
    items:  Array< {
      __typename: "Ambassador",
      id: string,
      name: string,
      email?: string | null,
      state: string,
      info_perms?: boolean | null,
      email_perms?: boolean | null,
      volunteer_options?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetHeroesQueryVariables = {
  id: string,
};

export type GetHeroesQuery = {
  getHeroes?:  {
    __typename: "Heroes",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    heroName?: string | null,
    heroEmail?: string | null,
    state?: string | null,
    bio?: string | null,
    heroPhotos?: Array< string | null > | null,
    heroVideo?: string | null,
    framePhoto?: Array< string | null > | null,
    heroProfile?: string | null,
    verified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListHeroesQueryVariables = {
  filter?: ModelHeroesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHeroesQuery = {
  listHeroes?:  {
    __typename: "ModelHeroesConnection",
    items:  Array< {
      __typename: "Heroes",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      heroName?: string | null,
      heroEmail?: string | null,
      state?: string | null,
      bio?: string | null,
      heroPhotos?: Array< string | null > | null,
      heroVideo?: string | null,
      framePhoto?: Array< string | null > | null,
      heroProfile?: string | null,
      verified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncHeroesQueryVariables = {
  filter?: ModelHeroesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncHeroesQuery = {
  syncHeroes?:  {
    __typename: "ModelHeroesConnection",
    items:  Array< {
      __typename: "Heroes",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      heroName?: string | null,
      heroEmail?: string | null,
      state?: string | null,
      bio?: string | null,
      heroPhotos?: Array< string | null > | null,
      heroVideo?: string | null,
      framePhoto?: Array< string | null > | null,
      heroProfile?: string | null,
      verified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetPersonQueryVariables = {
  id: string,
};

export type GetPersonQuery = {
  getPerson?:  {
    __typename: "Person",
    id: string,
    firstName: string,
    lastName: string,
    foreverAge?: string | null,
    country?: string | null,
    state?: string | null,
    imgUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPeopleQueryVariables = {
  filter?: ModelPersonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPeopleQuery = {
  listPeople?:  {
    __typename: "ModelPersonConnection",
    items:  Array< {
      __typename: "Person",
      id: string,
      firstName: string,
      lastName: string,
      foreverAge?: string | null,
      country?: string | null,
      state?: string | null,
      imgUrl?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPeopleQueryVariables = {
  filter?: ModelPersonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPeopleQuery = {
  syncPeople?:  {
    __typename: "ModelPersonConnection",
    items:  Array< {
      __typename: "Person",
      id: string,
      firstName: string,
      lastName: string,
      foreverAge?: string | null,
      country?: string | null,
      state?: string | null,
      imgUrl?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateAmbassadorSubscriptionVariables = {
  filter?: ModelSubscriptionAmbassadorFilterInput | null,
};

export type OnCreateAmbassadorSubscription = {
  onCreateAmbassador?:  {
    __typename: "Ambassador",
    id: string,
    name: string,
    email?: string | null,
    state: string,
    info_perms?: boolean | null,
    email_perms?: boolean | null,
    volunteer_options?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateAmbassadorSubscriptionVariables = {
  filter?: ModelSubscriptionAmbassadorFilterInput | null,
};

export type OnUpdateAmbassadorSubscription = {
  onUpdateAmbassador?:  {
    __typename: "Ambassador",
    id: string,
    name: string,
    email?: string | null,
    state: string,
    info_perms?: boolean | null,
    email_perms?: boolean | null,
    volunteer_options?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteAmbassadorSubscriptionVariables = {
  filter?: ModelSubscriptionAmbassadorFilterInput | null,
};

export type OnDeleteAmbassadorSubscription = {
  onDeleteAmbassador?:  {
    __typename: "Ambassador",
    id: string,
    name: string,
    email?: string | null,
    state: string,
    info_perms?: boolean | null,
    email_perms?: boolean | null,
    volunteer_options?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateHeroesSubscriptionVariables = {
  filter?: ModelSubscriptionHeroesFilterInput | null,
};

export type OnCreateHeroesSubscription = {
  onCreateHeroes?:  {
    __typename: "Heroes",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    heroName?: string | null,
    heroEmail?: string | null,
    state?: string | null,
    bio?: string | null,
    heroPhotos?: Array< string | null > | null,
    heroVideo?: string | null,
    framePhoto?: Array< string | null > | null,
    heroProfile?: string | null,
    verified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateHeroesSubscriptionVariables = {
  filter?: ModelSubscriptionHeroesFilterInput | null,
};

export type OnUpdateHeroesSubscription = {
  onUpdateHeroes?:  {
    __typename: "Heroes",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    heroName?: string | null,
    heroEmail?: string | null,
    state?: string | null,
    bio?: string | null,
    heroPhotos?: Array< string | null > | null,
    heroVideo?: string | null,
    framePhoto?: Array< string | null > | null,
    heroProfile?: string | null,
    verified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteHeroesSubscriptionVariables = {
  filter?: ModelSubscriptionHeroesFilterInput | null,
};

export type OnDeleteHeroesSubscription = {
  onDeleteHeroes?:  {
    __typename: "Heroes",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    heroName?: string | null,
    heroEmail?: string | null,
    state?: string | null,
    bio?: string | null,
    heroPhotos?: Array< string | null > | null,
    heroVideo?: string | null,
    framePhoto?: Array< string | null > | null,
    heroProfile?: string | null,
    verified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreatePersonSubscriptionVariables = {
  filter?: ModelSubscriptionPersonFilterInput | null,
};

export type OnCreatePersonSubscription = {
  onCreatePerson?:  {
    __typename: "Person",
    id: string,
    firstName: string,
    lastName: string,
    foreverAge?: string | null,
    country?: string | null,
    state?: string | null,
    imgUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePersonSubscriptionVariables = {
  filter?: ModelSubscriptionPersonFilterInput | null,
};

export type OnUpdatePersonSubscription = {
  onUpdatePerson?:  {
    __typename: "Person",
    id: string,
    firstName: string,
    lastName: string,
    foreverAge?: string | null,
    country?: string | null,
    state?: string | null,
    imgUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePersonSubscriptionVariables = {
  filter?: ModelSubscriptionPersonFilterInput | null,
};

export type OnDeletePersonSubscription = {
  onDeletePerson?:  {
    __typename: "Person",
    id: string,
    firstName: string,
    lastName: string,
    foreverAge?: string | null,
    country?: string | null,
    state?: string | null,
    imgUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
