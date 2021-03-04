import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { ArrowLeft, ArrowRight } from "@material-ui/icons"

const ProductTemplate = ({ data }) => {
  const product = data.shopifyProduct

  const [current, setCurrent] = React.useState(0)
  const length = product.images.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(product.images) || product.images.length <= 0) {
    return null
  }

  return (
    <Layout>
      <div className="single_product">
        <div className="image_container c">
            <ArrowLeft
              fontSize="large"
              className="leftArrow"
              onClick={prevSlide}
            />
             <ArrowRight
              fontSize="large"
              className="rightArrow"
              onClick={nextSlide}
            />
          {product.images.map((image, index) => (
            <div
              className={index === current ? "slide active" : "slide"}
              key={image.shopifyId}
            >
              {index === current && (
                <Img
                  fluid={image.localFile.childImageSharp.fluid}
                  alt={image.title}
                  key={image.shopifyId}
                />
              )}
            </div>
          ))}
        </div>
        <div className="product_info c">
          <div className="info">
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
            <h3>₹{product.priceRange.minVariantPrice.amount}</h3>
          </div>
          <div className="action">
            <Button variant="contained">Add to Cart</Button>
            <Button variant="contained">Buy Now</Button>
          </div>
        </div>
      </div>
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
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
