/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import * as s from "../../styles/common.style";
import Sidebar from "../../src/components/sidebar";
import Router, { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  asyncDeleteProjectHighlight,
  asyncGetProjectHighlights,
  asyncSearchProjectHighlights,
} from "@/services/project/project.service";
import { errorString, PAGE_SIZE } from "@/utils/constants";
import Pagination from "@/src/components/Pagination";
import Loader from "@/src/components/Loader";
import { checkIsAuth } from "@/utils/globalFunctions";
import { errorAlert, successAlert } from "@/utils/alerts";

const ProjectManagement = () => {
  const router = useRouter();
  const dataFetchedRef = useRef(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [projectsData, setProjectsData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);

  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchProjectHighlight();
  }, []);

  const fetchProjectHighlight = async () => {
    setIsLoading(true);
    const response = await asyncGetProjectHighlights();
    setIsLoading(false);
    if (response && response.data) {
      setProjectsData(response.data);
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    const totalPageCount = Math.ceil(projectsData.length / PAGE_SIZE);
    setTotalCount(totalPageCount);
    return isViewAll
      ? projectsData
      : projectsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, projectsData, isViewAll]);

  const handleOnChangeSearch = (event: any) => {
    const { value } = event.target;
    if (value?.trim()?.length == "0") {
      fetchProjectHighlight();
    }
    setSearchValue(value);
  };

  const handleOnClickSearch = async () => {
    if (searchValue) {
      const response = await asyncSearchProjectHighlights({
        p_name: searchValue,
      });
      setIsLoading(false);
      console.log("response :>> ", response);
      if (response) {
        if (
          response?.data &&
          response?.data?.length > 0 &&
          typeof response?.data !== "string"
        ) {
          setProjectsData(response?.data);
        } else {
          errorAlert(response?.data);
        }
      }
    }
  };

  const handleOnClickDelete = async (data: any) => {
    setIsLoading(true);
    const response = await asyncDeleteProjectHighlight({ phid: data?.phid });
    setIsLoading(false);
    if (response) {
      if (response?.data?.success) {
        successAlert(`Project deleted successfully`);
        fetchProjectHighlight();
      } else {
        errorAlert(response?.data || errorString.catchError);
      }
    }
  };

  const handleOnClickUpdate = async (data: any) => {
    if (!data?.phid) {
      errorAlert("Project id not found");
      return;
    }
    router.push({
      pathname: "/projecthighlight",
      query: { phid: data?.phid },
    });
  };

  const handleOnClickViewAll = () => {
    setIsViewAll((prev) => !prev);
  };
  return (
    <>
      <Head>
        <title>WiseScan | Project Highlight Management</title>
      </Head>
      <Sidebar />
      <s.CommonDashboardBlock>
        <div className="dashboard-block-inner">
          <div className="title-block flex-block-inner">
            <h3>Project Highlight Management</h3>
            <button
              type="submit"
              onClick={() => router.push("/projecthighlight")}
              className="btn common-button-yellow"
            >
              Add Project Highlight
            </button>
          </div>
          <div className="table-block-common">
            <div className="title-block-list">
              <p>
                Project, Listing 1 to {PAGE_SIZE} of {projectsData?.length}{" "}
                [Page {currentPage} of {totalCount}]
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by project name"
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
                    <th>Photo</th>
                    <th>Project name</th>
                    <th>Rank Priority</th>
                    <th>Project Write Up</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="profile-img">
                            <img src={item?.pic_url} alt="img-profile"></img>
                          </div>
                        </td>
                        <td>{item?.p_name}</td>
                        <td>{item?.rank}</td>
                        <td>{item?.desc}</td>
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
export default ProjectManagement;
