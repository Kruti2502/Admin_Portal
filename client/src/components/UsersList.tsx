import { useEffect, useState } from "react";
import { RowType } from "../containers/interface";
import { useSelector } from "react-redux";
import { users } from "../slice/userSlice";
import useModal from "../hooks/useModal";
import EditModal from "./EditModal";
import { Button, Table, Input } from "antd";
import "./UsersList.css";
import useExcel from "../hooks/useExcel";
import useHandlers from "../hooks/useHandlers";

const UsersList = () => {
  const allUsersData = useSelector(users) || [];
  const [excelData, setExcelData] =
    useState<Omit<RowType, "edit">[]>(allUsersData);
  const [editRowData, setEditRowData] = useState<RowType>();

  const { handleCancel, handleOk, isModalOpen, showModal } = useModal();
  const { handleFileChange, handleExport } = useExcel(excelData);
  const { logoutHandler, editClickHandler, deleteClickHandler } = useHandlers({
    setEditRowData,
    showModal,
    allUsersData,
  });

  useEffect(() => {
    setExcelData(allUsersData);
  }, [allUsersData]);

  const columns = [
    { key: "key", title: "ID", dataIndex: "key" },
    { key: "first_name", title: "First name", dataIndex: "first_name" },
    { key: "last_name", title: "Last name", dataIndex: "last_name" },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "course_name", title: "Course name", dataIndex: "course_name" },
    { key: "passing_year", title: "Passing year", dataIndex: "passing_year" },
    {
      key: "university_name",
      title: "University name",
      dataIndex: "university_name",
    },
    { key: "department", title: "Department", dataIndex: "department" },
    { key: "job_title", title: "Job title", dataIndex: "job_title" },
    { key: "company_name", title: "Company name", dataIndex: "company_name" },
    { key: "contact_no", title: "Contact no", dataIndex: "contact_no" },
    {
      key: "edit",
      title: "",
      dataIndex: "edit",
      render: (_: any, record: any) => (
        <a href="#" onClick={() => editClickHandler(record)}>
          Edit
        </a>
      ),
    },
    {
      key: "delete",
      title: "",
      dataIndex: "delete",
      render: (_: any, record: any) => (
        <a href="#" onClick={() => deleteClickHandler(record)}>
          Delete
        </a>
      ),
    },
  ];

  return (
    <>
      <Button onClick={logoutHandler} className="logout">
        Logout
      </Button>
      <div className="buttons">
        <Button onClick={showModal} className="create-user">
          Create new user
        </Button>
        <div className="excel-buttons">
          <Input
            className="import-input"
            type="file"
            title="fileAdd"
            onChange={handleFileChange}
            size="middle"
          />
          <Button onClick={handleExport} className="export-button">
            Export to Excel
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={excelData} className="table" />
      <EditModal
        {...{ isModalOpen, handleCancel, handleOk, editRowData }}
        totalRows={allUsersData.length}
      />
    </>
  );
};

export default UsersList;
