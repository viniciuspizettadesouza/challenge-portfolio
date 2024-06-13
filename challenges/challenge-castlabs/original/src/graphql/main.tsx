import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_GRAPHQL_API_KEY,
  },
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(import.meta.env.VITE_GRAPHQL_WS, {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-api-key": import.meta.env.VITE_GRAPHQL_API_KEY,
      },
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
