import { Formik, Field, Form } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import * as yup from 'yup';
import { login } from '../../redux/AuthReducer';
import { ifAuthComplete } from '../hoc/ifAuthComplete';
import React from 'react'
import { AppStateType } from '../../redux/reduxStore';

type LoginType = MapStatePropsType & MapDispatchPropsType
type ValuesType = { email: string, password: string, rememberMe: boolean, captcha: string }
type OwnPropsType = {}

const LoginForm: React.FC<LoginType> = ({ login, captchaUrl }) => {
    const validationSchema = yup.object({
        email: yup.string().email('Enter correct email').required('Email is required'),
        password: yup.string().typeError('Need string').required('Password is required')
    })
    const submit = (values: ValuesType) => { login(values.email, values.password, values.rememberMe, values.captcha) }
    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
            validateOnBlur
            onSubmit={submit}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid,  dirty }) => (
                <Form>
                    <p>
                        <label htmlFor={"email"}>Email:</label><br />
                        <Field
                            type={"text"}
                            name={'email'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                    </p>
                    {touched.email && errors.email && <p> {errors.email}</p>}
                    <p>
                        <label htmlFor={"password"}>Password:</label><br />
                        <Field
                            type={'password'}
                            name={'password'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                    </p>
                    {touched.password && errors.password && <p> {errors.password}</p>}
                    <div>
                        <Field name='rememberMe' type="checkbox" />
                        <span>
                            remember me
                        </span>
                    </div>
                    {captchaUrl && <img src={captchaUrl} />}
                    {captchaUrl && <Field name='captcha' type='text' />}
                    <button
                        disabled={!isValid && !dirty}
                        type={'submit'}
                    >Enter</button>

                </Form>
            )}
        </Formik >
    )
}

type MapStatePropsType = {
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


const LoginPage: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm {...props} />
        </div>
    )
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return ({
        captchaUrl: state.auth.captchaUrl
    })
}

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { login }),
    ifAuthComplete
)(LoginPage)
