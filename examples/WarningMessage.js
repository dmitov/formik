import React from 'react';
import { Formik, Field, Form, WarningMessage } from 'formik';
import * as Yup from 'yup';
import { Debug } from './Debug';

// While you can use any validation library (or write you own), Formik
// comes with special support for Yup by @jquense. It has a builder API like
// React PropTypes / Hapi.js's Joi. You can define these inline or, you may want
// to keep them separate so you can reuse schemas (e.g. address) across your application.
const SignupWarningSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Maybe too short!'),
  lastName: Yup.string()
    .min(3, 'Maybe too short!'),
  email: Yup.string()
    .max(50, 'Maybe too long!'),
});

// <WarningMessage /> will ONLY render when a field has an error and has been touched.
const SignUp = () => (
  <div>
    <h1>Sign up</h1>
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
      }}
      warningSchema={SignupWarningSchema}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={({ errors, touched }) => (
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" placeholder="Jane" type="text" />
          <WarningMessage
            name="firstName"
            component="div"
            className="field-warning"
          />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" placeholder="Doe" type="text" />
          <WarningMessage name="lastName">
            {(msg /** this is the same as the above */) => (
              <div className="field-warning">{msg}</div>
            )}
          </WarningMessage>

          <label htmlFor="email">Email</label>
          <Field name="email" placeholder="jane@acme.com" type="email" />
          {/* This will render a string */}
          <WarningMessage name="email" className="field-warning" />

          <button type="submit">Submit</button>
          <Debug />
        </Form>
      )}
    />
  </div>
);

export default SignUp;
