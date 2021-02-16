import { Link } from "gatsby"
import React from "react"
import SideDrawer from "./SideDrawer"
import { ShoppingCart } from "@material-ui/icons"

const Header = () => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div className="container inner-header">
      <SideDrawer />
      <div className="logo">
        <h1>
          <Link to="/">LEGO STORE</Link>
        </h1>
      </div>
      <div className="menu">
        <ShoppingCart />
      </div>
    </div>
  </header>
)

export default Header
