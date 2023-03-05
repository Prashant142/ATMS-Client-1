import Head from "next/head";

import * as s from "../../styles/common.style";
import Sidebar from "../../src/components/sidebar";
import Router, { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  asyncAddClient,
  asyncGetClient,
  asyncUpdateClient,
} from "@/services/client/client.service";
import { useEffect, useState } from "react";
import { checkIsAuth } from "@/utils/globalFunctions";
import Loader from "@/src/components/Loader";
import { errorAlert, successAlert } from "@/utils/alerts";
import { errorString } from "@/utils/constants";

const addClientValidationSchema = yup.object({
  org_name: yup.string().required("Organization name is required"),
  sal: yup.string().required("Salutation is required"),
  c_name: yup.string().required("Name is required"),
  email: yup.string().required("Name is required"),
  usrnme: yup.string().required("Username is required"),
  phone: yup.string().required("Contact No is required"),
  pwd: yup.string().required("Password is required"),
  status: yup.string().required("Status is required"),
});

const AddClient = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addClientValidationSchema),
  });
  const [editData, setEditData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const all = watch("all");
  const xls_flag = watch("xls_flag");
  const pdf_flag = watch("pdf_flag");
  const gdb_flag = watch("gdb_flag");

  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (all) {
      setValue("gdb_flag", true);
      setValue("xls_flag", true);
      setValue("pdf_flag", true);
    } else if (gdb_flag || xls_flag || pdf_flag) {
      if (!all && gdb_flag && xls_flag && pdf_flag) {
        setValue("gdb_flag", false);
        setValue("xls_flag", false);
        setValue("pdf_flag", false);
      }
    } else {
      setValue("gdb_flag", false);
      setValue("xls_flag", false);
      setValue("pdf_flag", false);
    }
  }, [all, setValue]);

  useEffect(() => {
    if (gdb_flag && pdf_flag && xls_flag) {
      setValue("all", true);
    } else {
      setValue("all", false);
    }
  }, [xls_flag, pdf_flag, gdb_flag, setValue]);

  useEffect(() => {
    if (router?.query && router?.query?.username) {
      fetchClient(router?.query?.username);
    }
  }, [router]);

  const fetchClient = async (username: any) => {
    if (username && !editData) {
      setIsLoading(true);
      let response = await asyncGetClient({ usrnme: username });
      setIsLoading(false);
      if (response && typeof response !== "string") {
        setEditData(response);
      } else {
        errorAlert(response);
        Router.push("/clients");
      }
    }
  };

  useEffect(() => {
    if (editData) {
      setValue("org_name", editData?.org_name);
      setValue("sal", editData?.sal);
      setValue("c_name", editData?.c_name);
      setValue("email", editData?.email);
      setValue("usrnme", editData?.usrnme);
      setValue("pwd", editData?.pwd);
      setValue("phone", editData?.phone);
      setValue("status", editData?.status);
      setValue("pdf_flag", editData?.pdf_flag == "True" ? true : false);
      setValue("xls_flag", editData?.xlx_flag == "True" ? true : false);
      setValue("gdb_flag", editData?.gdb_flag == "True" ? true : false);
      setValue("all", editData?.all_flag == "True" ? true : false);
      setValue("is_admin", editData?.is_admin == "True" ? true : false);
    }
  }, [editData, setValue]);

  const onSubmitProjectHighlight = async (data: any) => {
    const { gdb_flag, xls_flag, pdf_flag, all, is_admin, ...rest } = data;
    setIsLoading(true);
    const response = editData
      ? await asyncUpdateClient({
          ...rest,
          original_username: router?.query?.username,
          gdb_flag: gdb_flag == true ? "True" : "False",
          xlx_flag: xls_flag == true ? "True" : "False",
          pdf_flag: pdf_flag == true ? "True" : "False",
          all_flag: all == true ? "True" : "False",
          is_admin: is_admin == true ? "True" : "False",
        })
      : await asyncAddClient({
          ...rest,
          gdb_flag: gdb_flag == true ? "True" : "False",
          xlx_flag: xls_flag == true ? "True" : "False",
          pdf_flag: pdf_flag == true ? "True" : "False",
          all_flag: all == true ? "True" : "False",
          is_admin: is_admin == true ? "True" : "False",
        });
    setIsLoading(false);
    if (response) {
      if (response?.success) {
        successAlert(`Client ${editData ? "updated" : "added"} successfully`);
        Router.back();
      } else {
        errorAlert(response || errorString.catchError);
      }
    }
  };

  return (
    <>
      <Head>
        {router.query.username ? (
          <title>WiseScan | Edit Client</title>
        ) : (
          <title>WiseScan | Add New Client</title>
        )}
      </Head>
      <Sidebar />

      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block flex-block-inner">
            <h3>{router.query.username ? "Edit Client" : "Add Client"}</h3>
            <p>
              <span>* </span>Denotes compulsory fields
            </p>
          </div>
          <div className="change-password-block">
            <s.CommonForm
              className="common-form-block"
              onSubmit={handleSubmit(onSubmitProjectHighlight)}
            >
              <div className="form-group">
                <label>
                  Organization <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Organization"
                  {...register("org_name", { required: true })}
                ></input>
                {errors?.org_name && (
                  <s.ErrorMessageBlock>
                    {errors?.org_name?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="form-group">
                <label>
                  Salutation | Name <span> *</span>
                </label>
                <div className="form-group-day">
                  <div className="form-group-day-inner">
                    <select {...register("sal", { required: true })}>
                      <option selected disabled>
                        Select
                      </option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    {...register("c_name", { required: true })}
                  ></input>
                </div>
                {errors?.c_name && (
                  <s.ErrorMessageBlock>
                    {errors?.c_name?.message}
                  </s.ErrorMessageBlock>
                )}
                {errors?.sal && (
                  <s.ErrorMessageBlock>
                    {errors?.sal?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="form-group">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  id=""
                  className="form-control"
                  placeholder="Enter Email"
                  {...register("email", { required: true })}
                ></input>
                {errors?.email && (
                  <s.ErrorMessageBlock>
                    {errors?.email?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="form-group">
                <label>
                  Contact No <span>*</span>
                </label>
                <input
                  id=""
                  className="form-control"
                  placeholder="Enter contact no"
                  {...register("phone", { required: true })}
                ></input>
                {errors?.phone && (
                  <s.ErrorMessageBlock>
                    {errors?.phone?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="form-group">
                <label>
                  Username <span>*</span>
                </label>
                <input
                  id=""
                  className="form-control"
                  placeholder="Enter username"
                  {...register("usrnme", { required: true })}
                ></input>
                {errors?.usrnme && (
                  <s.ErrorMessageBlock>
                    {errors?.usrnme?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="form-group">
                <label>
                  Password <span>*</span>
                </label>
                <input
                  id=""
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("pwd", { required: true })}
                ></input>
                {errors?.pwd && (
                  <s.ErrorMessageBlock>
                    {errors?.pwd?.message}
                  </s.ErrorMessageBlock>
                )}
              </div>
              <div className="form-group">
                <label className="pb-14">
                  File Type <span>*</span>
                </label>
                <div className="checkbox-control-main">
                  <div className="custom-checkbox">
                    <input
                      id="pdf_flag"
                      type="checkbox"
                      {...register("pdf_flag")}
                      // onChange={handleAllCheckBoxChanges}
                    />
                    <label htmlFor="pdf_flag">PDF</label>
                  </div>
                  <div className="custom-checkbox">
                    <input
                      id="xls_flag"
                      type="checkbox"
                      {...register("xls_flag")}
                    />
                    <label htmlFor="xls_flag">Excel(XLS)</label>
                  </div>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      {...register("gdb_flag")}
                      id="gdb_flag"
                    />
                    <label htmlFor="gdb_flag">Excel(GDB)</label>
                  </div>
                  <div className="custom-checkbox">
                    <input type="checkbox" {...register("all")} id="all" />
                    <label htmlFor="all">All</label>
                  </div>
                </div>
              </div>
              <div className="form-group permission-form-group">
                <div className="checkbox-control-main">
                  <label className="pb-14">Permission</label>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      {...register("is_admin")}
                      id="is_admin"
                    />
                    <label htmlFor="is_admin">Administrator</label>
                  </div>
                </div>
                <div className="check-block-permission">
                  <label>
                    Status <span> *</span>
                  </label>
                  <div className="form-group-day">
                    <div className="form-group-day-inner">
                      <select {...register("status", { required: true })}>
                        <option selected disabled>
                          Select
                        </option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inActive">In Active</option>
                      </select>
                    </div>
                  </div>
                  {errors?.status && (
                    <s.ErrorMessageBlock>
                      {errors?.status?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
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
export default AddClient;

AddClient.getInitialProps = async ({ query }: any) => {
  const { username } = query;

  return { username };
};
