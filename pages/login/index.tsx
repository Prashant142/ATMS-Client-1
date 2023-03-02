/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as s from "../../styles/common.style";
import Footer from "../../components/layout/footer";
import { useEffect, useRef, useState } from "react";
import { asyncUserLogin } from "@/services/auth/auth.service";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Router, { useRouter } from "next/router";
import { checkIsAuth } from "@/utils/globalFunctions";
import { errorAlert, successAlert } from "@/utils/alerts";
import Loader from "@/components/Loader";

const loginValidationSchema = yup.object({
  usnme: yup.string().required("Username is required"),
  pwd: yup.string().required("Password is required"),
});

const LoginScreen = () => {
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

  useEffect(() => {
    if (checkIsAuth()) {
      Router.push("/");
      return;
    }
  }, []);

  const handleLoginSubmit = async (loginData: any) => {
    setIsLoading(true);
    const { usnme, pwd } = loginData;
    if (usnme && pwd) {
      const response = await asyncUserLogin({ usnme, pwd });
      setIsLoading(false);
      if (response) {
        if (response?.data?.includes("has logged in Successfully")) {
          successAlert("Login successfully");
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
                <h1>Atms @ Net Log In</h1>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("usnme", { required: true })}
                  ></input>
                  {errors?.usnme && (
                    <s.ErrorMessageBlock>
                      {errors?.usnme?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("pwd", {
                      required: true,
                    })}
                  ></input>
                  {errors?.pwd && (
                    <s.ErrorMessageBlock>
                      {errors?.pwd?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="forgot-password-block">
                  <Link href="/forgotPassword">Forgot Password?</Link>
                </div>
                <div className="login-from-inner">
                  <button type="submit" className="btn common-button">
                    Log in
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
export default LoginScreen;
