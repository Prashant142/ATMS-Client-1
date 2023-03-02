import Api from "@/services/Api";
import { localStorageKeys } from "@/utils/constants";
import { createCookie, eraseCookie } from "@/utils/cookieCreator";
import axios from "axios";
import Router from "next/router";

const api = new Api();

export const asyncGetAllProjects = async () => {
  try {
    const response = await api.get("/getAllProjects").then(async (res: any) => {
      if (res && res?.isSuccess) {
        return res;
      }
    });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncGetProject = async (payload: any) => {
  try {
    const response = await api
      .get("/getProjects", { params: payload })
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

export const asyncAddProject = async (payload: any) => {
  try {
    const response = await api
      .post("/addProject", payload)
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

export const asyncUpdateProject = async (payload: any) => {
  try {
    const response = await api
      .put("/updateProject", payload)
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

export const asyncDeleteProject = async (payload: any) => {
  try {
    const response = await api
      .delete("/deleteProject", null, { params: payload })
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

export const asyncSearchProject = async (payload: any) => {
  try {
    const response = await api
      .get("/searchProject", { params: payload })
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

export const asyncGetProjectHighlights = async () => {
  try {
    const response = await api
      .get("/getAllProjectHighlights")
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

export const asyncAddProjectHighlights = async (payload: any) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://143.198.198.28:5002/addProjectHighlights",
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(async (res: any) => {
      return res;
    });
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncSearchProjectHighlights = async (payload: any) => {
  try {
    const response = await api
      .get("/searchProjectHighlights", { params: payload })
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

export const asyncUpdateProjectHighlight = async (payload: any) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://143.198.198.28:5002/updateProjectHighlights",
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(async (res: any) => {
      return res;
    });
    console.log("response :>> ", response);
    return response;
  } catch (e: any) {
    return e.message;
  }
};

export const asyncDeleteProjectHighlight = async (payload: any) => {
  try {
    const response = await api
      .delete("/deleteProjectHighlights", null, { params: payload })
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

export const asyncGetProjectHighlight = async (payload: any) => {
  try {
    const response = await api
      .get("/getProjectHighlights", { params: payload })
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
