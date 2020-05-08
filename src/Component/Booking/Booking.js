import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Booking.css'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import booking from '../../Service/service'

class Booking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showrd: false,
            tod: new Date(),
            td: "",
            rd: ""
        }
    }

    toggleTripOne = () => {
        this.setState({ showrd: false })
    }

    toggleTripTwo = () => {
        this.setState({ showrd: true })
    }

    render() {

        return (
            <Formik
                initialValues={{
                    tripType: '',
                    fromPlace: '',
                    toPlace: '',
                    travelDate: '',
                    returnDate: '',
                    adultsCount: 0,
                    childrenCount: 0,
                    infantsCount: 0,
                    travelClass: '',
                }}

                validationSchema={Yup.object().shape({

                    tripType: Yup.string()
                        .required('Select any one'),

                    fromPlace: Yup.string().required('From is required').test(
                        "fromPlace",
                        "From can contain only alphabets",
                        val => {
                            let regExp = new RegExp(
                                "^[A-Za-z]+$"
                            );
                            return regExp.test(val);
                        }
                    ),

                    toPlace: Yup.string()
                        .required('To is required')
                        .test(
                            "toPlace",
                            "To can contain only alphabets",
                            val => {
                                let regExp = new RegExp(
                                    "^[A-Za-z]+$"
                                );
                                return regExp.test(val);
                            }
                        ),

                    travelDate: Yup.date()
                        .required('Travel date is required'),

                    returnDate: Yup.date()
                        .when('tripType', {
                            is: "two-way",
                            then: Yup.date().required('Return date is Required'),
                        }),

                    adultsCount: Yup.number().required().min(1, "Minimun 1 adult needed").max(10),

                    childrenCount: Yup.number().min(0).max(10),

                    infantsCount: Yup.number().min(0).max(10),

                    travelClass: Yup.string().required('Travel Class is required')
                })}

                onSubmit={fields => {

                    if (localStorage.getItem("token") !== null) {
                        booking(fields);
                        this.props.history.push("/showbooking")
                    }
                    else {
                        this.props.history.push("/login")
                    }
                }
                }

                render={({ setFieldValue }) => (

                    < div className="form-b">
                        <Form>
                            <div className="form-group-b" >
                                <Field type="radio" name="tripType" value={'one-way'} onClick={this.toggleTripOne} />
                                <label className="rad" htmlFor="one-way">Oneway </label>
                                <Field type="radio" name="tripType" value={'two-way'} onClick={this.toggleTripTwo} />
                                <label className="rad" htmlFor="two-way">Twoway </label>
                                <ErrorMessage name="tripType" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group-b">
                                <label className="lab" htmlFor="fromPlace">From</label>
                                <Field name="fromPlace" type="text" />
                                <ErrorMessage name="fromPlace" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group-b">
                                <label className="lab" htmlFor="toPlace">To</label>
                                <Field name="toPlace" type="text" />
                                <ErrorMessage name="toPlace" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-b">
                                <label className="lab" htmlFor="travelDate">Travel Date</label>
                                <DayPickerInput
                                    value=""
                                    name="travelDate"
                                    format="DD/MM/YYYY"
                                    placeholder="DD/MM/YYYY"
                                    dayPickerProps={{
                                        disabledDays: [
                                            { before: new Date() },
                                            { after: new Date(this.state.rd) }
                                        ]
                                    }}
                                    onDayChange={e => {
                                        setFieldValue('travelDate', e.toISOString())
                                        this.setState({ td: e })
                                    }}
                                />
                                <ErrorMessage name="travelDate" component="div" className="invalid-feedback" />
                            </div>
                            {this.state.showrd &&
                                <div className="form-group-b">
                                    <label className="lab" htmlFor="returnDate">Return Date </label>
                                    <DayPickerInput
                                        value=""
                                        name="returnDate"
                                        format="DD/MM/YYYY"
                                        placeholder="DD/MM/YYYY"
                                        dayPickerProps={{
                                            disabledDays:
                                                [
                                                    { before: new Date() },
                                                    { before: new Date(this.state.td) }
                                                ]
                                        }}
                                        onDayChange={e => {
                                            setFieldValue('returnDate', e.toISOString())
                                            this.setState({ rd: e })
                                        }}
                                    />
                                    <ErrorMessage name="returnDate" component="div" className="invalid-feedback" />
                                </div>}

                            <div className="form-group-b">
                                <label className="lab" htmlFor="adultsCount">Adult  </label>
                                <Field name="adultsCount" type="number" />
                                <ErrorMessage name="adultsCount" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-b">
                                <label className="lab" htmlFor="childrenCount">Children  </label>
                                <Field name="childrenCount" type="number" />
                                <ErrorMessage name="childrenCount" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-b">
                                <label className="lab" htmlFor="infantsCount">Infant  </label>
                                <Field name="infantsCount" type="number" />
                                <ErrorMessage name="infantsCount" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-b">
                                <label className="lab" htmlFor="travelClass">Travel class  </label>
                                <Field component="select" name="travelClass"  >
                                    <option label="Travel class " />
                                    <option value="economy" label="Economy" />
                                    <option value="business" label="Business" />
                                </Field>
                                <ErrorMessage name="travelClass" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group-b">
                                <button className="btn" type="submit" >Book</button>
                                <button className="btn" type="reset" >Reset</button>
                            </div>
                        </Form>
                    </div>
                )
                }
            />
        )
    }
}

export { Booking };