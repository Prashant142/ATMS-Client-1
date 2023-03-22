import { storageKeys } from "./constants";
import { readCookie } from "./cookieCreator";

export const checkIsAuth = () => {
  if (typeof window !== "undefined") {
    const user = readCookie(storageKeys.userName);
    if (user) {
      return true;
    }
    return false;
  }
  return false;
};

export const getUserName = () => {
  let username: any = "";
  
  if (typeof window !== "undefined") {
    username = readCookie(storageKeys.userName);
    
  }
  return username;
};

export const getisadminstatus = () => {
  let isadmin:any;
  if(typeof window !== "undefined") {
    isadmin = readCookie(storageKeys.isadmin);

  }
  return isadmin;
}