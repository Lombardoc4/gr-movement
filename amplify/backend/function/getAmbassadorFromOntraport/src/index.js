/* Amplify Params - DO NOT EDIT
	API_GRMOVEMENT_GRAPHQLAPIENDPOINTOUTPUT
	API_GRMOVEMENT_GRAPHQLAPIIDOUTPUT
	API_GRMOVEMENT_GRAPHQLAPIKEYOUTPUT
	AUTH_GRMOVEMENT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_GRMOVEMENT_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_GRMOVEMENT_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
  mutation CreateAmbassador($input: CreateAmbassadorInput!) {
    createAmbassador(input: $input) {
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


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {

  let data = JSON.parse(event.body)

  data.volunteer_options = data.volunteer_options.split(',');
  data.info_perms = data.info_perms === 'Yes';
  data.email_perms = data.email_perms === 'Yes';

  console.log('data', data);

  let variables = { input: data };

  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ query, variables })
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body)
  };
};
