/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as s from "../../styles/common.style";
import React from "react";

import Footer from "@/components/layout/footer";
import { DAYS, MONTHS, storageKeys, YEARS } from "@/utils/constants";
import Router, { useRouter } from "next/router";
import {
  asyncDownload,
  asyncGetProjectDetails,
  asyncgetdates,
  asyncdeltefiles,
  asyncGetClientDetails,
} from "@/services/Api/Projects/projects.service";
import { eraseCookie, readCookie } from "@/utils/cookieCreator";
import { Component, SyntheticEvent, useEffect, useState } from "react";
import { errorAlert, successAlert } from "@/utils/alerts";
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
import Loader from "@/components/Loader";
import { getisadminstatus } from "@/utils/globalFunctions";

const addProjectValidationSchema = yup.object({
  startDay: yup.string().required("Start date is required"),
  startMonth: yup.string().required("Start date is required"),
  startYear: yup.string().required("Start date is required"),
});

const DeleteProjects = () => {
  const { query } = useRouter();
  const [queryData, setQueryData] = useState<any>({
    code: "",
    p_name: "",
  });

  const [clientDetails, setClientDetails] = useState<any>({});
  const [filesData, setFilesData] = useState<any>([]);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [dates, setdates] = useState([]);
  const [days, setdays] = useState([]);
  const [months, setmonths] = useState([]);
  const [years, setyears] = useState([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [date, setDate] = useState("");
  const [store, setStore] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmins, setIsAdmin] = useState(null);

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
      getprojectsdates();
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

  const [values, setValues] = useState("");
  const [checked, setChecked] = useState([]);
  const handlechange = (event: SyntheticEvent, newValue: string) => {
    setValues(newValue);
  };

  // isAdmin status from cookies
  useEffect(() => {
    const isAdmin = getisadminstatus();
    setIsAdmin(isAdmin);
    console.log("If user is admin or not : ", isAdmins);
  }, []);

  // useEffect(() => {
  //   fetchClientDetails();
  // }, []);
  useEffect(() => {}, [clientDetails]);

  const fetchClientDetails = async () => {
    const username = getCookie("user-name");
    try {
      const response = await asyncGetClientDetails(username);
      let client = response;
      return client;
      if (Object.keys(response).length) {
        setClientDetails(client);
        return true;
      }
    } catch (error) {
      console.log("Error Getting CLient Details ", error);
      return false;
    }
  };
  // function fetchClientDetails() {

  // asyncGetClientDetails(username)
  //   .then((response) => {
  //     console.log("This is the Response:", typeof response);
  //     const client = response;
  //     setClientDetails(client);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  // }

  function getCookie(name: string): string {
    const cookieValue = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("="))
      .reduce((acc, [key, value]) => (key === name ? value : acc), "");

    return cookieValue;
  }
  const fetchProjectDetails = async (date: any, flag: any) => {
    const params = {
      p_code: router?.query?.code,
      p_name: router?.query?.p_name,
      date: date,
    };

    try {
      const response: any = await asyncGetProjectDetails(params);
      if (response && response.data) {
        if (typeof response.data !== "string") {
          const filteredFiles = filterFilesForAllowedUser(response.data, flag);
          setFilesData(filteredFiles);
          setIsLoading(false);
        } else {
          errorAlert(response.data);
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle the error
    }
  };

  function filterFilesForAllowedUser(files: any, userData: any) {
    const allowedFileTypes = Object.keys(userData)
      .filter((key) => key.endsWith("_flag") && userData[key] === "True")
      .map((key) => key.replace("_flag", ""));

    return files.filter((file: any) => {
      const fileType = file.filename.split(".").pop();
      return allowedFileTypes.includes(fileType);
    });
  }

  const handleOnClickDownload = async (data: any) => {
    console.log(data?.filename);
    if (data?.filepath) {
      const response = await asyncDownload(data?.filename);
      if (response && response?.data) {
        if (typeof response?.data !== "string") {
          console.log(response.data);
        }
      } else {
        errorAlert(response?.data);
      }
    }
  };

  const getprojectsdates = async () => {
    const response = await asyncgetdates(router?.query?.code);
    console.log("This is project dates", response);
    if (response || response?.data) {
      if (typeof response?.data !== "string") {
        console.log("This is the ressss", response);
        setdays(response["days"]);
        setyears(response["years"]);
        setmonths(response["months"]);
        let flag = await fetchClientDetails();

        flag && fetchProjectDetails(response["latestdate"], flag);
        // console.log("Latest date", response["latestdate"]);
        setDate(response["latestdate"]);
      } else {
        errorAlert(response?.data);
      }
    }
  };

  const onSubmitProduct = async (data: any) => {
    const { startDay, startMonth, startYear } = data;
    let start_date = startDay + "-" + startMonth + "-" + startYear;
    console.log("abs");
    setDate(start_date);
    // const isStartDateValid = moment(start_date, "DD-M-YYYY").isValid();
    // if (!isStartDateValid) {
    //   setError("invalidStartDate", {
    //     message: "Please enter valid start date",
    //   });
    //   return;
    // }
    // const date = moment(start_date, "D-M-YYYY").format("D-MMM-YYYY");
    let flag = await fetchClientDetails();
    flag && fetchProjectDetails(start_date, flag);
    // console.log("data :>> ", data, start_date);
  };

  const handleChecked = (item: any) => {
    const data = {
      fid: item,
      code: router.query.code,
      date: date,
    };

    console.log("hit", item);
    const prev = store;
    const found = prev.find((obj: { fid: any }) => {
      return obj.fid === item;
    });

    console.log(found);

    if (found === undefined) {
      prev.push(data);
    } else {
      const index = prev.indexOf(found);
      prev.splice(index, 1);
    }
    console.log(prev);
    setStore(prev);
    // setChecked((prevCheckedItems) => {
    //   const itemIndex = prevCheckedItems.indexOf(index);

    //   if (itemIndex !== -1) {
    //     // Remove the index from the array if it exists
    //     return prevCheckedItems.filter((item) => item !== index);
    //   } else {
    //     // Add the index to the array if it doesn't exist
    //     return [...prevCheckedItems, index];
    //   }
    // });

    console.log(checked);
  };

  const handleDelete = async (item: any) => {
    // const getCheckedFilesData = (checked, filesData) => {
    //   const output = [];

    //   checked.forEach((index) => {
    //     if (index >= 0 && index < filesData.length) {
    //       output.push(filesData[index]);
    //     }
    //   });

    //   return output;
    // };
    if (store.length === 0) {
      const payload = {
        fid: item,
        code: router.query.code,
        date: date,
      };

      //  Use file name to get id from mongo db
      console.log(payload);

      //  const storearray = [];
      //  storearray.push(payload);

      store.push(payload);
    }

    const response = await asyncdeltefiles(store);
    if (response && response?.data) {
      if (typeof response?.data !== "string") {
        console.log(response.data);
      } else {
        successAlert(response?.data);
        setStore([]);
        window.location.reload();
      }
    }
  };
  // console.log("This is the fileData", filesData);
  // const uniqueMonths = Array.from(new Set(months));
  // const uniqueYears = Array.from(new Set(years));
  // const uniquedays = Array.from(new Set(days));
  function convertTimeFormat(time: any) {
    // console.log("This is time", time);

    const [hour, minute] = time.split("-");
    return `${hour}:${minute}`;
  }
  // console.log("This is days", days);
  // Range date data
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [fileData, setFileData] = useState<fileData[]>([]);
  const [filterData, setFilterData] = useState<any>(filesData);

  console.log("This is the filtered Data : ", filterData);
  function formatDate(date: string): string {
    const [day, month, year] = date.split("-"); // split by hyphen
    const monthIndex = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(month);
    const monthFormatted =
      monthIndex >= 9 ? `${monthIndex + 1}` : `0${monthIndex + 1}`; // add leading zero if month is less than 10
    const dayFormatted = parseInt(day) >= 10 ? day : `0${day}`; // add leading zero if day is less than 10
    return `${year}-${monthFormatted}-${dayFormatted}`;
  }

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
    // console.log("This is a start Date", startDate);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredData = filesData.filter((data: any) => {
      const dateFormatted = formatDate(data.date);
      return dateFormatted >= startDate && dateFormatted <= endDate;
    });
    setFilterData(filteredData);
    // console.log("This is the filtered", filteredData); // you can display this data in a table below
  };
  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setFilterData([]);
  };

  const [newFilteredData, setNewFilteredData] = useState([]);
  useEffect(() => {
    // Filter the data to get only the data of the present date
    const currentDate = new Date();
    const someFilteredData = filesData.filter(
      (item: { date: { toDateString: () => string } }) => {
        // Assuming 'date' property is a Date object
        return item.date.toDateString() === currentDate.toDateString();
      }
    );

    setNewFilteredData(someFilteredData);
    console.log("This is new filter data : ", someFilteredData);
  }, []);

  return (
    <>
      <s.HomeMain>
        {<Header></Header>}
        <Loader isLoading={isLoading} />
        <div>
          {newFilteredData.length > 0 && days !== undefined ? (
            <div className="welcome-block">
              <div className="container">
                <div className="projects-img-main">
                  <h5>{queryData?.p_name}</h5>
                </div>
                <form onSubmit={HandleSubmit}>
                  <div className="select-custom-block">
                    <p style={{ color: "black", padding: "20px" }}>From:</p>
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      style={{
                        padding: "15px",
                        borderRadius: "5px",
                        border: "1px solid black",
                        backgroundColor: "#e8e6e6",
                        color: "#c46608",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    />
                    <p style={{ color: "black", padding: "20px" }}>To:</p>
                    <input
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      style={{
                        padding: "15px",
                        borderRadius: "5px",
                        border: "1px solid black",
                        backgroundColor: "#e8e6e6",
                        cursor: "pointer",
                        color: "#c46608",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    />

                    {/* <select
                        defaultValue={days[days.length - 1]}
                        {...register("startDay", { required: false })}>
                        {uniquedays.map((value) => {
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        defaultValue={uniqueMonths[uniqueMonths.length - 1]}
                        {...register("startMonth", { required: false })}>
                        {uniqueMonths.map((value) => {
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        defaultValue={uniqueYears[uniqueYears.length - 1]}
                        {...register("startYear", { required: false })}>
                        {uniqueYears.map((value: number, index) => {
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        })}
                      </select> */}
                    {/* {(errors?.startDay ||
                        errors?.startMonth ||
                        errors?.startYear) && (
                        <s.ErrorMessageBlock>
                          Please enter valid start date
                        </s.ErrorMessageBlock>
                      )} */}
                    <div className="common-form-block-inner">
                      <div className="last-btn">
                        <button
                          type="submit"
                          className="btn common-button-yellow"
                          value="Submit">
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={handleClear}
                          style={{
                            backgroundColor: "Gray",
                            border: "None",
                            padding: "15px",
                            borderRadius: "5px",
                            marginLeft: "15px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}>
                          Clear Data
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {filesData[0]?.err ? (
                  <h1 style={{ color: "darkgray" }}>{filesData[0].err}</h1>
                ) : (
                  <s.TableCommon>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Files name</th>
                          <th>Time</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterData.length > 0 ? (
                          filterData?.map((item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {" "}
                                  <input
                                    style={{
                                      accentColor: "red",
                                      width: "15px",
                                      height: "15px",
                                    }}
                                    type="checkbox"
                                    onChange={() => handleChecked(item.fid)}
                                  />{" "}
                                </td>
                                <td>
                                  <div className="pdf-block">
                                    <img
                                      src="assets/file-icon.svg"
                                      alt="file-icon"></img>
                                    <h4>{item.filename}</h4>
                                  </div>
                                </td>
                                {/* <td>{item?.time}</td> */}
                                <td>{convertTimeFormat(item.time)}</td>
                                <td>{item.date}</td>
                                <td
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}>
                                  <div className="action-block">
                                    <Link
                                      href={item.filepath}
                                      target="_blank"
                                      onClick={() =>
                                        handleOnClickDownload(item)
                                      }>
                                      <img
                                        src="assets/download-icon.svg"
                                        alt="download-icon"></img>
                                    </Link>
                                  </div>

                                  {isAdmins === "True" ? (
                                    <div className="projects-link">
                                      {/* [{"code":"Demo_4", "date":"26-Mar-2023","fid":"16798368567399263"}] */}
                                      <button
                                        onClick={() => handleDelete(item.fid)}
                                        style={{
                                          backgroundColor: "white",
                                          border: "none",
                                          padding: "2px",
                                        }}>
                                        <img
                                          src="assets/trash-outline.svg"
                                          alt="trash-outline"></img>
                                      </button>
                                    </div>
                                  ) : null}
                                </td>
                              </tr>
                            );
                          })
                        ) : startDate && endDate ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "40vh",
                              width: "50vh",
                              // backgroundColor: "black",
                              marginLeft: "50vh",
                            }}>
                            <h2
                              style={{
                                color: "darkgray",
                                fontSize: "3rem",
                                textAlign: "center", // Added textAlign property
                              }}>
                              No data found
                            </h2>
                            <h2
                              style={{
                                color: "darkgray",
                                fontSize: "3rem",
                                textAlign: "center", // Added textAlign property
                              }}>
                              between the range!
                            </h2>
                          </div>
                        ) : (
                          newFilteredData?.map((item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {" "}
                                  <input
                                    style={{
                                      accentColor: "red",
                                      width: "15px",
                                      height: "15px",
                                    }}
                                    type="checkbox"
                                    onChange={() => handleChecked(item.fid)}
                                  />{" "}
                                </td>
                                <td>
                                  <div className="pdf-block">
                                    <img
                                      src="assets/file-icon.svg"
                                      alt="file-icon"></img>
                                    <h4>{item.filename}</h4>
                                  </div>
                                </td>
                                {/* <td>{item?.time}</td> */}
                                <td>{convertTimeFormat(item.time)}</td>
                                <td>{item.date}</td>
                                <td
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}>
                                  <div className="action-block">
                                    <Link
                                      href={item.filepath}
                                      target="_blank"
                                      onClick={() =>
                                        handleOnClickDownload(item)
                                      }>
                                      <img
                                        src="assets/download-icon.svg"
                                        alt="download-icon"></img>
                                    </Link>
                                  </div>

                                  {isAdmins === "True" ? (
                                    <div className="projects-link">
                                      {/* [{"code":"Demo_4", "date":"26-Mar-2023","fid":"16798368567399263"}] */}
                                      <button
                                        onClick={() => handleDelete(item.fid)}
                                        style={{
                                          backgroundColor: "white",
                                          border: "none",
                                          padding: "2px",
                                        }}>
                                        <img
                                          src="assets/trash-outline.svg"
                                          alt="trash-outline"></img>
                                      </button>
                                    </div>
                                  ) : null}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </s.TableCommon>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "67vh",
              }}>
              <h2
                style={{
                  color: "darkgray",
                  fontSize: "3rem",
                }}>
                No Data Found!
              </h2>
            </div>
          )}
        </div>
      </s.HomeMain>
      <Footer />
    </>
  );
};
export default DeleteProjects;
