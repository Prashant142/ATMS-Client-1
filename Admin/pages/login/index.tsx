/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import * as s from "../../styles/common.style";
import Router, { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { asyncUserLogin } from "@/services/auth/auth.service";
import { checkIsAuth } from "@/utils/globalFunctions";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "@/utils/alerts";
import { errorString } from "@/utils/constants";
import Loader from "@/src/components/Loader";

const inter = Inter({ subsets: ["latin"] });

const validationSchema = yup
  .object({
    usnme: yup.string().required("Username is required"),
    pwd: yup.string().required("Password is required"),
  })
  .required();

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onLogin = async (loginData: any) => {
    const { usnme, pwd } = loginData;
    if (usnme && pwd) {
      setIsLoading(true);
      const response = await asyncUserLogin({ usnme, pwd });
      setIsLoading(false);

      if (response && response?.data) {
        if (response?.data == "success") {
          successAlert("Login successfully");
          router.push("/dashboard");
          return;
        }
        errorAlert(response?.data || errorString.catchError);
      }
    }
  };
  useEffect(() => {
    if (checkIsAuth()) {
      Router.push("/dashboard");
      return;
    }
  }, []);
  return (
    <>
      <Head>
        <title>WiseScan | Login</title>
      </Head>
      <s.LoginMain>
        <div className="login-main">
          <div className="login-left">
            <div className="login-left-inner">
              <Link href="">
                <img src="assets/logo.svg" alt="logo"></img>
              </Link>
              <h1>Login</h1>
              <s.CommonForm onSubmit={handleSubmit(onLogin)}>
                <div className="form-group">
                  <label>
                    Username <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username here"
                    {...register("usnme", { required: true })}
                  ></input>
                  {errors?.usnme && (
                    <s.ErrorMessageBlock>
                      {errors?.usnme?.message}
                    </s.ErrorMessageBlock>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Password <span>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password here"
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
                <div className="login-from-inner">
                  <p>
                    <span>* </span>Denotes compulsory fields
                  </p>
                  <button
                    // type="submit"
                    className="btn common-button"
                    // onClick={() => router.push("/dashboard")}
                  >
                    Sign In
                  </button>
                </div>
              </s.CommonForm>
            </div>
          </div>
          <div className="login-right">
            <img src="assets/banner-img.svg" alt="banner-img"></img>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </s.LoginMain>
    </>
  );
}
