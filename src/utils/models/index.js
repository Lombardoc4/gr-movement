// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { WallCountries, MapEntry, Ambassador, Heroes, Person } = initSchema(schema);

export {
  WallCountries,
  MapEntry,
  Ambassador,
  Heroes,
  Person
};