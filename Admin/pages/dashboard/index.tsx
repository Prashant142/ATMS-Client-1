/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import * as s from "../../styles/common.style";
// import { Sidebar } from "../sidebar";
import Sidebar from "../../src/components/sidebar";

import HomeIcon from "../../public/assets/home-icon.svg";
import { checkIsAuth } from "@/utils/globalFunctions";
import { useEffect } from "react";
import Router from "next/router";
import { errorAlert, successAlert } from "@/utils/alerts";

const Dashboard = () => {
  useEffect(() => {
    // errorAlert("something went wrong");
    // successAlert("good");

    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>WiseScan | Dashboard</title>
      </Head>
      <Sidebar />
      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block">
            <h3>Dashboard</h3>
          </div>
          <div className="dashboard-block-innerblock">
            <div className="block-dash">
              <div className="block-dash-inner">
                <div className="block-icon">
                  <img src="assets/people-icon.svg" alt="people-icon"></img>
                </div>
                <div className="block-content">
                  <h3>Administrator</h3>
                  <p onClick={() => Router.push("/changepassword")}>
                    Change Password?
                  </p>
                </div>
              </div>
            </div>
            <div className="block-dash">
              <div className="block-dash-inner">
                <div className="block-icon">
                  <img
                    src="assets/albums-sharp-icon.svg"
                    alt="albums-sharp"
                  ></img>
                </div>
                <div className="block-content">
                  <h3>ATms@net</h3>
                  <p onClick={() => Router.push("/clients")}>
                    Client Management
                  </p>
                  <p onClick={() => Router.push("/projects")}>
                    Project Management
                  </p>
                </div>
              </div>
            </div>
            <div className="block-dash">
              <div className="block-dash-inner">
                <div className="block-icon">
                  <img src="assets/website-icon.svg" alt="website-icon"></img>
                </div>
                <div className="block-content">
                  <h3>Website</h3>
                  <p onClick={() => Router.push("/projecthighlightmanagement")}>
                    Project Highlight
                  </p>
                  <p onClick={() => Router.push("/newslinemanagement")}>
                    News Line
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </s.CommonDashboardBlock>
    </>
  );
};
export default Dashboard;
