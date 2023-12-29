import { RowType } from "../containers/interface";

export function convertArrayToObject(arrayOfArrays: RowType[][]) {
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

export const initialRawData = {
  key: 0,
  first_name: "",
  last_name: "",
  email: "",
  course_name: "",
  passing_year: "",
  university_name: "",
  department: "",
  job_title: "",
  company_name: "",
  contact_no: "",
  edit: "",
};
