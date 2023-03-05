/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import * as s from "../../styles/common.style";
// import { Sidebar } from "../sidebar";
import Sidebar from "../../src/components/sidebar";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import data from "../../utils/mockData.json";
import Pagination from "@/src/components/Pagination";
import {
  asyncDeleteClient,
  asyncGetAllClients,
  asyncSearchClient,
} from "@/services/client/client.service";
import {
  DUMMY_CLIENTS,
  errorString,
  localStorageKeys,
  PAGE_SIZE,
} from "@/utils/constants";
import Loader from "@/src/components/Loader";
import { readCookie } from "@/utils/cookieCreator";
import { checkIsAuth } from "@/utils/globalFunctions";
import { errorAlert, successAlert } from "@/utils/alerts";

const Clients = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [clientData, setClientData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (!checkIsAuth()) {
      router.push("/");
      return;
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClients = async () => {
    setIsLoading(true);
    const response = await asyncGetAllClients();
    setIsLoading(false);
    if (response && response.data) {
      setClientData(response.data);
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    const totalPageCount = Math.ceil(clientData.length / PAGE_SIZE);
    setTotalCount(totalPageCount);
    return isViewAll
      ? clientData
      : clientData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, clientData, isViewAll]);

  const handleOnClickDelete = async (data: any) => {
    setIsLoading(true);
    const response = await asyncDeleteClient({ usrnme: data.usrnme });
    if (response) {
      if (response?.success) {
        successAlert(`Client deleted successfully`);
        fetchClients();
      } else {
        setIsLoading(false);
        errorAlert(response || errorString.catchError);
      }
    }
  };

  const handleOnClickUpdate = async (data: any) => {
    if (!data?.usrnme) {
      errorAlert("Client not found");
      return;
    }
    router.push({
      pathname: "/addClient",
      query: { username: data.usrnme },
    });
  };

  const handleOnChangeSearch = (event: any) => {
    const { value } = event.target;
    if (value?.trim()?.length == "0") {
      fetchClients();
    }
    setSearchValue(value);
  };

  const handleOnClickSearch = async () => {
    if (searchValue) {
      setIsLoading(true);
      const response = await asyncSearchClient({ c_name: searchValue });
      setIsLoading(false);
      if (response && response?.length > 0) {
        if (typeof response !== "string") {
          setClientData(response);
        } else {
          errorAlert(response || errorString.catchError);
        }
      }
    }
  };

  const handleOnClickViewAll = () => {
    setIsViewAll((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>WiseScan | Clients</title>
      </Head>
      <Sidebar />
      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block flex-block-inner">
            <h3>Client Management</h3>
            <button
              type="submit"
              className="btn common-button-yellow"
              onClick={() => router.push("/addClient")}
            >
              Add Client
            </button>
          </div>
          <div className="table-block-common">
            <div className="title-block-list">
              <p>
                Client, Listing 1 to {PAGE_SIZE} of {clientData?.length} [Page
                {currentPage} of {totalCount}]
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search client by name"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={searchValue}
                  onChange={handleOnChangeSearch}
                ></input>
                <div className="input-group-append">
                  <button
                    className="btn "
                    type="button"
                    id="button-addon2"
                    onClick={handleOnClickSearch}
                  >
                    <img src="assets/search-icon.svg" alt="people-icon" />
                  </button>
                </div>
              </div>
            </div>

            <s.TableCommon>
              <table>
                <thead>
                  <tr>
                    <th>
                      <div className="form-group">
                        <input id="selectAll" type="checkbox"></input>
                        <label htmlFor="selectAll"></label>
                      </div>
                    </th>
                    <th>Organization</th>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="form-group">
                            <input
                              name={item?.c_name}
                              type="checkbox"
                              id={item?.c_name + index}
                            ></input>
                            <label htmlFor={item?.c_name + index}></label>
                          </div>
                        </td>
                        <td>{item?.org_name}</td>
                        <td>{item?.status}</td>
                        <td>{item?.c_name}</td>
                        <td>
                          <span className="highlight">{item?.usrnme}</span>
                        </td>
                        <td>
                          <div className="action-block">
                            <Link
                              href=""
                              onClick={() => handleOnClickUpdate(item)}
                            >
                              <img src="assets/edit-icon.svg" alt="edit-icon" />
                            </Link>
                            <Link
                              href=""
                              className="delete-icon"
                              onClick={() => handleOnClickDelete(item)}
                            >
                              <img
                                src="assets/trash-icon.svg"
                                alt="trash-icon"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="btn-pagination">
                <div className="last-table-block">
                  <button
                    className="btn common-button-black"
                    onClick={handleOnClickViewAll}
                  >
                    {isViewAll ? `View By Page` : `View All`}
                  </button>
                </div>
                {!isViewAll && (
                  <Pagination
                    className="pagination-bar progessbar-custom-block"
                    currentPage={currentPage}
                    totalCount={clientData.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={(page: any) => setCurrentPage(page)}
                  />
                )}
              </div>
            </s.TableCommon>
            <Loader isLoading={isLoading} />
          </div>
        </div>
      </s.CommonDashboardBlock>
    </>
  );
};
export default Clients;
