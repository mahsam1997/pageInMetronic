import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import { Checkbox } from "../../../../_metronic/_partials/controls/forms/Checkbox";
import googleLogo from "../../../Assets/images/google-logo-removebg.png";
import eysIcon from "../../../Assets/svg/eys.svg";
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "admin@demo.com",
  password: "demo",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { authToken } }) => {
            disableLoading();

            props.login(authToken);
          })
          .catch(() => {
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          })
          .finally(() => {
            disableLoading();
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className=" mb-10 mb-lg-10 login-title">
        <h3 className="font-size-h1 ">
          {/* <FormattedMessage id="AUTH.LOGIN.TITLE" /> */}
          به استارتاپ اکادمی خوش آمدید!
        </h3>
        <p className="text-muted ">
          حساب کاربری ندارید؟
          <Link to="/login">حساب جدید ایجاد کنید</Link>
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        <div className="form-group fv-plugins-icon-container">
          <label>ایمیل</label>
          <input
            placeholder="ایمیل خود را وارد کنید"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <label>رمزعبور</label>
          <div className="input-group">
            <input
              placeholder="رمزعبور را وارد کنید"
              type="password"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "password"
              )}`}
              name="password"
              {...formik.getFieldProps("password")}
            />
            <span className="input-group-text showPass">
              <img src={eysIcon} alt="eys icon" />
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <Link
          to="/auth/forgot-password"
          // className="text-dark-50 text-hover-primary my-3 mr-2"
          className="forget-pass"
          // id="kt_login_forgot"
        >
          {/* <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" /> */}
          رمزعبور را فراموش کرده ام
        </Link>
        <br />
        <br />
        <div className="d-flex">
          <Checkbox id="remember-me" />
          <label className="remember-me" htmlFor="remember-me">
            مرا به خاطر بسپار
          </label>
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>ورود</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
          <button
            type="button"
            className={`btn font-weight-bold px-9 py-4 my-3 login-with-google`}
          >
            <img src={googleLogo} alt="google logo" />
            <span>ورود با گوگل</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
      <div className="login-bottom">
        <ul>
          <li className="text-muted">
            <a href="/contact">ارتباط با ما</a>
          </li>
          <li className="text-muted">
            <a href="/plans">پلن ها</a>
          </li>
          <li className="text-muted">
            <a href="/rules">قوانین</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
