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
