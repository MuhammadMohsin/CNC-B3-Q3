import React from "react";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";

const ProjectDetails = ({ pageContext }) => (
    <Layout>
        <h1>{pageContext.title}</h1>
        <p>{documentToReactComponents(JSON.parse(pageContext.desc))}</p>

        <p>Price: $100</p>
        <input type="number" placeholder="Enter Quantity" />
        <button>Buy</button>
    </Layout>
)

export default ProjectDetails;