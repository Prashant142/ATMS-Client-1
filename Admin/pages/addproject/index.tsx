import Head from "next/head";

import * as s from "../../styles/common.style";
import Sidebar from "../../src/components/sidebar";
import Select from "react-select";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import moment from "moment-mini";
import {
  asyncAddProject,
  asyncGetProject,
  asyncUpdateProject,
} from "@/services/project/project.service";
import { DAYS, errorString, MONTHS, YEARS } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import { asyncGetAllClients } from "@/services/client/client.service";
import Router from "next/router";
import { checkIsAuth } from "@/utils/globalFunctions";
import { useRouter } from "next/router";
import { errorAlert, successAlert } from "@/utils/alerts";
import Loader from "@/src/components/Loader";

const addProjectValidationSchema = yup.object({
  code: yup.string(),
  startDay: yup.number().required("Start date is required"),
  startMonth: yup.number().required("Start date is required"),
  startYear: yup.number().required("Start date is required"),
  endDay: yup.number().required("End date is required"),
  endMonth: yup.number().required("End date is required"),
  endYear: yup.number().required("End date is required"),
  p_name: yup.string().required("Project name is required"),
  dev: yup.string().required("Developer is required"),
  constr: yup.string().required("Consultant is required"),
  cont: yup.string().required("Main Contractor  is required"),
  period: yup.string().required("Contractual Period is required"),
  geo: yup.string().required("Geo-technical is required"),
});

