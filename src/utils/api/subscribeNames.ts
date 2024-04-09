import { generateClient } from "aws-amplify/api";
import {  ModelSubscriptionPersonFilterInput, OnCreatePersonSubscription } from "../../API";
import { onCreatePerson } from "../graphql/subscriptions";
const client = generateClient();


export const subscribeNames = (filter: ModelSubscriptionPersonFilterInput, cb: (data: OnCreatePersonSubscription) => void) => {
    const variables = {
        filter
    }
    return client.graphql({ query: onCreatePerson, variables }).subscribe({
    next: ({data}: {data: OnCreatePersonSubscription}) => cb(data),
    error: (error) => error,
});
}