import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const ProductPage = ({ data }) => {

    const productList = data?.allContentfulElectronics?.nodes;

    return <Layout>
        <h1>This is my Product page</h1>

        {
            productList.map(product=><div key={product.contentful_id}>
                <h2> {product?.title}</h2>
                <p> {product?.description}</p>
            </div>)
        }
    </Layout>
}


export const query = graphql`
query {
    allContentfulElectronics {
      nodes {
        slug
        title
        contentful_id
      }
    }
  }
`
export default ProductPage;