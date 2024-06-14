import { connect } from "mongoose";
import { URL, URL_LOCAL } from "./constant";

export const dbConfig = async () => {
  try {
    await connect(URL).then(() => {
      console.log("database connection established 🚀🚀🚀");
    });
  } catch (error) {
    console.log(error);
  }
};
