/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as s from "../../styles/common.style"

import Footer from "@/components/layout/footer";
import { DAYS, MONTHS, storageKeys, YEARS } from "@/utils/constants";
import Router, { useRouter } from "next/router";
import {
  asyncDownload,
  asyncGetProjectDetails,
} from "@/services/Api/Projects/projects.service";
import { eraseCookie, readCookie } from "@/utils/cookieCreator";
import { SyntheticEvent, useEffect, useState } from "react";
import { errorAlert } from "@/utils/alerts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment-mini";
import appConfig from "@/config";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { checkIsAuth, getUserName } from "@/utils/globalFunctions";
import { asyncLogout } from "@/services/auth/auth.service";
import Header from "../Header/header";

const addProjectValidationSchema = yup.object({
  startDay: yup.number().required("Start date is required"),
  startMonth: yup.number().required("Start date is required"),
  startYear: yup.number().required("Start date is required"),
});

const DeleteProjects = () => {
  const { query } = useRouter();
  const [queryData, setQueryData] = useState<any>({
    code: "",
    p_name: "",
  });

  const [filesData, setFilesData] = useState<any>([]);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProjectValidationSchema),
  });

  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }

    const username = getUserName();
    setUsername(username);
  }, []);
  useEffect(() => {
    if (router?.query && router?.query?.code && router?.query?.p_name) {
      setQueryData({
        code: router?.query?.code,
        p_name: router?.query?.p_name,
      });
    }
  }, [router]);

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

  const [values, setValues] = useState('');
  const handlechange = (event: SyntheticEvent, newValue: string) => {

    setValues(newValue);
  }


  const fetchProjectDetails = async (date: any) => {

    const params = {
      p_code: queryData?.code,
      p_name: queryData?.p_name,
      date: date,
    };
    console.log(params);
    const response = await asyncGetProjectDetails(params);
    if (response && response?.data) {
      if (typeof response?.data !== "string") {
        console.log(response.data);
        setFilesData(response?.data);
      } else {
        errorAlert(response?.data);
      }
    }
  };



  const handleOnClickDownload = async (data: any) => {
    console.log(data?.filename);
    if (data?.filepath) {
        const response = await asyncDownload(data?.filename);
        if(response && response?.data) {
          if(typeof response?.data !== "string"){
            console.log(response.data);
          }
        } else {
          errorAlert(response?.data);
        }
    }
  };

  const onSubmitProduct = (data: any) => {
    const { startDay, startMonth, startYear } = data;
    let start_date = startDay + "-" + startMonth + "-" + startYear;
    const isStartDateValid = moment(start_date, "DD-M-YYYY").isValid();
    if (!isStartDateValid) {
      setError("invalidStartDate", {
        message: "Please enter valid start date",
      });
      return;
    }
    const date = moment(start_date, "D-M-YYYY").format("D-MMM-YYYY");
    fetchProjectDetails(date);
    console.log("data :>> ", data, date);
  };

  return (
    <>
      <s.HomeMain>
        {<Header></Header>}
        <div className="welcome-block">
          <div className="container">
            <div className="projects-img-main">
              
              <h5>{queryData?.p_name}</h5>
            </div>
            <form onSubmit={handleSubmit(onSubmitProduct)}>
              <div className="select-custom-block">
                <select
                  placeholder="Day"
                  {...register("startDay", { required: true })}
                >
                  <option selected disabled>
                    Day
                  </option>
                  {DAYS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <select {...register("startMonth", { required: true })}>
                  <option selected disabled>
                    Month
                  </option>
                  {MONTHS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <select {...register("startYear", { required: true })}>
                  <option selected disabled>
                    Year
                  </option>
                  {YEARS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {(errors?.startDay ||
                  errors?.startMonth ||
                  errors?.startYear ||
                  errors?.invalidStartDate) && (
                    <s.ErrorMessageBlock>
                      Please enter valid start date
                    </s.ErrorMessageBlock>
                  )}
                <div className="common-form-block-inner">
                  <div className="last-btn">
                    <button type="submit" className="btn common-button-yellow">
                      Submit
                    </button>
                   
                  </div>
                  
                </div>
              </div>
            </form>
           { filesData[0]?.err ? <h1 style={{color:'black'}}>{filesData[0].err}</h1> :<s.TableCommon>
              <table>
                <thead>
                  <tr>
                    
                    <th>Files name</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filesData?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                       
                        <td>
                          <div className="pdf-block">
                            <img
                              src="assets/file-icon.svg"
                              alt="file-icon"
                            ></img>
                            <h4>{item?.filename}</h4>
                          </div>
                        </td>
                        <td>{item?.time}</td>
                        <td>
                          <div className="action-block">
                            <Link
                              href={item?.filepath}
                              target="_blank"
                              onClick={() => handleOnClickDownload(item)}
                            >
                              <img
                                src="assets/download-icon.svg"
                                alt="download-icon"
                              ></img>
                            </Link>

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </s.TableCommon>}

          </div>
        </div>
      </s.HomeMain>
      <Footer />



    </>
  );
};
export default DeleteProjects;
