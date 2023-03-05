import Api from "@/services/Api";
import { localStorageKeys } from "@/utils/constants";
import { createCookie, eraseCookie } from "@/utils/cookieCreator";
import Router from "next/router";

const api = new Api();

export const asyncGetAllNews = async () => {
  try {
    const response = await api.get("/getallNews").then(async (res: any) => {
      if (res && res?.isSuccess) {
        return res;
      }
    });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncGetNews = async (payload: any) => {
  try {
    const response = await api
      .get("/getNews", { params: payload })
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

export const asyncAddNews = async (payload: any) => {
  try {
    const response = await api
      .post("/addNews", payload)
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          return res.data;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncSearchNews = async (payload: any) => {
  try {
    const response = await api
      .get("/searchNews", { params: payload })
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

export const asyncUpdateNews = async (payload: any) => {
  try {
    const response = await api
      .put("/updateNews", null, { params: payload })
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

export const asyncDeleteNews = async (payload: any) => {
  try {
    const response = await api
      .delete("/deleteNews", null, { params: payload })
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
