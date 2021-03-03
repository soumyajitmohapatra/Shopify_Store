import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import Card from "../components/product/Card"
import Promo from "../components/promo/Promo"

const Index = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="main">
        <Promo />
        <Card />
      </div>
    </Layout>
  )
}
export default Index
