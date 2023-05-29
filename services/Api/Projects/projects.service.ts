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
          // console.log("This is the response that should have dates: ", res);
          return res;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export async function asyncGetClientDetails(username: string): Promise<any> {
  const endpoint = "/getClients";

  // Construct the API URL with the parameters
  const url = `http://143.198.198.28:5002/getClient?usrnme=${username}`;

  // Make the API call
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Log the response and parameters
    console.log("Response:", data);
    console.log("Username:", username);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Rethrow the error
  }
}

export const asyncgetdates = async (payload: any) => {
  const data = {
    p_code: payload,
  };
  // console.log(" Before call ", data);
  try {
    const response = await api
      .get("/getProjectDates", { params: data })
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          // console.log("After call", res.data);
          const years = res.data.years;
          const days = res.data.days;
          const months = res.data.months;
          const dates = {
            days: days,
            months: months,
            years: years,
            latestdate: days[0] + "-" + months[0] + "-" + years[0],
          };
          // console.log("These are the dates :-", dates);
          return dates;
        }
      });
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
