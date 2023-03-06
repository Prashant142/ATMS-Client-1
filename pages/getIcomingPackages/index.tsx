
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
     <h1 style={{color:'black',alignItems:'center',margin:'50px'}}>Icoming Logs</h1>
     {logsData.map((item:any,index:number)=> {
        return <tr key={index
        } style={{margin:'50px'}}><td>{item.code}</td><td>{item.date}</td>{item.desc}</tr>
     })}
</s.HomeMain>
     </>
    );

}

export default IcomingPackages;