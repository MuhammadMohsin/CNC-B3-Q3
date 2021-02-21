import './App.css';
import { ApolloProvider } from '@apollo/client';
import {client} from './config';
// import CoinMarket from './components/CoinMarket';
import Repositories from './components/Respositories';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <CoinMarket /> */}
        <Repositories />
      </div>
    </ApolloProvider>
  );
}

export default App;
