import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  text: {
    fontSize: "13px",
    fontWeight: "500",
  },
})

export default function MediaCard() {
  const classes = useStyles()

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
                  fixed(width: 150, height: 150) {
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
    <div className="product_grid">
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
          <div className="card" key={shopifyId}>
            <div className="img_container">
              <Link to={`/product/${handle}/pid=${shopifyId}seller=${vendor}`}>
                <Img
                  fixed={firstImage.localFile.childImageSharp.fixed}
                  alt={title}
                  key={shopifyId}
                />
              </Link>
            </div>
            <div className="botttom_container">
              <div className="brand_price">
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  {vendor}
                </Typography>
                <h6>₹{priceRange.minVariantPrice.amount}</h6>
              </div>
              <div className="title">
                <Typography
                  className={classes.text}
                  gutterBottom
                  variant="subtitle1"
                >
                  {title}
                </Typography>
              </div>
            </div>
            <div className="card_lebel">
              <span>
                <Button size="small">Add To Cart</Button>
              </span>
            </div>
          </div>
        )
      )}
    </div>
  )
}
