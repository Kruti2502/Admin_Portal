import { useEffect, useState } from "react";
import { RowType } from "../containers/interface";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, users } from "../slice/userSlice";
import useModal from "../hooks/useModal";
import EditModal from "./EditModal";
import { Button, Table, Input } from "antd";
import * as XLSX from "xlsx";

function convertArrayToObject(arrayOfArrays: RowType[][]) {
  const [keys, ...data] = arrayOfArrays;

  const result = data.map((values) => {
    const obj: Record<string, string | number> = {};
    keys.forEach((key, index) => {
      //@ts-ignore
      obj[key as string] = values[index];
    });
    return obj;
  });

  return result;
}

const UsersList = () => {
  const allUsersData = useSelector(users) || [];
  const [excelData, setExcelData] =
    useState<Omit<RowType, "edit">[]>(allUsersData);
  const dispatch = useDispatch();
  const { handleCancel, handleOk, isModalOpen, showModal } = useModal();
  const [editRowData, setEditRowData] = useState<RowType>();

  useEffect(() => {
    setExcelData(allUsersData);
  }, [allUsersData]);

  const editClickHandler = (row: RowType) => {
    setEditRowData(row);
    showModal();
  };
  const deleteClickHandler = (row: RowType) => {
    const editedData = allUsersData.filter((d) => d.key !== row.key);
    dispatch(setUserData({ userData: editedData }));
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e?.target?.files == null) {
      return;
    }

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) {
        return;
      }
      const data = new Uint8Array(e.target.result as ArrayBufferLike);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet is the one you want to work with
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse the sheet data into an array of objects
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      }) as RowType[];

      //@ts-ignore
      const hello = convertArrayToObject(parsedData);
      //@ts-ignore
      setExcelData((prev) => [...prev, ...hello]);
      dispatch(setUserData({ userData: excelData }));
    };

    reader.readAsArrayBuffer(file as Blob);
  };

  const handleExport = () => {
    // This will export file to system
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "exported_data.xlsx");
  };

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
        <a onClick={() => editClickHandler(record)}>Edit</a>
      ),
    },
    {
      key: "delete",
      title: "",
      dataIndex: "delete",
      render: (_: any, record: any) => (
        <a onClick={() => deleteClickHandler(record)}>Delete</a>
      ),
    },
  ];

  return (
    <>
      <Input type="file" title="fileAdd" onChange={handleFileChange} />
      <Button onClick={handleExport}>Export to Excel</Button>
      <Table columns={columns} dataSource={excelData} />
      <Button onClick={showModal}>Create new user</Button>
      <EditModal
        {...{ isModalOpen, handleCancel, handleOk, editRowData }}
        totalRows={allUsersData.length}
      />
    </>
  );
  return <></>;
};

export default UsersList;
