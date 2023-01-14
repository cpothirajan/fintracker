import http from "./httpService";
import { mutualFundAPIUrl } from "../config.json";

export function getNAV(schemeCode) {
  return http.get(mutualFundAPIUrl + "/" + schemeCode);
}
export function getAllMutualFunds() {
  return http.get(mutualFundAPIUrl);
}
