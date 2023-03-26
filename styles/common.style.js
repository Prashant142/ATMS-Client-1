import styled from "styled-components";

export const LoginMain = styled.div`
  height: calc(100% - 81px);
  padding: 46px;
  .back-login {
    position: absolute;
    top: 0px;
    display: flex;
    align-items: center;
    font-family: "Inter", sans-serif;
    a {
      display: flex;
      align-items: center;
      span {
        padding-left: 10px;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        text-transform: uppercase;
        font-family: "Inter", sans-serif;
      }
    }
  }
  .login-main {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;

    .login-left {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .login-left-inner {
        width: 600px;
        text-align: center;
      }
    }
  }
`;
export const CommonForm = styled.form`
  padding: 60px;
  background-color: #ffffff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-top: 50px;
  h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-transform: uppercase;
    color: #000000;
    margin-bottom: 60px;
    font-family: "Inter", sans-serif;
  }
  .form-group {
    margin-bottom: 30px;
    text-align: left;
    label {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #000;
      position: relative;
      font-family: "Inter", sans-serif;
      display: block;
    }
    .form-control {
      background: #f2f7ff;
      border-radius: 6px;
      height: 30px;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(54, 54, 54, 0.5);
      width: 100%;
      border: none;
      border-radius: 0px;
      border-bottom: 1px dashed rgba(54, 54, 54, 0.5);
      outline: none;
      padding: 10px;
      background: none;
      font-family: "Inter", sans-serif;

      ::-webkit-input-placeholder {
        /* Edge */
        color: rgba(54, 54, 54, 0.5);
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgba(54, 54, 54, 0.5);
      }

      ::placeholder {
        color: rgba(54, 54, 54, 0.5);
      }
    }
    textarea {
      height: 130px !important;
      resize: none;
    }
    [type="file"] {
      /* Style the color of the message that says 'No file chosen' */
      color: rgba(54, 54, 54, 0.5);
    }
    [type="file"]::-webkit-file-upload-button {
      background: #f2f7ff;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      height: 52px;
      font-weight: 400;
      outline: none;
      padding: 10px 25px;
      text-transform: uppercase;
      transition: all 1s ease;
      border: none !important;
      color: rgba(54, 54, 54, 0.5);
    }

    [type="file"]::-webkit-file-upload-button:hover {
      background: #fff;
      border: 2px solid #535353;
      color: #000;
    }
  }
  .forgot-password-block {
    margin-bottom: 55px;
    display: flex;
    align-items: center;
    justify-content: end;
    a {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
  }
  .login-from-inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .common-button {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    font-family: "Inter", sans-serif;
    color: #ffffff;
    background-color: #000000;
    border-radius: 6px;
    width: 280px;
    padding: 17px;
    border: none;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      background-color: #e6813f;
    }
  }
  &.common-form-block-main {
    display: flex;
    margin: 0px -15px;
    flex-wrap: wrap;
    .common-form-block-inner {
      padding: 0px 15px;
      width: 50%;
      .last-btn {
        padding-left: 0px;
        margin-top: 20px;
      }
      .form-group {
        width: 100%;
        label {
          &.d-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-weight: 300;
              font-size: 13px;
              line-height: 15px;

              color: #363636;
            }
          }
        }
        textarea {
          height: 360px !important;
          resize: none;
          line-height: 40px !important;
        }
      }
    }
  }
`;
export const Footer = styled.div`
  background: #031971;
  padding: 32px;
  text-align: center;
  margin-top:auto;
  
  left: 0;
  bottom: 0;
  width: 100%;

  

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.01em;
    color: #ffffff;
   
    
  }
`;

