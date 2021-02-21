import { gql, useQuery } from '@apollo/client';

const EXCHANGE_RATES = gql`
query GetExchangeRates {
  rates(currency: "USD") {
    currency
    rate
  }
}
`;

const CoinMarket = () => {

    const { laoding, error, data } = useQuery(EXCHANGE_RATES);

    if (laoding)
        return <h1>Loading..</h1>
    if (error)
        return <h1>Error</h1>

    console.log(data?.rates);
    return <div>
      <h1>Coin Exchange Rates</h1>
      <table>
        {data?.rates.map(cObj=><tr key={cObj?.currency}>
            <th>{cObj?.currency}</th>
            <td>{cObj?.rate}</td>
          </tr>
        )}
      </table>
    </div>
}

export default CoinMarket;