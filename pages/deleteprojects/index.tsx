/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as s from "../../styles/common.style";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Head from "next/head";
import { DAYS, MONTHS, storageKeys, YEARS } from "@/utils/constants";
import Router, { useRouter } from "next/router";
import {
  asyncDownload,
  asyncGetProjectDetails,
} from "@/services/Api/Projects/projects.service";
import { readCookie } from "@/utils/cookieCreator";
import { useEffect, useState } from "react";
import { errorAlert } from "@/utils/alerts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment-mini";
import appConfig from "@/config";
import { checkIsAuth } from "@/utils/globalFunctions";

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
  }, []);
  useEffect(() => {
    if (router?.query && router?.query?.code && router?.query?.p_name) {
      setQueryData({
        code: router?.query?.code,
        p_name: router?.query?.p_name,
      });
    }
  }, [router]);

  const fetchProjectDetails = async (date: any) => {
    const params = {
      p_code: "Code5" || queryData?.code,
      p_name: "ATMS" || queryData?.p_name,
      date: "10-feb-2023",
    };
    const response = await asyncGetProjectDetails(params);
    if (response && response?.data) {
      if (typeof response?.data !== "string") {
        setFilesData(response?.data);
      } else {
        errorAlert(response?.data);
      }
    }
  };

  const handleOnClickDownload = async (data: any) => {
    if (data?.filepath) {
      //Do download file stuff
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
    const date = moment(start_date, "DD-M-YYYY").format("DD-MMM-YYYY");
    fetchProjectDetails(date);
    console.log("data :>> ", data, date);
  };

  return (
    <>
      <Head>
        <title>WiseScan | Delete Projects</title>
      </Head>
      <s.HomeMain>
        <Header />
        <div className="top-home-block">
          <div className="container">
            <div className="title-block">
              <h1>
                User <span>Login</span>
              </h1>
            </div>
            <div className="title-block-bottom">
              <div className="project-block-under">
                <p>Projects</p>
              </div>
              <div className="profile-block">
                <img src="assets/profile-img.png" alt="profile-img"></img>
                <div className="profile-content">
                  <h5>User Name Here</h5>
                  <Link href="/">Sign Out</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="welcome-block">
          <div className="container">
            <div className="projects-img-main">
              <img src="assets/profile-img.png" alt="profile-img"></img>
              <h5>{query?.name}</h5>
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
            <s.TableCommon>
              <table>
                <thead>
                  <tr>
                    <th>
                      <div className="form-group">
                        <input type="checkbox" checked></input>
                        <label></label>
                      </div>
                    </th>
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
                          <div className="form-group">
                            <input type="checkbox"></input>
                            <label></label>
                          </div>
                        </td>
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
                              href=""
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
            </s.TableCommon>
          </div>
        </div>
        <Footer />
      </s.HomeMain>
    </>
  );
};
export default DeleteProjects;
