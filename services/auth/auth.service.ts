import Api from "@/services/Api";
import { localStorageKeys, storageKeys } from "@/utils/constants";
import { createCookie, eraseCookie, readCookie } from "@/utils/cookieCreator";
import Router from "next/router";
import { encodeData, decodeData } from "../../utils/cookieCreator";
import { secureKeys } from "../../utils/constants";

const api = new Api();

export const asyncUserLogin = async (payload: any) => {
  try {
    const { usnme, pwd } = payload;
    let params = { usrnme: usnme, pwd };

    const response = await api
      .post("/signIn", params)
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          createCookie(storageKeys.userName, usnme || "", 0);
          const encodedPassword = encodeData(
            pwd,
            secureKeys.secureUserPWDToken
          );
          createCookie(storageKeys.userPWDToken, encodedPassword, 0);
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncLogout = async () => {
  const usrnme = readCookie(storageKeys.userName);
 
  const data = { usrnme: usrnme };
  try {
    const response = await api.get("/logout",{params:data}).then(async (res: any) => {
      if (res && res?.isSuccess) {
        localStorage.clear();
        console.log(response);
        eraseCookie(storageKeys?.userName);
        return res;
      }
      return res;
    });
    return response;
  } catch (e: any) {
    console.log(e.message);
    localStorage.clear();
    return e.message;
  }
};

export const getLocalUserData = () => {
  const userName = readCookie(storageKeys.userName);
  const password = readCookie(storageKeys.userPWDToken);
  const decodedPassword = decodeData(password, secureKeys.secureUserPWDToken);
  return { userName, password: decodedPassword };
};

export const asyncForgotPassword = async (payload: any) => {
  try {
    const response = await api
      .post("/forget_password", payload)
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncResetPassword = async (payload: any) => {
  try {
    const response = await api
      .post("/reset_password", payload)
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};
