import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  root: {
    maxWidth: 990,
    display: "flex",
  },
  left: {
    flexGrow: 3,
    maxHeight: "30rem"
  },
  child: {
    flexGrow: 1,
  },
  right: {
    maxWidth : 300
  }
})

const ProductTemplate = ({ data }) => {
  const product = data.shopifyProduct
  const classes = useStyles()
  return (
    <Layout>
      <Card className={classes.root}>
        <div className={(classes.child && classes.left)}>
          {product.images.map(image => (
            <Img 
              fluid={image.localFile.childImageSharp.fluid}
              alt={image.title}
              key={image.shopifyId}
            />
          ))}
        </div>
        <div className={classes.child && classes.right}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              {product.priceRange.minVariantPrice.amount}
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </div>
      </Card>
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