const AddProject = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProjectValidationSchema),
  });
  const dataFetchedRef = useRef(false);
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [options, setOptions] = useState<any>([]);
  const [editData, setEditData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  useEffect(() => {
    if (editData && editData?.length > 0) {
      const data = editData[0];
      setValue("code", data?.code);
      setValue("cont", data?.cont);
      setValue("constr", data?.constr);
      setValue("dev", data?.dev);
      setValue("geo", data?.geo);
      setValue("p_name", data?.p_name);
      setValue("period", data?.period);
      setValue("startDay", data?.start_date?.split("-")?.[0]);
      setValue("startMonth", data?.start_date?.split("-")?.[1]);
      setValue("startYear", data?.start_date?.split("-")?.[2]);
      setValue("endDay", data?.end_date?.split("-")?.[0]);
      setValue("endMonth", data?.end_date?.split("-")?.[1]);
      setValue("endYear", data?.end_date?.split("-")?.[2]);
      fetchClients();
    }
  }, [editData, setValue]);

  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchClients();
  }, []);

  useEffect(() => {
    if (router?.query && router?.query?.code) {
      fetchClient(router?.query?.code);
    }
  }, [router]);

  const fetchClient = async (code: any) => {
    if (code) {
      setIsLoading(true);
      let response = await asyncGetProject({ code });
      setIsLoading(false);
      if (response && response?.length > 0) {
        setEditData(response);
      } else {
        errorAlert("Project not found");
        Router.push("/projects");
      }
    }
  };

  const fetchClients = async () => {
    const response = await asyncGetAllClients();
    if (response && response.data) {
      const newOptions = response.data.map((item: any) => {
        return { value: item.usrnme, label: item.usrnme };
      });
      if (editData && editData?.length > 0) {
        const data = editData[0];
        const filterData: any = [];
        let abc: any = [];
        if (typeof data?.a_cname == "string") {
          abc = data?.a_cname?.split(",");
        } else {
          abc = data?.a_cname;
        }
        newOptions.forEach((item: any) => {
          if (abc?.some((name: any) => item.value === name)) {
            filterData.push(item);
          }
          return;
        });
        if (filterData && filterData?.length > 0) {
          setSelectedOption(filterData);
        }
      }
      setOptions(newOptions);
    }
  };

  const onSubmitProduct = async (data: any) => {
    const {
      code,
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear,
      p_name,
      dev,
      cont,
      period,
      geo,
      constr,
    } = data;
    if (!selectedOption) {
      setError("clients", {
        message: "Please select at least one client",
      });
      return;
    }
    const a_cname = selectedOption?.map((item: any) => {
      return item.value;
    });
    let start_date = startDay + "-" + startMonth + "-" + startYear;
    let end_date = endDay + "-" + endMonth + "-" + endYear;
    const isStartDateValid = moment(start_date, "DD-M-YYYY").isValid();
    const isEndDateValid = moment(end_date, "DD-M-YYYY").isValid();
    if (!isStartDateValid) {
      setError("invalidStartDate", {
        message: "Please enter valid start date",
      });
      return;
    }
    if (!isEndDateValid) {
      setError("invalidEndDate", {
        message: "Please enter valid end date",
      });
      return;
    }

    const params = {
      code,
      p_name,
      start_date,
      end_date,
      dev,
      cont,
      period,
      geo,
      abc: "test",
      c_name: "0001",
      a_cname: a_cname,
      constr,
    };

    const response = editData
      ? await asyncUpdateProject(params)
      : await asyncAddProject(params);
    if (response) {
      if (response?.success) {
        successAlert(`Project ${editData ? "updated" : "added"} successfully`);
        Router.back();
      } else {
        errorAlert(response || errorString.catchError);
      }
    }
  };
  return (
    <>
      <Head>
        {router.query?.code ? (
          <title>WiseScan | Edit Project</title>
        ) : (
          <title>WiseScan | Add Project</title>
        )}
      </Head>
      <Sidebar />
      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block flex-block-inner">
            <h3>{editData ? `Update Project` : ` Add Project`}</h3>
            <p>
              <span>* </span> Denotes compulsory fields
            </p>
          </div>
          <div className="change-password-block">
            <s.CommonForm
              onSubmit={handleSubmit(onSubmitProduct)}
              className="common-form-block-main"
            >
              <div className="common-form-block-inner">
                <div className="form-group">
                  <label>Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code"
                    {...register("code")}
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    {...register("p_name", { required: true })}
                  ></input>
                  {errors?.p_name && (
                    <s.ErrorMessageBlock>
                      {errors?.p_name?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Owner/Developer <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Owner/Developer"
                    {...register("dev", { required: true })}
                  ></input>
                  {errors?.dev && (
                    <s.ErrorMessageBlock>
                      {errors?.dev?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Consultant <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Consultant"
                    {...register("constr", { required: true })}
                  ></input>
                  {errors?.constr && (
                    <s.ErrorMessageBlock>
                      {errors?.constr?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
              </div>
              <div className="common-form-block-inner">
                <div className="form-group">
                  <label className="d-flex justify-content">
                    Client(s) <span> (Ctrl-click to select multiple)</span>
                  </label>
                  <Select
                    className="basic-multi-select"
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    isMulti
                  />
                  {errors?.clients && (
                    <s.ErrorMessageBlock>
                      {errors?.clients?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
              </div>
              <div className="common-form-block-inner">
                <div className="form-group">
                  <label>
                    Main Contractor <span> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code"
                    {...register("cont", { required: true })}
                  ></input>
                  {errors?.cont && (
                    <s.ErrorMessageBlock>
                      {errors?.cont?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
              </div>
              <div className="common-form-block-inner">
                <div className="form-group">
                  <label>
                    Geotechnical <span> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Geotechnical"
                    {...register("geo", { required: true })}
                  ></input>
                  {errors?.geo && (
                    <s.ErrorMessageBlock>
                      {errors?.geo?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
              </div>
              <div className="common-form-block-inner">
                <div className="form-group">
                  <label>
                    Contractual Period <span> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contractual Period "
                    {...register("period", { required: true })}
                  ></input>
                  {errors?.period && (
                    <s.ErrorMessageBlock>
                      {errors?.period?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
              </div>
              <div className="common-form-block-inner">
                <div className="form-group">
                  <label>
                    Start Date <span> *</span>
                  </label>
                  <div className="form-group-day">
                    <div className="form-group-day-inner">
                      <select {...register("startDay", { required: true })}>
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
                    </div>
                    <div className="form-group-day-inner">
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
                    </div>
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
              <div className="common-form-block-inner">
                <div className="form-group">
                  <label>
                    End Date <span> *</span>
                  </label>
                  <div className="form-group-day">
                    <div className="form-group-day-inner">
                      <select {...register("endDay", { required: true })}>
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
                      <select {...register("endMonth", { required: true })}>
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
                      <select {...register("endYear", { required: true })}>
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
                  </div>
                  {(errors?.endDay ||
                    errors?.endMonth ||
                    errors?.endYear ||
                    errors?.invalidEndDate) && (
                    <s.ErrorMessageBlock>
                      Please enter valid end date
                    </s.ErrorMessageBlock>
                  )}
                </div>
              </div>
              <div className="common-form-block-inner">
                <div className="last-btn">
                  <button type="submit" className="btn common-button-yellow">
                    {editData ? `Update Project` : ` Add New Project`}
                  </button>
                </div>
              </div>
            </s.CommonForm>
          </div>
        </div>
      </s.CommonDashboardBlock>
      <Loader isLoading={isLoading} />
    </>
  );
};
export default AddProject;
