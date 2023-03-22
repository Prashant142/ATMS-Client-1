import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import * as s from "../../../styles/common.style";
import InlineSVG from "react-inlinesvg";

import HomeIcon from "../../public/assets/home-icon.svg";

const Footer = () => {
  return (
    <>
      <s.Footer>
        {/* <Sidebar /> */}
        <p>
          Copyright © 2023 Wisecan Engineering Services Pte Ltd. All rights
          reserved.
        </p>
      </s.Footer>
    </>
  );
};
export default Footer;
