import SweetAlert from "sweetalert2";

const alertOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
};

const successAlertOptions: any = {
  ...alertOptions,
  imageUrl: `/assets/check.png`,
};

const errorAlertOption: any = {
  ...alertOptions,
  imageUrl: `/assets/warning.png`,
};

export const errorAlert = (message: any) => {
  SweetAlert.mixin(errorAlertOption).fire({
    title: message,
  });
};

export const successAlert = (message: any) => {
  SweetAlert.mixin(successAlertOptions).fire({
    title: message,
  });
};