export const Header = styled.div`
  position: relative;
  background-color: #fff;

  .header-block {
    display: flex;
    align-items: center;
    padding: 15px 0px;
    .logo-header {
      padding-right: 20px;
    }
    .menu-block-header {
      display: flex;
      align-items: center;
      ul {
        margin: 0px;
        padding: 0px;
        display: flex;
        align-items: center;
        li {
          list-style: none;
          padding: 0px 16px;
          a {
            font-family: "Inter", sans-serif;
            font-size: 18px;
            line-height: 18px;
            color: #535353;
            font-weight: 500;
          }
        }
      }
      .header-right {
        display: flex;
        align-items: center;
        .link-right {
          padding-right: 10px;
          a {
            font-size: 18px;
            line-height: 18px;
            font-weight: 500;
            color: #031971;
          }
        }
        .input-group {
          display: flex;
          align-items: center;
          .form-control {
            height: 30px;
            border-radius: 0px;
            padding: 10px;
            border-color: #535353;
            border: 1px solid;
            padding: 10px;
            color: #535353;
            margin-right: 10px;
          }
          .btn-secondary {
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            font-family: "Inter", sans-serif;
            color: #ffffff;
            background-color: #000000;
            border-radius: 6px;
            width: auto;
            padding: 6px 17px;
            border: none;
            -webkit-transition: 0.5s;
            transition: 0.5s;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export const HomeMain = styled.div`
  font-family: "Inter", sans-serif;
       
       
  .top-home-block {
    background-color: #000;
    padding-top: 56px;
    font-family: "Inter", sans-serif;
     
        

    .title-block {
      padding-bottom: 45px;
      h1 {
        font-weight: 700;
        font-size: 32px;
        line-height: 39px;
        text-transform: uppercase;
        font-family: "Inter", sans-serif;
        color: #ffffff;
        span {
          color: #e6813f;
        }
      }
    }
    .title-block-bottom {
      display: flex;
      justify-content: space-between;
      .project-tabs {
        display: flex;
      }
      .project-block-under {
        p {
          margin-right: 2em;
          position: relative;
          font-weight: 500;
          font-size: 16px;
          line-height: 19px;
          text-align: center;
          letter-spacing: 0.01em;
          color: #ffffff;
          cursor:pointer;
          padding: 7px 10px 15px;
          &:before {
            content: "";
            position: absolute;
            bottom: -8px;
            right: 0;
            left: 0;
            background-color: #e6813f;
            width: 100%;
            height: 5px;
          }

       
        }
      }
      .profile-block {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-content {
          padding-left: 10px;

          h5 {
            font-weight: 500;
            font-size: 17px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: #ffffff;
          }
          button,
          a {
            background-color: unset;
            border: unset;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.01em;
            text-transform: uppercase;
            color: #e6813f;
          }
        }
      }
    }
  }
  .welcome-block {
    padding: 70px 0px 120px;
    .welcome-block-inner {
      margin-bottom: 50px;
      h3 {
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        color: #363636;
        padding-bottom: 22px;
        font-family: "Inter", sans-serif;
      }
      p {
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
        color: #363636;
        font-family: "Inter", sans-serif;
      }
    }
    .common-form-block-inner {
      padding: 0px 15px;
      width: 50%;
      .last-btn {
        padding-left: 0px;
        display: flex;
        align-items: center;
      }
      .common-button-yellow {
        width: auto;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #ffffff;
        font-family: "Open Sans", sans-serif;
        transition: 0.5s;
        background: #e6813f;
        border-radius: 6px;
        padding: 14px 51px;
        cursor: pointer;
        border: none;
      }
    }
    .projects-block-table {
      .projects-block-title {
        border-bottom: 1px solid #000;
        padding-bottom: 15px;
        margin-bottom: 20px;
        h2 {
          font-weight: 700;
          font-size: 24px;
          line-height: 29px;
          color: #363636;
          margin: 0px;
        }
      }
      .projects-block-list {
        .projects-block-list-inner {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid rgba(54, 54, 54, 0.17);
          border-radius: 6px;
          padding: 13px;
          margin-bottom: 10px;
          justify-content: space-between;
          .projects-img {
            display: flex;
            align-items: center;
            img {
              width: 52px;
              height: 52px;
              border-radius: 50%;
              object-fit: cover;
            }
            h5 {
              font-weight: 600;
              font-size: 16px;
              line-height: 19px;
              color: #363636;
              padding-left: 20px;
            }
          }
          .projects-link {
            display: flex;
            button {
              display: flex;
              background-color: white;
              align-items: center;
              justify-content: center;
              width: 48px;
              height: 48px;
              border-radius: 5px;
              border: 1px solid;
              border-color: #031971;
              margin: 0px 5px;
              &:last-child {
                border-color: #e6813f;
              }
            
             

            }
            button:hover {
              cursor: pointer;
              background-color:#e3e1fa
            }
          }
        }
      }
    }
    .projects-img-main {
      display: flex;
      align-items: center;
      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        object-fit: cover;
      }
      h5 {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #363636;
        padding-left: 20px;
      }
    }
    .select-custom-block {
      display: flex;
      margin: 40px 0px 20px;
    }
    select {
      background: #f2f7ff;
      border-radius: 6px;
      height: 52px;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(54, 54, 54, 0.5);
      width: 158px;
      border: none;
      border: 1px solid #e6813f;
      outline: none;
      padding: 16px 15px;
      margin-right: 10px;
    }
  }
