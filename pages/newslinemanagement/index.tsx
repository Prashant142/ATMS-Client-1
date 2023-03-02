/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as s from "../../styles/common.style";
import Head from "next/head";
import Sidebar from "../../src/components/sidebar";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  asyncDeleteNews,
  asyncGetAllNews,
  asyncSearchNews,
} from "@/services/news/news.service";
import Pagination from "@/src/components/Pagination";
import { PAGE_SIZE } from "@/utils/constants";
import Loader from "@/src/components/Loader";
import { checkIsAuth } from "@/utils/globalFunctions";
import { errorAlert, successAlert } from "@/utils/alerts";
import { errorString } from "../../utils/constants";

const NewsLineManagement = () => {
  //States
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isViewAll, setIsViewAll] = useState(false);

  const router = useRouter();
  const dataFetchedRef = useRef(false);

  //Life cycle hooks
  useEffect(() => {
    if (!checkIsAuth()) {
      router.push("/");
      return;
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchNews();
  }, []);

  //Fetch method
  const fetchNews = async () => {
    setIsLoading(true);
    const news = await asyncGetAllNews();
    setIsLoading(false);
    if (news && news?.data?.length > 0) {
      setNewsData(news?.data);
    } else {
      errorAlert(errorString.catchError);
    }
  };

  //Custom data for table
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    const totalPageCount = Math.ceil(newsData.length / PAGE_SIZE);
    setTotalPageCount(totalPageCount);
    return isViewAll
      ? newsData
      : newsData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, newsData, isViewAll]);

  //Other methods
  const handleOnChangeSearch = (event: any) => {
    const { value } = event.target;
    if (value?.trim()?.length == "0") {
      fetchNews();
    }
    setSearchValue(value);
  };

  const handleOnClickSearch = async () => {
    if (searchValue) {
      setIsLoading(true);
      const response = await asyncSearchNews({ news: searchValue });
      setIsLoading(false);
      if (response) {
        if (
          response?.data &&
          response?.data?.length > 0 &&
          typeof response?.data !== "string"
        ) {
          setNewsData(response?.data);
        } else {
          errorAlert(response?.data);
        }
      }
    }
  };

  const handleOnClickViewAll = () => {
    setIsViewAll((prev) => !prev);
  };

  const handleOnClickDelete = async (data: any) => {
    setIsLoading(true);
    const response = await asyncDeleteNews({ nuid: data?.nuid });
    setIsLoading(false);
    if (response) {
      if (response?.data?.success) {
        successAlert(`Project deleted successfully`);
        fetchNews();
      } else {
        errorAlert(response?.data || errorString.catchError);
      }
    }
  };

  const handleOnClickUpdate = async (data: any) => {
    if (!data?.nuid) {
      errorAlert("News id not found");
      return;
    }
    router.push({
      pathname: "/newsline",
      query: { nuid: data?.nuid },
    });
  };

  //render methods
  return (
    <>
      <Head>
        <title>WiseScan | NewsLine Management</title>
      </Head>
      <Sidebar />
      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block flex-block-inner">
            <h3>News Line Management</h3>
            <button
              type="submit"
              onClick={() => router.push("/newsline")}
              className="btn common-button-yellow"
            >
              Add News Line
            </button>
          </div>
          <div className="table-block-common">
            <div className="title-block-list">
              <p>
                News, Listing 1 to {PAGE_SIZE} of {newsData?.length} [Page{" "}
                {currentPage} of
                {totalPageCount}]
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search news"
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
                    <img src="assets/search-icon.svg" alt="people-icon"></img>
                  </button>
                </div>
              </div>
            </div>
            <s.TableCommon className="table-project-management">
              <table>
                <thead>
                  <tr>
                    <th>News Title</th>
                    <th>Start Date</th>
                    <th>News Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item?.news || item?.id}</td>
                        <td>{item?.start_date}</td>
                        <td>{item?.description}</td>
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
                    totalCount={newsData.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={(page: any) => setCurrentPage(page)}
                  />
                )}
              </div>
            </s.TableCommon>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </s.CommonDashboardBlock>
    </>
  );
};
export default NewsLineManagement;
