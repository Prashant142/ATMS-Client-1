/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as s from "../../styles/common.style";
import Footer from "../../components/layout/footer";
import { useEffect, useRef, useState } from "react";
import {
  asyncResetPassword,
  asyncUserLogin,
} from "@/services/auth/auth.service";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Router, { useRouter } from "next/router";
import { checkIsAuth } from "@/utils/globalFunctions";
import { errorAlert, successAlert } from "@/utils/alerts";
import Loader from "@/components/Loader";

const resetPasswordValidationSchema = yup
  .object({
    new_password: yup
      .string()
      .trim("Enter valid new password")
      .required("New password is required"),
    re_password: yup
      .string()
      .trim("Enter valid confirm password")
      .required("Confirm password is required")
      .oneOf(
        [yup.ref("new_password")],
        "Confirm password must be same as new password"
      ),
  })
  .required()
  .strict();

const ResetPassword = () => {
  // Constants & States
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  useEffect(() => {
    if (router && router?.query && router?.query?.usrnme) {
      setValue("usrname", router?.query?.usrnme);
    }
  }, [router, setValue]);

  const handleLoginSubmit = async (loginData: any) => {
    setIsLoading(true);
    const { usrname, new_password, re_password } = loginData;
    if (usrname && new_password && re_password) {
      const response = await asyncResetPassword({
        usrname,
        new_password,
        re_password,
      });
      setIsLoading(false);
      console.log("response :>> ", response);
      if (response) {
        if (response?.data) {
          router.push("/");
          return;
        }
        errorAlert(response?.data);
      }
      // console.log("response :>> ", response);
    }
    setIsLoading(false);
  };

  return (
    <>
      <s.LoginMain>
        <div className="login-main">
          <div className="back-login">
            <Link href="/">
              <img src="assets/arrow-back.svg" alt="arrow-back"></img>
              <span>Back To Home</span>
            </Link>
          </div>
          <div className="login-left">
            <div className="login-left-inner">
              <Link href="/">
                <img src="assets/logo.svg" alt="logo"></img>
              </Link>

              <s.CommonForm onSubmit={handleSubmit(handleLoginSubmit)}>
                <h1>Atms @ Net Reset Password</h1>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    {...register("usrname", { required: true })}
                  ></input>
                  {errors?.usrname && (
                    <s.ErrorMessageBlock>
                      {errors?.usrname?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    New Password <span>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("new_password", { required: true })}
                  ></input>
                  {errors?.new_password && (
                    <s.ErrorMessageBlock>
                      {errors?.new_password?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Re-Enter New Password <span>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("re_password", { required: true })}
                  ></input>
                  {errors?.re_password && (
                    <s.ErrorMessageBlock>
                      {errors?.re_password?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="login-from-inner">
                  <button type="submit" className="btn common-button">
                    Submit
                  </button>
                </div>
              </s.CommonForm>
            </div>
          </div>
        </div>
      </s.LoginMain>
      <Loader isLoading={isLoading} />
      <Footer />
    </>
  );
};
export default ResetPassword;
