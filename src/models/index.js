// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Person, ImgPerson } = initSchema(schema);

export {
  Person,
  ImgPerson
};