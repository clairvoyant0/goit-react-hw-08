import * as Yup from 'yup';
import css from './LoginForm.module.css';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

const INITIAL_VALUES = {
  useremail: '',
  userpassword: '',
};

const LoginValidationSchema = Yup.object().shape({
  userpassword: Yup.string()
    .min(8, 'Password must contains min 8 char')
    .max(256, 'Too long')
    .required('Required'),
  useremail: Yup.string().email('Must be a valid email!').required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  
  
  const handleSubmit = (values, actions) => {
    // console.log(values);
    const userData = {
      email: values.useremail,
      password: values.userpassword,
    };

    dispatch(login(userData))
    actions.resetForm();
  };

  return (
    <main>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={LoginValidationSchema}
      >
        <Form className={css.loginForm}>
          <label className={css.label}>
            <span className={css.labelText}>Email</span>
            <Field
              type="text"
              name="useremail"
              placeholder="Enter your email"
              className={css.field}
            />
            <ErrorMessage
              name="useremail"
              component="span"
              className={css.error}
            />
          </label>
          <label className={css.label}>
            <span className={css.labelText}>Password</span>
            <Field
              type="password"
              name="userpassword"
              placeholder="Enter your password"
              className={css.field}
            />
            <ErrorMessage
              name="userpassword"
              component="span"
              className={css.error}
            />
          </label>

          <button type="submit" className={css.button}>
            Log In
          </button>
        </Form>
      </Formik>

      {error && <p>Password is not correct. Try again</p>}
    </main>
  );
};

export default LoginForm;