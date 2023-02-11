import fs from "fs";
import { Coupon } from "../interfaces/coupon";

interface ReadArgs {
  fileName: string;
  onError?: () => void;
}

export const read = ({ fileName, onError }: ReadArgs): Coupon[] => {
  let data;

  try {
    data = fs.readFileSync(`src/database/${fileName}.json`, { encoding: "utf8" });
    return data ? JSON.parse(data)?.[fileName] : [];
  } catch (error) {
    onError?.();
  }

  return [];
};

interface WriteArgs {
  fileName: string;
  data: object;
  onError?: () => void;
}

export const write = ({ fileName, data, onError }: WriteArgs) => {
  const json = JSON.stringify(data);

  try {
    fs.writeFileSync(`src/database/${fileName}.json`, json);
    return;
  } catch (error) {
    onError?.();
  }
};
