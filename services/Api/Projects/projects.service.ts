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

export const asyncgetdates = async (payload: any) => {
  const data = {
    p_code: payload,
  };
  console.log("This is the data "); //Delete this after ----------
  console.log(data);
  try {
    const response = await api
      .get("/getProjectDates", { params: data })
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          console.log("This is res.data"); //Delete this afetr -------------

          console.log(res.data);
          const years = Array.from(
            new Set(res.data.map((val: { [x: string]: any }) => val["year"]))
          );
          console.log(years);

          const days = Array.from(
            new Set(res.data.map((val: { [x: string]: any }) => val["day"]))
          );
          console.log(days);

          const months = Array.from(
            new Set(res.data.map((val: { [x: string]: any }) => val["month"]))
          );
          console.log(months);
          const dates = {
            days: days,
            months: months,
            years: years,
            latestdate: days[0] + "-" + months[0] + "-" + years[0],
          };
          console.log("These are the dates", dates); //Delete this after ------------
          return dates;
        }
      });
    console.log("This is the response");

    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncDownload = async (payload: any) => {
  const usrnme = readCookie(storageKeys.userName);

  const data = { usrnme: usrnme, fileName: payload };
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
      .get("/getincominglLog")
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

export const asyncdeleteproject = async (payload: any) => {
  const usrnme = readCookie(storageKeys.userName);

  const data = { usrnme: usrnme, code: payload };
  console.log("pwd :>> ", data);
  try {
    const response = await api
      .delete("/deleteProject?usrnme=" + usrnme + "&code=" + payload)
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

export const asyncdeltefiles = async (payload: any) => {
  //  const store = {
  //   data: payload

  try {
    const response = await api
      .delete("/deleteProjectDetails?data=" + JSON.stringify(payload))
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
