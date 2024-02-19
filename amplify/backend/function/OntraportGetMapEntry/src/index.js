/* Amplify Params - DO NOT EDIT
	API_GRMOVEMENT_GRAPHQLAPIENDPOINTOUTPUT
	API_GRMOVEMENT_GRAPHQLAPIIDOUTPUT
	API_GRMOVEMENT_GRAPHQLAPIKEYOUTPUT
	AUTH_GRMOVEMENT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_GRMOVEMENT_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_GRMOVEMENT_GRAPHQLAPIKEYOUTPUT;

const mutation = /* GraphQL */ `
    mutation CreateMapEntry($input: CreateMapEntryInput!) {
        createMapEntry(input: $input) {
            id
            email
            state
            town
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
        }
    }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    let data = JSON.parse(event.body);
    let variables = { input: data };

    /** @type {import('node-fetch').RequestInit} */
    const options = {
        method: "POST",
        headers: {
            "x-api-key": GRAPHQL_API_KEY,
        },
        body: JSON.stringify({ query: mutation, variables }),
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
