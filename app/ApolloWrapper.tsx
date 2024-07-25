"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://glad-insect-68.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "EKC7HFRMfM9IY70b5nMkE6R4zvPRiUB7pyK6UCZZdxHGiFiU17q0YEIbxCDlNj04",
  },
  cache: new InMemoryCache(),
});

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
