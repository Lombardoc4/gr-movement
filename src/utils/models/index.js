// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Heroes, Person } = initSchema(schema);

export {
  Heroes,
  Person
};