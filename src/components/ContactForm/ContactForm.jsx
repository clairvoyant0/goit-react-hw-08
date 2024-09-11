import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

import css from './ContactForm.module.css';

const fieldValues = {
  username: '',
  number: '',
};

const ContactSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  number: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const name = values.username;
    const number = values.number;
    
    const userProfile = {
      name,
      number,
    };
      // Відправка запиту
      const thunk = addContact(userProfile);
      dispatch(thunk);
      
      actions.resetForm();
    };
  
  return (
    <Formik
      initialValues={fieldValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.contactForm}>
        <label className={css.label}>
          <span className={css.labelName}>Name</span>
          <Field
            name="username"
            type="text"
            placeholder="Enter name"
            className={css.field}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.error}
          />
        </label>

        <label className={css.label}>
          <span className={css.labelName}>Phone</span>
          <Field
            name="number"
            type="tel"
            placeholder="Enter phone"
            className={css.field}
          />
          <ErrorMessage name="number" component="span" className={css.error} />
        </label>

        <button type="submit" className={css.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;