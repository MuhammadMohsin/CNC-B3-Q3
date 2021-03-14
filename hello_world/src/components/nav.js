import React from "react";
import { Link } from "gatsby"
import * as styles from "./nav.module.css";

const Navbar = () => <ul className={styles.container}>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/products">Products</Link></li>
    <li><Link to="/about">About Us</Link></li>
    <li><Link to="/contact">Contact</Link></li>
</ul>

export default Navbar;