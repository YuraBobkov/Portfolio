import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { updateBook } from '../actions/actions';

import Input from '../components/EditInput';
import Textarea from '../components/EditTextarea';

class EditForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, reset, activeBook } = this.props;
    const submit = (values) => {
      this.props.updateBook({ values, activeBook });
      reset();
    };
    return (
      <div className="container">
        <form onSubmit={handleSubmit(submit)} >
          <Field
            name="name"
            type="text"
            label="Name"
            component={Input}
          />
          <Field
            name="author"
            type="text"
            label="Author"
            component={Input}
          />
          <Field
            name="genre"
            type="text"
            label="Genre"
            component={Input}
          />
          <Field
            name="description"
            type="textarea"
            label="Description"
            component={Textarea}
          />
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Save</button>
          <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">Clear Values</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeBook: state.auth.activeBook,
  };
}

export default connect(mapStateToProps, { updateBook })(reduxForm({
  form: 'EditForm',
})(EditForm));
