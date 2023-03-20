// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Heroes, Person, ImgPerson } = initSchema(schema);

export {
  Heroes,
  Person,
  ImgPerson
};