import { client } from './Api/graphql';
import {
  ApolloProvider,
} from "@apollo/client";
import SearchComponent from './Pages';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <SearchComponent />
      </div>
    </ApolloProvider>
  );
}

export default App;
