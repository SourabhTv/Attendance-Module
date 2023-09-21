import axios from "axios";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { ToastFailure, ToastSuccess } from "../../Utils/Toast/ToastMsg";
import * as Yup from "yup";
import './Login.scss'
const Login = ({ setIsUser }) => {
  const navigate = useNavigate();
  // login validation
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password is too short - should be 6 chars minimum."),
  });
  // Submit login form
  const handleLogin = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/api/login`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response?.status === 200) {
          ToastSuccess("Login Successfully.");
          setIsUser(true);
          sessionStorage.setItem("token", response?.data?.data?.auth_token);
          sessionStorage?.setItem("email",response?.data?.data?.email)
          sessionStorage.setItem("isLogin", true);
          navigate(`/status`);
        }
         else {
          ToastFailure(
            "Something went wrong, Please check credentials and try again."
          );
        }
      }).catch((error)=>{
        ToastFailure(
            "Invalid Credential."
          );
      })
  };
  return (
    <>
      <Header />
      <div className="container main-login">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Login</h4>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={LoginSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleLogin(values);
                  }}
                >
                  {({
                    errors,
                    touched,
                    handleChange,
                    values,
                    setFieldValue,
                    dirty,
                    isValid,
                    resetForm,
                  }) => (
                    <Form>
                      <div className="form-group mb-2">
                        <label htmlFor="username">Username:</label>
                        <input
                          type="text"
                          id="username"
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          className="form-control"
                        />
                        {errors.email && touched.email ? (
                          <div className="errorMsgs">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          className="form-control"
                        />
                        {errors.password && touched.password ? (
                          <div className="errorMsgs">{errors.password}</div>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
