import httpService from "./httpMethod";
import { GET_DATA_URL } from "constants/api";
import moment from 'moment';

const formatDate = () => {
  var date = new Date();
  const convertDate = moment(date).format("DD/MM/YYYY - HH:MM:SS");
  return convertDate;
}
class GoogleServices {
  putDataToGGSheet({user_name = "", address = "", phone = "", option = "", time = ""}) {
    return fetch(
      `${GET_DATA_URL}?user_name=${user_name}&address=${address}&phone=${phone}&option=${option}&time=${formatDate()}`
    )
  }
}

export default new GoogleServices();
