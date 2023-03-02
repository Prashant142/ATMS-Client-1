import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import * as s from "../../../styles/common.style";
import InlineSVG from "react-inlinesvg";

import HomeIcon from "../../public/assets/home-icon.svg";

const Header = () => {
  return (
    <>
      <s.Header>
        <div className="container">
          <div className="header-block">
            <div className="logo-header">
              <Link href="/">
                <img src="assets/logo.svg" alt="logo"></img>
              </Link>
            </div>
            <div className="menu-block-header">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Our Services</Link>
                </li>
                <li>
                  <Link href="#">Contact Us</Link>
                </li>
                <li>
                  <Link href="#">Carrer with Us</Link>
                </li>
              </ul>
              <div className="header-right">
                <div className="link-right">
                  <Link href="#">ATMS@Net</Link>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search this blog"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-secondary" type="button">
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </s.Header>
    </>
  );
};
export default Header;
