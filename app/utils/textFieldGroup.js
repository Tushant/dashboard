/**
 * Created by Edge on 5/17/2017.
 */
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  label,
  type,
  name,
  value,
  defaultValue,
  error,
  validationState,
  placeholder,
  onChange,
  onBlur,
  disabled,
  ...props
}) => (
  <div className={classnames("form-group", { "has-error": error })}>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className="form-control"
      {...props}
    />
    {error && <span className="help-block alert alert-danger">{error}</span>}
  </div>
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
