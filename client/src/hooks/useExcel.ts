import { RowType } from "../containers/interface";
import { setUserData } from "../slice/userSlice";
import * as XLSX from "xlsx";
import { convertArrayToObject } from "../utils/utils";
import { useDispatch } from "react-redux";

const useExcel = (
  excelData: Omit<RowType, "edit">[],
  setExcelData: () => (
    value: React.Dispatch<React.SetStateAction<Omit<RowType, "edit">[]>>
  ) => void
) => {
  const dispatch = useDispatch();
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

      // @ts-ignore
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
  return {
    handleFileChange,
    handleExport,
  };
};

export default useExcel;
