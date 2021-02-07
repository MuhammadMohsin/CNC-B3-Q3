const Organization = ({orgData, handleStar}) => <div>
    <h1>{orgData?.name}</h1>
    <p>{orgData?.description}</p>
    <a href={orgData?.url} target="_blank">Github URL</a>
    <ul>
        {orgData?.repositories?.edges.map(({ node }) => <li key={node.id}>
            <span><b>{node.name}</b></span>
            <span><a href={node.url} target="_blank">Git URL</a></span>
            <span>{node.viewerHasStarred? (<button>Unstar</button>) : 
            (<button onClick={()=>handleStar(node.id)}>Star</button>)}</span>
        </li>)}
    </ul>
</div>

export default Organization;