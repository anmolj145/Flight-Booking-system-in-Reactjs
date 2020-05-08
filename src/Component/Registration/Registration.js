import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Registration.css';
import registration from '../../Service/service'

class Registration extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    gender: '',
                    mobile: '',
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required')
                        .test(
                            "firstName",
                            "First Name can contain only alphabets",
                            val => {
                                let regExp = new RegExp(
                                    "^[A-Za-z]+$"
                                );
                                return regExp.test(val);
                            }
                        ),
                    lastName: Yup.string()
                        .required('Last Name is required')
                        .test(
                            "lastName",
                            "Last Name can contain only alphabets",
                            val => {
                                let regExp = new RegExp(
                                    "^[A-Za-z]+$"
                                );
                                return regExp.test(val);
                            }
                        ),
                    gender: Yup.string().required("Gender is required"),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(8, 'Password must be at least 8 characters')
                        .required('Password is required')
                        .test(
                            "password",
                            " Password must contain one capital letter, one small letter, one number and one special character. ",
                            val => {
                                let regExp = new RegExp(
                                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                                );
                                return regExp.test(val);
                            }
                        ),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required'),
                    mobile: Yup.string().required("Mobile is required")
                        .test(
                            "mobile",
                            "Mobile can contain only 10 numbers starting with 7,8 or 9 ",
                            val => {
                                let regExp = new RegExp(
                                    "^[789][0-9]{9}$"
                                );
                                return regExp.test(val);
                            }
                        )
                })}

                onSubmit={fields => {
                    registration(fields);
                }
                }

                render={() => (
                    <div className="form-r">
                        <Form>
                            <div className="form-group-r">
                                <label className="lab" htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group-r">
                                <label className="lab" htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group-r">
                                <label className="lab" htmlFor="email">Email </label>
                                <Field name="email" type="text" />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-r">
                                <label className="lab" htmlFor="mobile">Mobile </label>
                                <Field name="mobile" type="text" />
                                <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-r">
                                <label className="lab" htmlFor="gender">Gender  </label>
                                <Field type="radio" name="gender" value={'male'} />
                                <label className="rad" htmlFor="male">Male</label>
                                <Field type="radio" name="gender" value={'female'} />
                                <label className="rad" htmlFor="female">Female </label>
                                <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-r">
                                <label className="lab" htmlFor="password">Password</label>
                                <Field name="password" type="password" autoComplete="off" />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group-r">
                                <label className="lab" htmlFor="confirmPassword">Confirm Password</label>
                                <Field name="confirmPassword" type="password" autoComplete="off" />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button className="btn" type="submit">Register</button>
                                <button className="btn" type="reset" >Reset</button>
                            </div>
                        </Form>
                    </div>
                )}
            />
        )
    }
}
export { Registration };