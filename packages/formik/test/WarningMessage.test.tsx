import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, FormikProps, WarningMessage } from '../src';
import { noop } from './testHelpers';

interface TestFormValues {
  name: string;
  email: string;
}

const TestForm: React.SFC<any> = p => (
  <Formik
    onSubmit={noop}
    initialValues={{ name: 'jared', email: 'hello@reason.nyc' }}
    {...p}
  />
);

describe('<WarningMessage />', () => {
  const node = document.createElement('div');
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });
  it('renders with children as a function', async () => {
    let actual: any; /** WarningMessage ;) */
    let actualFProps: any;
    let message = 'Wrong';
    ReactDOM.render(
      <TestForm
        render={(fProps: FormikProps<TestFormValues>) => {
          actualFProps = fProps;
          return (
            <div>
              <WarningMessage name="email">
                {props => (actual = props) || <div>{props}</div>}
              </WarningMessage>
            </div>
          );
        }}
      />,
      node
    );

    actualFProps.setFieldWarning('email', message);
    // Only renders if Field has been visited.
    expect(actual).toEqual(undefined);
    actualFProps.setFieldTouched('email');
    // Renders after being visited with an error.
    expect(actual).toEqual(message);
  });
});
