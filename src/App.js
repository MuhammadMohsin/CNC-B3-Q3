import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import Organization from './Org';

function App() {

  console.log(process.env.REACT_APP_GITHUB_TOKEN);

  const [orgData, setOrgData] = useState({});

  const axiosHandler = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
  });

  const GET_ORG_QUERY = `query getOrgData($name: String!){
    organization(login: $name){
      name
      url
      description
      repositories(first: 25){
        edges{
          node{
            name
            url
            id
            viewerHasStarred
          }
        }
      }
    }
  }
  `

  const ADD_STAR = `
    mutation ($repositoryId: ID!) {
      addStar(input:{starrableId:$repositoryId}) {
        starrable {
          viewerHasStarred
        }
      }
    }
`;

  useEffect(() => {
    // (()=>{})()
    (async () => {
      try {
        const res = await axiosHandler.post("", { query: GET_ORG_QUERY, variables: { name: "Facebook" } });
        console.log(res.data.data.organization);
        setOrgData(res.data.data.organization);
      } catch (err) {
        console.log(err);
      }
    })()
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const orgName = e.target.name.value;
    console.log(orgName);
    try {
      const res = await axiosHandler.post("",
        { query: GET_ORG_QUERY, variables: { name: orgName } }
      );
      console.log(res.data.data.organization);
      setOrgData(res.data.data.organization);
    } catch (err) {
      console.log(err);
    }
  }

  const handleStar = async (repoId) => {
    const res = await axiosHandler.post("", { query: ADD_STAR, variables: { repositoryId: repoId } });

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Enter Organization Name:
          <input type="text" name="name" required />
        </label>
        <input type="submit" value="Search" />
      </form>
      <Organization orgData={orgData} handleStar={handleStar} />
    </div>
  );
}

export default App;
