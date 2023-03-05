/* eslint-disable @next/next/no-img-element */
import * as s from "../../styles/common.style";

import Link from "next/link";
import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import { asyncdeleteproject, asyncGetAllProjects } from "@/services/Api/Projects/projects.service";
import Router from "next/router";
import { checkIsAuth, getUserName } from "@/utils/globalFunctions";

import { errorAlert, successAlert } from "@/utils/alerts";
import Loader from "@/components/Loader";
import Header from "../Header/header";
import Footer from "@/components/layout/footer";







const WelcomePage = () => {
    const [projectsData, setProjectsData] = useState<any>([]);
    const dataFetchedRef = useRef(false);
    const [username, setUsername] = useState("");
  
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!checkIsAuth()) {
          Router.push("/login");
          return;
        }
        const username = getUserName();
        setUsername(username);
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchProjects();
      }, []);
    
      const fetchProjects = async () => {
        setIsLoading(true);
        const response = await asyncGetAllProjects();
        setIsLoading(false);
    
        console.log("response: ", response);
        if (response) {
          if (response?.data) {
            setProjectsData(response.data);
          }
          // errorAlert(response);
        }
      };


      const handleOnClickViewProject = (data: any) => {
        if (data) {
          Router.push({
            pathname: "/deleteprojects",
            query: { p_name: data?.p_name, code: data?.code },
          });
        }
      };


      const handledeleteProject = async (data:any) => {
        setIsLoading(true);
        const response = await asyncdeleteproject(data);
        window.location.reload();
        successAlert("Deleted successfully");
        setIsLoading(false);
       
    
        console.log("response: ", response);
        if (response) {
          if (response?.data) {
            successAlert("Login successfully");
             console.log("deleted Successfully!")
          }
          errorAlert(response);
        }
      }




    return (
        <>
        <s.HomeMain>
        {<Header></Header>}
         <div className="welcome-block">
          <div className="container">
            <div className="welcome-block-inner">
              <h3>Welcome to WiseScan</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Sit vitae aliquam
                malesuada quis. Nunc mi quam tempus scelerisque. Nam at netus
                tortor rhoncus facilisis at cras. Amet congue magna diam sed
                ullamcorper in. Aliquet malesuada sed pellentesque risus at a
                potenti.Platea sit eget potenti volutpat nullam feugiat a
                sagittis porttitor. Et gravida id gravida nec purus purus.
                Egestas id ante donec pellentesque cursus turpis pellentesque.
                Pellentesque id aliquam egestas sed velit in ut. Consectetur
                purus augue odio odio mauris.
              </p>
            </div>
            <div className="projects-block-table">
              <div className="projects-block-title">
                <h2>Projects</h2>
              </div>
              <div className="projects-block-list">
                {projectsData.map((item: any, index: number) => {
                  return (
                    <div className="projects-block-list-inner" key={index}>
                      <div className="projects-img">
                        
                        <h5>{item?.p_name}</h5>
                      </div>
                      <div className="projects-link">
                        <Link
                          href="/deleteprojects"
                          onClick={() => handleOnClickViewProject(item)}
                        >
                          <img
                            src="assets/eye-outline.svg"
                            alt="eye-outline"
                          ></img>
                        </Link>
                        <Link href="" onClick={() => handledeleteProject(item?.code)}>
                          <img
                            src="assets/trash-outline.svg"
                            alt="trash-outline"
                          ></img>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <Loader isLoading={isLoading} />
        <Footer></Footer>
        </s.HomeMain>
        </>
    );
}


export default WelcomePage;