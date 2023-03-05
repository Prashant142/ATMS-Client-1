/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as s from "../../styles/common.style";
import Footer from "../../components/layout/footer";
import { useEffect, useRef, useState } from "react";
import {
  asyncForgotPassword,
  asyncUserLogin,
} from "@/services/auth/auth.service";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Router, { useRouter } from "next/router";

import { errorAlert, successAlert } from "@/utils/alerts";
import Loader from "@/components/Loader";

const loginValidationSchema = yup.object({
  usrnme: yup.string().required("Username is required"),
});

const ForgotPassword = () => {
  // Constants & States
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const handleLoginSubmit = async (loginData: any) => {
    setIsLoading(true);
    const { usrnme } = loginData;
    if (usrnme) {
      const response = await asyncForgotPassword({ usrnme });
      setIsLoading(false);
      if (response) {
        if (response?.data) {
          Router.push("/login");
          return;
        }
        errorAlert(response?.data);
      }
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
                <h1>Atms @ Net Forgot Password</h1>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("usrnme", { required: true })}
                  ></input>
                  {errors?.usrnme && (
                    <s.ErrorMessageBlock>
                      {errors?.usrnme?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="login-from-inner">
                  <button type="submit" className="btn common-button">
                    Reset Password
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
export default ForgotPassword;
