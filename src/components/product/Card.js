import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  text: {
    fontSize: "15px",
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
                  fixed(width: 200, height: 200) {
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
          <Card className="card" key={shopifyId}>
            <Link to={`/product/${handle}/pid=${shopifyId}seller=${vendor}`}>
              <CardActionArea>
                <div>
                  <Img
                    fixed={firstImage.localFile.childImageSharp.fixed}
                    alt={title}
                    key={shopifyId}
                  />
                </div>
                {/* <CardContent >
                  <Typography
                    className={classes.text}
                    gutterBottom
                    variant="subtitle1"
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {vendor}
                  </Typography>
                </CardContent> */}
              </CardActionArea>
            </Link>
            <CardActions className="card_lebel">
              <h5 >
                ₹{priceRange.minVariantPrice.amount}
              </h5>
              <Button size="small" color="primary">
                Add To Cart
              </Button>
            </CardActions>
          </Card>
        )
      )}
    </div>
  )
}
