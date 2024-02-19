// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MapEntry, Ambassador, Heroes, Person } = initSchema(schema);

export {
  MapEntry,
  Ambassador,
  Heroes,
  Person
};