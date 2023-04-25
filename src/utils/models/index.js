// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Ambassador, Heroes, Person } = initSchema(schema);

export {
  Ambassador,
  Heroes,
  Person
};