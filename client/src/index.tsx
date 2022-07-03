import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { render } from 'react-dom';
const { createUploadLink } = require("apollo-upload-client");

const client = new ApolloClient({
  link:createUploadLink({
    uri:"https://enigmatic-depths-88421.herokuapp.com/"
  }),
  cache: new InMemoryCache({
   typePolicies:{
    Query:{
      fields:{
        GetCharacters:{
          keyArgs:false,

          merge(existing = [], incoming, {mergeObjects, variables}){
            const merged = existing.Result ? existing.Result.slice(0) : [];
            for (let i = 0; i < incoming.Result.length; ++i) {
              merged[(variables?.pageNumber-1)*20 + i] = incoming.Result[i];
            }
            const returndata = {
              Info:{
                TotalPage:incoming.Info.TotalPage,
                currentPage:incoming.Info.currentPage,
              },
              Result:merged,
            }
            return returndata
          }
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