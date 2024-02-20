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

const mutation = /* GraphQL */ `
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export async function handler (event) {
    let data = JSON.parse(event.body);

    if (!data)
        return

    const latLng = await fetchGeoLocation(data.town, data.userState)

    data.state = data.userState;
    delete data.userState

    let statusCode = 200;
    let body;
    let response;


    /** @type {import('node-fetch').RequestInit} */
    const options = {
        method: "POST",
        headers: {
            "x-api-key": GRAPHQL_API_KEY,
        },
        body: JSON.stringify({ query: mutation, variables: { input: {...data, ...latLng } } }),
    };

    const request = new Request(GRAPHQL_ENDPOINT, options);


    try {
        response = await fetch(request);
        body = await response.json();
        console.log('body', body)
        if (body.errors) statusCode = 400;
    } catch (error) {
        statusCode = 400;
        body = {
            errors: [
                {
                    status: response.status,
                    message: error.message,
                    stack: error.stack,
                },
            ],
        };
    }

    return {
        statusCode,
        body: JSON.stringify(body),
    };
};
