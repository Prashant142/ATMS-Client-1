
import { checkIsAuth } from "@/utils/globalFunctions";
import * as s from "../../styles/common.style"
import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { asyncgetPackagesLog } from "@/services/Api/Projects/projects.service";
import { errorAlert } from "@/utils/alerts";
import Header from "../Header/header";
const IcomingPackages = () => {

    const [logsData, setlogData] = useState<any>([]);
    const dataFetchedRef = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isempty,setisempty] = useState(false);
    
 
    useEffect( () => {
        
 if (!checkIsAuth()) {
    Router.push('/login');
    return;
  }
  if (dataFetchedRef.current) return;
  dataFetchedRef.current = true;
   fetchpackages();
  
  

    },[logsData])

    

   
   const fetchpackages = async () => {
        setIsLoading(true);
        const response = await asyncgetPackagesLog();
        setIsLoading(false);
    
        console.log("response: ", response);
        if (response) {
          if (response?.data) {
            if(response.data.length === 0) {
                setisempty(true);
                return;
            }
             setlogData(response.data);
            return;

            
          }
          errorAlert(response);
        }

     
      };





    return (
     <>
    
     {<Header></Header>}
     <s.HomeMain>
     <h1 style={{color:'black',alignItems:'center',marginLeft:'100px' ,marginTop:'50px'}}>Incoming Logs</h1>
     
</s.HomeMain>
{logsData.map((item:any,index:number)=> {
        return <div style={{paddingLeft:"60px" , paddingTop:"25px"}}>
<tr key={index} style={{ color:'black' , justifyContent:"space-between"}}><td>{item.code}</td><td>{item.date}</td>{item.desc}</tr>
        </div> 
     })}
     </>
    );

}

export default IcomingPackages;