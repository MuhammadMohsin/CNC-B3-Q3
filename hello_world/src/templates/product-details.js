import React from "react";

const ProjectDetails = ({ pageContext }) => (
    <div>
        <h1>{pageContext.title}</h1>
        <p>{pageContext.desc}</p>
    </div>
)

export default ProjectDetails;