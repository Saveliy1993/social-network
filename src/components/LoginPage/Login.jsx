import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as yup from 'yup';
import { login } from '../../redux/AuthReducer';
import { ifAuthComplete } from '../hoc/ifAuthComplete';


const LoginForm = (props) => {
    const validationSchema = yup.object({
        email: yup.string().email('Enter correct email').required('Email is required'),
        password: yup.string().typeError('Need string').required('Password is required')
    })
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
            }}
            validateOnBlur
            onSubmit={(values) => { props.login(values.email, values.password, values.rememberMe) }}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
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
                    <button
                        disabled={!isValid && !dirty}
                        onClick={handleSubmit}
                        type={'submit'}
                    >Enter</button>

                </Form>
            )}
        </Formik >
    )
}



const LoginPage = (props) => {
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm {...props} />
        </div>
    )
}

export default compose(connect(null, { login }),
    ifAuthComplete
)(LoginPage)