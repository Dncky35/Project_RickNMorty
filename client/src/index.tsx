import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';
const { createUploadLink } = require("apollo-upload-client");

const client = new ApolloClient({
  link:createUploadLink({
    uri:"http://localhost:5000"
  }),
  cache: new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          GetCharacters:{
            keyArgs:false,

            merge(existing = [], incoming){
              return [...existing, ...incoming]
            },
          }
        }
      }
    }

  })
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)