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

export const asyncgetdates =async (payload:any) => {
  const data = {
    p_code:payload
  }
  console.log(data);
  try {
    const response = await api
      .get("/getProjectDates",{params:data})
      .then(async (res: any) => {
        if (res && res?.isSuccess) {
          console.log(res.data);
        const years =   Array.from( new Set(res.data.map((val: { [x: string]: any; }) => val['year'])));
        const days =   Array.from( new Set(res.data.map((val: { [x: string]: any; }) => val['day'])))
        const months =   Array.from( new Set(res.data.map((val: { [x: string]: any; }) => val['month'])))
        const dates = {
          days: days,
          months:months,
          years:years,
          latestdate:days[0] + '-' + months[0] + '-' + years[0]
        }
          return dates;
        }
      });
    return response;
  } catch (e: any) {
    return e.message;
  }
}


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

export const asyncdeleteSelectedproject = async (payload:any) => {
  
  // payload = JSON.stringify(payload)
  console.log(payload)

  const store={
    data:payload
  }

  // console.log(data)

  try {
    const indexes = payload.map((item: number) => (item));
    const response = await api
    .delete("/deleteProjectDetails",{params: store} )
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


