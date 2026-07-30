import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";

let client: ApolloClient<any> | null = null;

const ForwardExtensionsLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    if (response.data) {
      response.data = {
        ...response.data,
        contentNodes: {
          ...response.data.contentNodes,
          extra: response.extensions,
        },
      };
    }
    return response;
  })
).concat(
  new HttpLink({
    uri: "https://dev.admin.leafwell.com/wp/graphql",
  })
);

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: ForwardExtensionsLink,
      cache: new InMemoryCache(),
    });
  }

  return client;
};
