import Api from "@/services/Api";
import { errorAlert } from "@/utils/alerts";
import { localStorageKeys } from "@/utils/constants";
import { createCookie, eraseCookie } from "@/utils/cookieCreator";
import Router from "next/router";

const api = new Api();

export const asyncUserLogin = async (payload: any) => {
  try {
    const { usnme, pwd } = payload;
    let params = { usrnme: usnme, pwd };
    const response = await api
      .post("/signIn", params)
      .then(async (res: any) => {
        createCookie(localStorageKeys.authKey, usnme, 0);
        if (res && res?.isSuccess) {
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncLogout = async () => {
  try {
    const response = await api.get("/signOut").then(async (res: any) => {
      if (res && res?.isSuccess) {
        eraseCookie(localStorageKeys.authKey);
        localStorage.clear();
        Router.push(`/login`);
        return res.data;
      }
      return res;
    });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncChangePassword = async (params: any) => {
  try {
    const response = await api
      .put("/changePwd", null, { params })
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          return res;
        }
      });
    return response;
  } catch (e: any) {
    errorAlert(e.message);
    return e.message;
  }
};
