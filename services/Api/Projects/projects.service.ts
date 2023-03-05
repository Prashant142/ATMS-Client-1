import Api from "@/services/Api";
import { secureKeys, storageKeys } from "@/utils/constants";
import { readCookie, decodeData } from "@/utils/cookieCreator";
const api = new Api();

export const asyncGetAllProjects = async () => {
  const usrnme = readCookie(storageKeys.userName);
 
  const data = { usrnme: usrnme };
  console.log("pwd :>> ", data);
  try {
    const response = await api
      .get("/getProjects", { params: data })
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          console.log(res);
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncGetProjectDetails = async (payload: any) => {
  try {
    const response = await api
      .get("/getProjectDetails", { params: payload })
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          console.log(res);
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncDownload = async (payload: any) => {
  const usrnme = readCookie(storageKeys.userName);
  
  const data = { usrnme: usrnme,fileName:payload };
  console.log("pwd :>> ", data);
  try {

    const response = await api
      .post("/download", data)
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





export const asyncgetTrailLog = async () => {
  const usrnme = readCookie(storageKeys.userName);
 
  const data = { usrnme: usrnme };
  console.log("pwd :>> ", data);
  try {
    const response = await api
      .get("/getTrailLog", { params: data })
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          console.log(res);
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};


export const asyncgetPackagesLog = async () => {
 
  try {
    const response = await api
      .get("/getincominglLog",)
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          console.log(res);
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncdeleteproject = async (payload:any) => {
  const usrnme = readCookie(storageKeys.userName);
 
  const data = { usrnme: usrnme ,code: payload};
  console.log("pwd :>> ", data);
  try {
    const response = await api
      .delete("/deleteProject?usrnme="+ usrnme +"&code="+payload, )
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          console.log(res);
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};