import "./EditProfile.scss";
import { Form, Formik } from "formik";
import { ToastSuccess } from "../../Utils/Toast/ToastMsg";
import { passwordSchema } from "./PasswordSchema";
import { ChangePassword } from "../../services/ChangePasswork";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [OldNewPass, setOldNewPass] = useState(false);
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();
  // save api
  const submitAPI = async (values) => {
    if (OldNewPass) {
      return;
    }
    const obj = {
      email: email,
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
    };
    const result = await ChangePassword(obj, token);
    if (result?.status === 200) {
      sessionStorage.setItem("token", result?.data?.auth_token);
      navigate("/status");
      ToastSuccess(result?.message);
    }
  };
  // validate the old password
  const validateOldNewPass = (oldPass, newPass) => {
    if (oldPass === "" && newPass === "") {
      setOldNewPass(false);
      return false;
    } else if (oldPass === newPass) {
      setOldNewPass(true);
      return true;
    } else {
      setOldNewPass(false);
      return false;
    }
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="editProfileSection">
                <Formik
                  initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={passwordSchema}
                  onSubmit={(values, { resetForm }) => {
                    submitAPI(values, resetForm);
                  }}
                >
                  {({ errors, touched, handleChange, values, resetForm }) => (
                    <Form>
                      <div className="editForm">
                        <div className="editProfileDiv">
                          <div className="fields">
                            <label>Old Password</label>
                            <br />
                            <input
                              id="oldPassword"
                              type="password"
                              name="oldPassword"
                              onChange={handleChange}
                              value={values.oldPassword}
                            />
                            {errors.oldPassword && touched.oldPassword ? (
                              <div className="errorMsgs">
                                {errors.oldPassword}
                              </div>
                            ) : null}
                          </div>
                          <div className="fields">
                            <label>New Password</label>
                            <br />
                            <input
                              id="newPassword"
                              type="password"
                              name="newPassword"
                              onChange={handleChange}
                              value={values?.newPassword}
                            />
                            {validateOldNewPass(
                              values?.oldPassword,
                              values?.newPassword
                            ) ? (
                              <div className="errorMsgs">
                                Old Password or New password should not be same
                              </div>
                            ) : (errors.newPassword && touched.newPassword) ? (
                              <div className="errorMsgs">
                                {errors.newPassword}
                              </div>
                            ) : null}
                          </div>
                          <div className="fields">
                            <label>Confirm Password</label>
                            <br />
                            <input
                              id="confirmPassword"
                              type="password"
                              name="confirmPassword"
                              onChange={handleChange}
                              value={values.confirmPassword}
                            />
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <div className="errorMsgs">
                                {errors.confirmPassword}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="editProfileBtn editProfieBtnSec">
                          <button className="editBtn" type="submit">
                            Submit
                          </button>
                        </div>
                      </div>
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

export default EditProfile;
