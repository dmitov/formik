import * as React from 'react';
import { FormikContextType } from './types';
import { getIn, isFunction } from './utils';
import { connect } from './connect';

export interface WarningMessageProps {
  name: string;
  className?: string;
  component?: string | React.ComponentType;
  children?: (warningMessage: string) => React.ReactNode;
  render?: (warningMessage: string) => React.ReactNode;
}

class WarningMessageImpl extends React.Component<
  WarningMessageProps & { formik: FormikContextType<any> }
> {
  shouldComponentUpdate(
    props: WarningMessageProps & { formik: FormikContextType<any> }
  ) {
    if (
      getIn(this.props.formik.warnings, this.props.name) !==
        getIn(props.formik.warnings, this.props.name) ||
      getIn(this.props.formik.touched, this.props.name) !==
        getIn(props.formik.touched, this.props.name) ||
      Object.keys(this.props).length !== Object.keys(props).length
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let { component, formik, render, children, name, ...rest } = this.props;

    const touch = getIn(formik.touched, name);
    const warning = getIn(formik.warnings, name);

    return !!touch && !!warning
      ? render
        ? isFunction(render)
          ? render(warning)
          : null
        : children
        ? isFunction(children)
          ? children(warning)
          : null
        : component
        ? React.createElement(component, rest as any, warning)
        : warning
      : null;
  }
}

export const WarningMessage = connect<
  WarningMessageProps,
  WarningMessageProps & { formik: FormikContextType<any> }
>(WarningMessageImpl);
