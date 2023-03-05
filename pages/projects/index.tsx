/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Head from "next/head";
import * as s from "../../styles/common.style";
// import { Sidebar } from "../sidebar";
import Sidebar from "../../src/components/sidebar";
import Router, { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  asyncGetAllProjects,
  asyncDeleteProject,
  asyncSearchProject,
} from "@/services/project/project.service";
import { errorString, PAGE_SIZE } from "@/utils/constants";
import Pagination from "@/src/components/Pagination";
import Loader from "@/src/components/Loader";
import { checkIsAuth } from "@/utils/globalFunctions";
import { errorAlert, successAlert } from "@/utils/alerts";

const Project = () => {
  //States

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [projectsData, setProjectsData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);

  //Hooks
  const router = useRouter();
  const dataFetchedRef = useRef(false);

  //Life cycle hooks
  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchProjects();
  }, []);

  //Fetch method
  const fetchProjects = async () => {
    setIsLoading(true);
    const response = await asyncGetAllProjects();
    setIsLoading(false);
    if (response && response.data) {
      setProjectsData(response.data);
    }
  };

  //Table data
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    const totalPageCount = Math.ceil(projectsData.length / PAGE_SIZE);
    setTotalCount(totalPageCount);
    return isViewAll
      ? projectsData
      : projectsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, projectsData, isViewAll]);

  const handleOnClickDelete = async (data: any) => {
    setIsLoading(true);
    const response = await asyncDeleteProject({ code: data.code });
    setIsLoading(false);
    if (response) {
      if (response?.success) {
        successAlert(`Project deleted successfully`);
        fetchProjects();
      } else {
        errorAlert(response || errorString.catchError);
      }
    }
  };

  const handleOnClickUpdate = async (data: any) => {
    if (!data?.code) {
      errorAlert("Project not found");
      return;
    }
    router.push({
      pathname: "/addproject",
      query: { code: data.code },
    });
  };

  const handleOnChangeSearch = (event: any) => {
    const { value } = event.target;
    if (value?.trim()?.length == "0") {
      fetchProjects();
    }
    setSearchValue(value);
  };

  const handleOnClickSearch = async () => {
    if (searchValue) {
      setIsLoading(true);
      const response = await asyncSearchProject({ p_name: searchValue });
      setIsLoading(false);
      if (response) {
        if (response?.data?.length > 0 && typeof response?.data !== "string") {
          setProjectsData(response.data);
        } else {
          errorAlert(response.data || errorString.catchError);
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
        <title>WiseScan | Projects</title>
      </Head>
      <Sidebar />
      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block flex-block-inner">
            <h3>Project Management</h3>
            <button
              type="submit"
              className="btn common-button-yellow"
              onClick={() => router.push("/addproject")}
            >
              Add Project
            </button>
          </div>
          <div className="table-block-common">
            <div className="title-block-list">
              <p>
                Project, Listing 1 to {PAGE_SIZE} of {projectsData?.length}
                [Page {currentPage} of {totalCount}]
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search project by name"
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
            <s.TableCommon className="table-project">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item?.p_name}</td>
                        <td>
                          <span className="highlight">{item?.code}</span>
                        </td>
                        <td>
                          <div className="action-block">
                            <Link
                              href=""
                              onClick={() => handleOnClickUpdate(item)}
                            >
                              <img
                                src="assets/edit-icon.svg"
                                alt="edit-icon"
                              ></img>
                            </Link>
                            <Link
                              href=""
                              className="delete-icon"
                              onClick={() => handleOnClickDelete(item)}
                            >
                              <img
                                src="assets/trash-icon.svg"
                                alt="trash-icon"
                              ></img>
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
                    totalCount={projectsData.length}
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
export default Project;
