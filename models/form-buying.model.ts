import { isObject } from "lodash";

class FormBuyingModel {
  user_name: string;
  address: string;
  phone: string;
  option: string;

  constructor({ user_name = "", address = "", phone = "", option = "" }) {
    this.user_name = user_name;
    this.address = address;
    this.phone = phone;
    this.option = option;
  }

  static parseBodyRequestToPush(values: FormBuyingModel) {
    if (isObject(values)) {
      return {
        user_name: values.user_name,
        address: values.address,
        phone: values.phone,
        option: values.option
      }
    }

    return {};
  }
}

export default FormBuyingModel;
