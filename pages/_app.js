import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { store } from "../app/store";
import { Provider } from "react-redux";
import apolloClient from "../apollo/apolloClient";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  if (!apolloClient) {
    return <h1>Hello</h1>;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
