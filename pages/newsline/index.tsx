import Head from "next/head";

import * as s from "../../styles/common.style";
import Sidebar from "../../src/components/sidebar";
import moment from "moment-mini";

import { DAYS, errorString, MONTHS, YEARS } from "@/utils/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  asyncAddNews,
  asyncGetNews,
  asyncUpdateNews,
} from "@/services/news/news.service";
import { useEffect, useState } from "react";
import { checkIsAuth } from "@/utils/globalFunctions";
import Router, { useRouter } from "next/router";
import { errorAlert, successAlert } from "@/utils/alerts";
import Loader from "@/src/components/Loader";

const addNewsLineValidationSchema = yup.object({
  news: yup.string().required("News is required"),
  day: yup.number().required("Day is required"),
  month: yup.number().required("Month is required"),
  year: yup.number().required("Year is required"),
  description: yup.string().required("Description is required"),
});

const Newsline = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addNewsLineValidationSchema),
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (router?.query && router?.query?.nuid) {
      fetchNewsLine(router?.query?.nuid);
    }
  }, [router]);

  const fetchNewsLine = async (nuid: any) => {
    if (nuid) {
      setIsLoading(true);
      let response = await asyncGetNews({ nuid });
      setIsLoading(false);
      if (response && response.data && response?.data?.length > 0) {
        setEditData(response?.data?.[0]);
      } else {
        Router.push("newslinemanagement");
      }
    }
  };

  useEffect(() => {
    if (editData) {
      setValue("news", editData?.news);
      setValue("description", editData?.description);
      setValue("day", editData?.start_date?.split("-")?.[0]);
      setValue("month", editData?.start_date?.split("-")?.[1]);
      setValue("year", editData?.start_date?.split("-")?.[2]);
      setValue("nuid", editData?.nuid);
    }
  }, [editData, setValue]);

  const onSubmitNewsLine = async (data: any) => {
    const { news, day, month, year, description, nuid } = data;
    let start_date = day + "-" + month + "-" + year;
    const isDateValid = moment(start_date, "DD-M-YYYY").isValid();
    if (!isDateValid) {
      setError("invalidStartDate", {
        message: "Please enter valid start date",
      });
      return;
    }
    const response = editData
      ? await asyncUpdateNews({
          news,
          description,
          start_date,
          nuid,
        })
      : await asyncAddNews({
          news,
          description: description,
          start_date,
        });
    console.log("response :>> ", response);
    if (response) {
      if (response?.data?.[0]?.success || response?.success) {
        successAlert(
          `News line ${editData ? "updated" : "added"} successfully`
        );
        Router.back();
      } else {
        errorAlert(response || errorString.catchError);
      }
    }
  };
  return (
    <>
      <Head>
        <title>WiseScan | Add NewsLine</title>
      </Head>
      <Sidebar />
      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block flex-block-inner">
            <h3>News Line Management</h3>
            <p>
              <span>* </span>Denotes compulsory fields
            </p>
          </div>
          <div className="change-password-block">
            <s.CommonForm
              className="common-form-block"
              onSubmit={handleSubmit(onSubmitNewsLine)}
            >
              <div className="form-group">
                <label>News Line Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="News Line Information"
                  {...register("news", { required: true })}
                ></input>
                {errors?.news && (
                  <s.ErrorMessageBlock>
                    {errors?.news?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="form-group">
                <label>
                  Start Date <span>*</span>
                </label>
                <div className="form-group-day">
                  <div className="form-group-day-inner">
                    <select {...register("day", { required: true })}>
                      <option selected disabled>
                        Day
                      </option>
                      {DAYS.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group-day-inner">
                    <select {...register("month", { required: true })}>
                      <option selected disabled>
                        Month
                      </option>
                      {MONTHS.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group-day-inner">
                    <select {...register("year", { required: true })}>
                      <option selected disabled>
                        Year
                      </option>
                      {YEARS.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {(errors?.startDay ||
                    errors?.startMonth ||
                    errors?.startYear ||
                    errors?.invalidStartDate) && (
                    <s.ErrorMessageBlock>
                      Please enter valid start date
                    </s.ErrorMessageBlock>
                  )}
                </div>
              </div>
              <div className="form-group full-width">
                <label>
                  News Description <span>*</span>
                </label>
                <textarea
                  id=""
                  className="form-control"
                  placeholder="Message here"
                  {...register("description", { required: true })}
                ></textarea>
                {errors?.description && (
                  <s.ErrorMessageBlock>
                    {errors?.description?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="last-btn">
                <button type="submit" className="btn common-button-yellow">
                  {editData ? `Update` : `Add`}
                </button>
              </div>
            </s.CommonForm>
          </div>
        </div>
      </s.CommonDashboardBlock>
      <Loader isLoading={isLoading} />
    </>
  );
};
export default Newsline;
