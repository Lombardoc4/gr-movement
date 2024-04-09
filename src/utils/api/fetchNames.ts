import { generateClient } from "aws-amplify/api";
import { ListPeopleQueryVariables } from "../../API";
import { listPeople } from "../graphql/queries";

const client = generateClient();


export const fetchNames = async (variables: ListPeopleQueryVariables) => {

    const data = await client
        .graphql({
            query: listPeople,
            variables: variables,
        });

    return data;
};