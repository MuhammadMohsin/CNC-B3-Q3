import { gql, useMutation, useQuery } from "@apollo/client";

const GET_REPOS = gql`
    query Organization($name: String!){
    organization(login: $name){
      repositories(first: 50){
        edges{
          node{
            name
            url
            id
          }
        }
      }
    }
  }`

const ADD_STAR = gql`
    mutation ($repositoryId: ID!) {
        addStar(input:{starrableId:$repositoryId}) {
            starrable {
                viewerHasStarred
            }
        }
    }`
const Repositories = () => {

    const [addTodo, { mutateData }] = useMutation(ADD_STAR);

    const AddStarToRepo = (repoId) => {
    addTodo({variables: { repositoryId: repoId }})
    }

    const { loading, error, data } = useQuery(GET_REPOS, {
        variables: { name: 'facebook' }
    });

    if (loading)
        return <h2>Loading..</h2>

    if (error)
        return <h2>Error</h2>

    console.log(data?.organization?.repositories?.edges);
    return <div>
        <h1>User Repositories</h1>
        <ul>
            {data?.organization?.repositories?.edges.map(({ node }) => (
                <li key={node?.id}>
                    <>
                        <a href={node.url} target="_blank">
                            {node.name}
                        </a>
                        {/* <button onClick={() => {
                            addTodo({ variables: { repositoryId: node?.id } })
                        }}>AddStar</button> */}

                        <button onClick={()=>AddStarToRepo(node?.id)}>AddStar</button>
                    </>
                </li>
            ))}
        </ul>
    </div>
}
export default Repositories;