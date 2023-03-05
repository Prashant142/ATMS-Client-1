/* eslint-disable @next/next/no-img-element */
import * as s from "../styles/common.style";

import Footer from "../components/layout/footer";

import Head from "next/head";
import { asyncLogout } from "@/services/auth/auth.service";
import { useEffect, useRef, useState ,SyntheticEvent} from "react";

import Router from "next/router";
import { checkIsAuth, getUserName } from "@/utils/globalFunctions";
import { eraseCookie, readCookie } from "@/utils/cookieCreator";
import { storageKeys } from "@/utils/constants";


import WelcomePage from "./WelcomePage";


import { TabContext,TabList,TabPanel } from "@mui/lab";


import {Box,Tab} from "@mui/material";
import TrailLog from "./getTrailreport";
import Header from "./Header/header";
import { getState } from "@/services/Api/Projects/projects.service";


const LandingScreen = () => {
  // const [projectsData, setProjectsData] = useState<any>([]);
  // const dataFetchedRef = useRef(false);
  const [username, setUsername] = useState("");

  const pages = {
    '1': '/WelcomePage',
    '2':'/getTrailreport',
    '3':'/'
  }
  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/login");
      return;
    }
    const username = getUserName();
    setUsername(username);
    setValue(getState());
    // if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;
    // fetchProjects();
  }, []);

  const [value, setValue] = useState('1');
  const handlechange = (event:SyntheticEvent,newValue:string) => {
    setValue(newValue);
  }
  

  // const fetchProjects = async () => {
  //   setIsLoading(true);
  //   const response = await asyncGetAllProjects();
  //   setIsLoading(false);

  //   console.log("response: ", response);
  //   if (response) {
  //     if (response?.data) {
  //       setProjectsData(response.data);
  //     }
  //     errorAlert(response);
  //   }
  // };

  const handleSignOut = async (e: any) => {
    e.preventDefault();
    // if (username) {
    //   Router.push("/login");
    //   return;
    // }
    console.log("in signout");
    await asyncLogout();
    eraseCookie(storageKeys?.userName);
    Router.push("/login");
  };

  // const handleOnClickViewProject = (data: any) => {
  //   if (data) {
  //     Router.push({
  //       pathname: "/deleteprojects",
  //       query: { p_name: data?.p_name, code: data?.code },
  //     });
  //   }
  // };

  return (
    <>
       
       <Header></Header>
       
        <Footer />
     
    </>
  );
};
export default LandingScreen;
