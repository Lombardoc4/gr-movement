/* Amplify Params - DO NOT EDIT
	API_GRMOVEMENT_GRAPHQLAPIENDPOINTOUTPUT
	API_GRMOVEMENT_GRAPHQLAPIIDOUTPUT
	API_GRMOVEMENT_GRAPHQLAPIKEYOUTPUT
	AUTH_GRMOVEMENT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from "node-fetch";
import {Client} from "@googlemaps/google-maps-services-js";

const GRAPHQL_ENDPOINT = process.env.API_GRMOVEMENT_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_GRMOVEMENT_GRAPHQLAPIKEYOUTPUT;

const createPerson = /* GraphQL */ `
  mutation CREATE_PERSON($input: CreatePersonInput!) {
    createPerson(input: $input) {
      id
      firstName
      lastName
      foreverAge
      state
      country
      imgUrl
      createdAt
      updatedAt
      _version
      _lastChangedAt
    }
  }
`;

const createMapEntry = /* GraphQL */ `
    mutation CreateMapEntry($input: CreateMapEntryInput!) {
        createMapEntry(input: $input) {
            id
            email
            state
            town
            latitude
            longitude
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
        }
    }
`;

const fetchGeoLocation = (town, state) => {
  const client = new Client({});

  return client.geocode({
      params: {
        address: `${town}, ${state}`,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 3000, // milliseconds
    })
    .then((r) => {
      return {
        latitude: r.data.results[0].geometry.location.lat,
        longitude: r.data.results[0].geometry.location.lng
      }

    })
    .catch((e) => {
      console.log(e.response.data.error_message);
      return null
    });
}

const adjustProvinceToState = (data) => {
  if (!data.state && data.province){
    data.state = data.province;
    delete data.province;
  }
  if (data.state) {
    delete data.province;
  }

  return data
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export async function handler (event) {
  const rawData = JSON.parse(event.body)
  let data = adjustProvinceToState(rawData)

  let statusCode = 200;
  let response;
  let body;


  if (rawData.town && rawData.userState) {
    const latLng = await fetchGeoLocation(rawData.town, rawData.userState)

    const inputs = {
      email: data.email,
      town: data.town,
      state: data.userState,
      ...latLng
    }

    // Remove town from entry
    delete data.town


    const createMapEntryOptions = {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY
      },
      body: JSON.stringify({ query: createMapEntry, variables: { input: inputs }  })
    };
    const createMapEntryRequest = new Request(GRAPHQL_ENDPOINT, createMapEntryOptions);

    try {
      response = await fetch(createMapEntryRequest);
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
  }

  /** @type {import('node-fetch').RequestInit} */
  const createPersonOptions = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ query: createPerson, variables: { input: data }})
  };

  const createPersonRequest = new Request(GRAPHQL_ENDPOINT, createPersonOptions);
  try {
    response = await fetch(createPersonRequest);
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