`;

export const TableCommon = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    .pdf-block {
      display: flex;
      align-items: center;
      h4 {
        padding-left: 15px;
        margin: 0px;
        font-weight: 500;
      }
    }
    .form-group {
      display: block;
      input {
        padding: 0;
        height: initial;
        width: initial;
        margin-bottom: 0;
        display: none;
        cursor: pointer;
        &:checked {
          + label {
            &::after {
              content: "";
              display: block;
              position: absolute;
              top: 2px;
              left: 7px;
              width: 4px;
              height: 10px;
              border: solid #ef824a;
              border-width: 0 2px 2px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }
        }
      }

      label {
        position: relative;
        cursor: pointer;
        &:before {
          content: "";
          -webkit-appearance: none;
          background-color: transparent;
          border: 1px solid #000;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
            inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
          padding: 9px;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 5px;
          background-color: #fff;
          border-radius: 4px;
        }
      }
    }
    thead {
      th {
        padding: 13px 20px;
        width: 10%;
        text-align: left;
        background-color: #000;
        color: #fff;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-transform: uppercase;
        position: relative;

        &:nth-child(2) {
          width: 45%;
        }
        &:nth-child(3) {
          width: 30%;
        }
        &:nth-child(4) {
          width: 15%;
        }
      }
    }
    tbody {
      td {
        padding: 13px 20px;
        width: 10%;
        text-align: left;
        color: #fff;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        text-transform: capitalize;
        color: #363636;
        position: relative;

        .highlight {
          color: #e6813f;
        }
        .action-block {
          display: flex;
          align-items: center;
          a {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            display: flex;
            padding: 3px;
            background-color: #000;
            margin: 0px 3px;
            &.delete-icon {
              background: #e6813f;
            }
          }
        }
      }
    }
  }
  .last-table-block {
    display: flex;
    align-items: center;
    padding: 30px 0px;
    justify-content: space-between;
    .common-button-black {
      width: auto;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: #ffffff;
      font-family: "Open Sans", sans-serif;
      -webkit-transition: 0.5s;
      transition: 0.5s;
      background: #000;
      border-radius: 6px;
      padding: 14px 51px;
      cursor: pointer;
      border: none;
    }
  }
  &.table-project {
    table {
      thead {
        th {
          width: 30%;

          &:nth-child(1) {
            width: 70%;
          }
        }
      }
    }
  }
  &.table-project-management {
    table {
      thead {
        th {
          width: 10%;

          &:nth-child(2) {
            width: 30%;
          }
          &:nth-child(3) {
            width: 15%;
          }
          &:nth-child(4) {
            width: 30%;
          }
        }
      }
      .profile-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
`;
export const ErrorMessageBlock = styled.span`
  color: red;
`;
