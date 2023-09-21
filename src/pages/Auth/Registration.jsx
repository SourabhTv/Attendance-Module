import "./Registration.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastFailure, ToastSuccess } from "../../Utils/Toast/ToastMsg";

const Registration = () => {
  const AddEventSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .matches(/^[a-zA-Z]+([ ]?[a-zA-Z]+)*$/, "Please enter valid first name")
      .required("Required"),
    lastName: Yup.string()
      .trim()
      .matches(/^[a-zA-Z]+([ ]?[a-zA-Z]+)*$/, "Please enter valid last name")
      .required("Required"),
    empId: Yup.string()
      .matches(
        /^[0-9]+$/,
        "Please enter valid id without any spaces, alphabets or special characters."
      )
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });
  // save api
  const submitAPI = async (values, resetForm) => {
    const obj = {
      first_name: values.firstName,
      last_name: values.lastName,
      employee_id: "TVE-" + values.empId,
      email: values.email,
      profile_image: "empty.png",
    };
    await axios
      .post(`${process.env.REACT_APP_API}/api/employee`, obj)
      .then((response) => {
        if (response.data.status === (200 || 201)) {
          const subjectName =
            obj.first_name + "_" + obj.last_name + "_" + obj.employee_id;
          addSubjectAPI(subjectName, resetForm);
          // resetForm();
        } else {
          ToastFailure("Something went wrong or user already exist.");
        }
      })
      .catch((error) => {
        ToastFailure("Something went wrong or user already exist.");
      });
  };
  // add subjects
  const addSubjectAPI = async (subjectName, resetForm) => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-api-key": "b1d9568b-ef8c-442a-bcc1-c9c67871f95a",
      },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_IMAGE_CAPTURE}/api/v1/recognition/subjects`,
        { subject: subjectName },
        config
      )
      .then((response) => {
        if (response?.status === 201) {
          ToastSuccess("Employee Added successfully.");
          resetForm();
        } else {
          ToastFailure("Something went wrong or user already exist.");
        }
      })
      .catch((error) => {
        ToastFailure("Something went wrong or user already exist.");
      });
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="registrationSection">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    empId: "",
                    email: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={AddEventSchema}
                  onSubmit={(values, { resetForm }) => {
                    submitAPI(values, resetForm);
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
                      <div className="registerForm">
                        <div className="registrationDiv">
                          <div className="fields">
                            <label>First Name</label>
                            <br />
                            <input
                              id="firstName"
                              type="text"
                              name="firstName"
                              onChange={handleChange}
                              value={values.firstName}
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="errorMsgs">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                          <div className="fields">
                            <label>Last Name</label>
                            <br />
                            <input
                              id="lastName"
                              type="text"
                              name="lastName"
                              onChange={handleChange}
                              value={values.lastName}
                            />
                            {errors.lastName && touched.lastName ? (
                              <div className="errorMsgs">{errors.lastName}</div>
                            ) : null}
                          </div>
                          <div className="fields">
                            <label>Employee ID </label>
                            <div className="tveDiv">
                              <p>TVE-</p>
                              <input
                                id="empId"
                                type="text"
                                name="empId"
                                onChange={handleChange}
                                value={values.empId}
                              />
                              {errors.empId && touched.empId ? (
                                <div className="errorMsgs">{errors.empId}</div>
                              ) : null}
                            </div>
                          </div>
                          <div className="fields">
                            <label>Email</label>
                            <br />
                            <p></p>
                            <input
                              id="email"
                              type="text"
                              name="email"
                              onChange={handleChange}
                              value={values.email}
                            />
                            {errors.email && touched.email ? (
                              <div className="errorMsgs">{errors.email}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="employeBtn registerBtnSec">
                          <button className="LogBtn" type="submit">
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

export default Registration;
