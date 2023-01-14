import React, { Component } from "react";
import Joi from "joi";

import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const errors = {};
    const { data } = this.state;

    const schemaJoiObj = Joi.object(this.schema);
    const result = schemaJoiObj.validate(data, { abortEarly: false });

    if (!result.error) return null;

    result.error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const schema = { [name]: this.schema[name] };
    //construct the schema Joi Object for validation
    const schemaJoiObj = Joi.object(schema);
    //construct the object for the validation of current property
    const obj = { [name]: value };
    //Validate the current property
    const { error } = schemaJoiObj.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //validate
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderInputField = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
  renderSelectField = (name, label, textProperty, items) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        items={items}
        textProperty={textProperty}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary mt-2">
        {label}
      </button>
    );
  };
}

export default Form;
