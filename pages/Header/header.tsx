
/* eslint-disable @next/next/no-img-element */
import * as s from "../../styles/common.style";



import Head from "next/head";
import { asyncLogout } from "@/services/auth/auth.service";
import { useEffect, useRef, useState ,SyntheticEvent} from "react";

import Router from "next/router";
import { checkIsAuth, getUserName ,getisadminstatus} from "@/utils/globalFunctions";
import { eraseCookie, readCookie } from "@/utils/cookieCreator";
import { storageKeys } from "@/utils/constants";
import WelcomePage from "../WelcomePage";
import TrailLog from "../getTrailreport";


let initialState = true;


const Header = () => {

    
  const [value , setvalue] = useState(1);
  const [username, setUsername] = useState("");
  const [isadmins,setisadmin] = useState(null);
  
 
  const changepage = (value:any) => {
    // if(value === 1){
    //   Router.push('/WelcomePage');
    // }  

    // if(value === 2){
    //   Router.push('/getTrailreport');
    // }

     setvalue(value);
     if(value === 1) {
      Router.push('/WelcomePage');

     }
     if(value ===2) {
      Router.push('/getTrailreport');
     }

     if(value === 3) {
      Router.push('/getIcomingPackages')
     }
    
   

  }

  
 
  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/login");
      return;
    }
    const username = getUserName();
   
    
    setUsername(username);

    const isadmin = getisadminstatus();
    console.log(isadmin);
    setisadmin(isadmin);
   
  
  
  
    
    // if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;
    // fetchProjects();
  }, []);

 

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


    return (
   <>
     <Head>
        <title>WiseScan | Home</title>
      </Head>
      <s.HomeMain>

         
        {/* <Sidebar /> */}
       {/* <HomeHeader></HomeHeader> */}
         {<div className="top-home-block">
          <div className="container">
            <div className="title-block">
              <h1>
                User <span>Login</span>
              </h1>
            </div>
            <div className="title-block-bottom">
              <div className="project-block-under">

              
         
              <table>
  <tbody>
 
  <tr>
      <td onClick={()=> changepage(1)}><p>Projects</p></td>
   {isadmins === "False" ? "" : <td onClick={()=> changepage(2)}><p>Check Trail Report</p></td>}
    {isadmins === "False"? "" : <td onClick={()=> changepage(3)}><p>Check Incoming Packages</p></td>}
    </tr> 

   
  </tbody>
</table>
             






              </div>
              <div className="profile-block">
               
                <div className="profile-content">
                  {username && <h5>{username}</h5>}
                  {/* <Link href="/">Sign Out</Link> */}
                  <button onClick={handleSignOut}>
                    <a> {username ? `Sign Out` : "Sign In"}</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> }



        {/* <div className="welcome-block">
          <div className="container">
            <div className="welcome-block-inner">
              <h3>Welcome to Weiyi</h3>
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
                        <img
                          src="assets/profile-img.png"
                          alt="profile-img"
                        ></img>
                        <h5>{item?.p_name}</h5>
                      </div>
                      <div className="projects-link">
                        <Link
                          href=""
                          onClick={() => handleOnClickViewProject(item)}
                        >
                          <img
                            src="assets/eye-outline.svg"
                            alt="eye-outline"
                          ></img>
                        </Link>
                        <Link href="">
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
        </div> */}
         {/* <TabPanel value="1"><WelcomePage/></TabPanel>
    <TabPanel value="2"><TrailLog></TrailLog></TabPanel>
    <TabPanel value="3">Panel 3</TabPanel> */}
      
    
      </s.HomeMain>
   
   </>
    );

}

export default Header;