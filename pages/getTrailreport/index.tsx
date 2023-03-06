import StickyHeadTable from "./table";
import { useState,useRef, useEffect } from "react";
import * as s from "../../styles/common.style"
import { checkIsAuth, getUserName } from "@/utils/globalFunctions";
import Router from "next/router";
import { asyncgetTrailLog } from "@/services/Api/Projects/projects.service";
import { errorAlert } from "@/utils/alerts";
import Loader from "@/components/Loader";
import { color } from "@mui/system";
import Header from "../Header/header";
import Footer from "@/components/layout/footer";
const TrailLog = () => {
   
    const [trailData, settrailData] = useState<any>([]);
    const dataFetchedRef = useRef(false);
    const [username, setUsername] = useState("");
    const [isempty,setisempty] = useState(false);
  
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!checkIsAuth()) {
          Router.push('/login');
          return;
        }
        const username = getUserName();
        setUsername(username);
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
       fetchtrails();
      }, [trailData]);
    
      const fetchtrails = async () => {
        setIsLoading(true);
        const response = await asyncgetTrailLog();
        setIsLoading(false);
    
        console.log("response: ", response);
        if (response) {
          if (response?.data) {
            if(response.data.length === 0) {
                setisempty(true);
                return;
            }
            settrailData(response.data);
            return;

            
          }
          errorAlert(response);
        }

     
      };





    return (
        <>
    
        {<Header></Header>}
         <h1 style={{color:'black',alignItems:'center',marginLeft:'100px',marginTop:'50px',marginBottom:'50px'}}>Trail Logs</h1>
         <br>
         </br>
         <div style={{marginBottom:"100px",marginLeft:'100px' , marginRight:'100px'}}>

      <StickyHeadTable ></StickyHeadTable>
         </div>
        
         <Footer></Footer>
        
                 </>
    ) ;
}


export default TrailLog;