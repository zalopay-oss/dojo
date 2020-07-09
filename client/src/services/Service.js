import axios from "axios";
import URL from "../util/url";
export default axios.create({
  baseURL: URL.ADMIN_API,
});
