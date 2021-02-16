import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"

const ProductTemplate = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <Layout>
      {product.images.map(image => (
        <Img
          style={{ margin: "1rem" }}
          fixed={image.localFile.childImageSharp.fixed}
          key={image.id}
          alt={product.title}
        />
      ))}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4> {product.title}</h4>

        <p>
          {" - "}
          {product.priceRange.minVariantPrice.amount}
        </p>
      </div>
      <p>{product.description}</p>
    </Layout>
  )
}

export default ProductTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fixed(fit: COVER, width: 250, height: 250) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
  }
`
