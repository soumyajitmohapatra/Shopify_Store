import React from "react"
import PropTypes from "prop-types"
import Header from "./header/Header"
import Footer from "./footer/Footer"

import "../style/styles.scss"

const Layout = ({ children }) => {


  return (
    <>
      <div className="container">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
