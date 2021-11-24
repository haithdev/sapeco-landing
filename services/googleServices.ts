import httpService from "./httpMethod";
import { GET_DATA_URL } from "constants/api";

class GoogleServices {
  putDataToGGSheet({user_name = "", address = "", phone = "", option = "", time = ""}) {
    return fetch(
      `${GET_DATA_URL}?user_name=${user_name}&address=${address}&phone=${phone}&option=${option}&time=${time}`
    )
  }
}

export default new GoogleServices();
