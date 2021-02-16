import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const Index = () => {
  const { allShopifyProduct } = useStaticQuery(graphql`
    {
      allShopifyProduct(sort: { fields: [variants___price] }) {
        edges {
          node {
            title
            images {
              id
              originalSrc
              localFile {
                childImageSharp {
                  fixed(fit: COVER, width: 250, height: 250) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
            shopifyId
            handle
            vendor
            description
            availableForSale
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        {allShopifyProduct.edges ? (
          <ul>
            {allShopifyProduct.edges.map(
              ({
                node: {
                  handle,
                  title,
                  shopifyId,
                  description,
                  vendor,
                  images: [firstImage],
                  priceRange,
                },
              }) => (
                <li key={shopifyId}>
                  <h3>
                    <Link
                      to={`/product/${handle}/pid=${shopifyId}seller=${vendor}`}
                    >
                      {title}
                    </Link>
                    {" - "}${priceRange.minVariantPrice.amount}
                  </h3>
                  <Img
                    fixed={firstImage.localFile.childImageSharp.fixed}
                    alt={title}
                    key={shopifyId}
                  />
                  <p>{description}</p>
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No Products found</p>
        )}
      </div>
      
    </Layout>
  )
}
export default Index
