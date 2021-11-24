import type { NextPage } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Input, Label } from "reactstrap";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import googleServices from "services/googleServices";
import useToggleDialog from "hooks/useToggleDialog";
import DialogAlert from "components/DialogAlert";
import { GET_DATA_URL } from "constants/api";
import { useState } from "react";
import FormBuyingModel from "models/form-buying.model";

const validationLoginSchema = Yup.object().shape({
  user_name: Yup.string().required("Vui lòng nhập đúng họ và tên"),
  address: Yup.string().required("Vui lòng nhập đúng địa chỉ"),
  phone: Yup.string().required("Vui lòng nhập đúng số điện thoại"),
});

const Home: NextPage = () => {
  //! State
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [openDialog, toggleDialog, shouldRenderDialog] = useToggleDialog();
  //! Function
  const onSubmit = async (
    values: FormBuyingModel,
    helperFormik: FormikHelpers<FormBuyingModel>
  ) => {
    try {
      const response = await googleServices.putDataToGGSheet(
        FormBuyingModel.parseBodyRequestToPush(values)
      );
      const data = await response.json();
      const result = data?.result;

      if (result === "success") {
        helperFormik.resetForm();
        toggleDialog();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! Render
  return (
    //
    <div className="">
      {shouldRenderDialog && (
        <DialogAlert isOpen={openDialog} toggle={toggleDialog} />
      )}
      <div className="homepage container-custom">
        <div className="homepage-img">
          <img
            src="/img/header.jpg"
            className="img-fluid custom-img"
            alt="Responsive image"
          />
          <img
            src="/img/LDP 04.png"
            className="img-fluid custom-img"
            alt="Responsive image"
          />
          <img
            src="/img/LDP 02.png"
            className="img-fluid custom-img"
            alt="Responsive image"
          />

          <img
            src="/img/LDP 01.png"
            className="img-fluid custom-img"
            alt="Responsive image"
          />
        </div>

        <Formik
          initialValues={{
            user_name: "",
            address: "",
            phone: "",
            option: "",
          }}
          validationSchema={validationLoginSchema}
          onSubmit={onSubmit}
        >
          {(propsFormik) => {
            const { errors, touched } = propsFormik;
            const getErrorMsg = (field: string) => {
              return !!errors[field] && touched[field] && errors[field];
            };

            return (
              <Form
                id="order-form"
                className="homepage-order-form needs-validation"
                noValidate
              >
                <h2>Đặt hàng</h2>
                <Label className="label-field">Họ và Tên</Label>
                <Input
                  id="user_name"
                  name="user_name"
                  type="text"
                  className="form-control"
                  placeholder="Họ và tên..."
                  onChange={propsFormik.handleChange}
                  onBlur={propsFormik.handleBlur}
                  value={propsFormik.values.user_name}
                  required
                />
                <div className="invalid-field">{getErrorMsg("user_name")}</div>
                <Label className="label-field">Địa chỉ</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ..."
                  onChange={propsFormik.handleChange}
                  onBlur={propsFormik.handleBlur}
                  value={propsFormik.values.address}
                  required
                />
                <div className="invalid-field">{getErrorMsg("address")}</div>
                <Label className="label-field">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  className="form-control"
                  placeholder="Số điện thoại..."
                  onChange={propsFormik.handleChange}
                  onBlur={propsFormik.handleBlur}
                  value={propsFormik.values.phone}
                  required
                />
                <div className="invalid-field">{getErrorMsg("phone")}</div>
                <Label className="label-field">Số lượng</Label>
                <Input
                  className="form-control"
                  id="option"
                  name="option"
                  type="select"
                  onChange={propsFormik.handleChange}
                  onBlur={propsFormik.handleBlur}
                >
                  <option>1 hộp - 135,000</option>
                  <option>2 hộp - 250,000 + Freeship</option>
                  <option>3 hộp - 350,000 + Freeship</option>
                </Input>
                <Button
                  type="submit"
                  disabled={propsFormik.isSubmitting}
                  className="btn btn-success order-btn"
                >
                  {propsFormik.isSubmitting ? "Loading..." : "MUA HÀNG"}
                </Button>
              </Form>
            );
          }}
        </Formik>
        {/*  */}
        <Button
          className="homepage-btn__fixed btn btn-success order-fixed"
          href="#order-form"
          role="button"
        >
          <span>MUA NGAY</span>
        </Button>
      </div>
    </div>
  );
};

export default Home;
