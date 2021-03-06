// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');

var defaultState = {
  item: undefined,
  type: undefined
};

var TodoAddTaskForm = React.createClass({
  setInitialState: function () {
    return defaultState;
  },

  _onSubmit: function () {
    if (this.state.item) {
      this.props.onSubmit({
        item: this.state.item,
        type: this.state.type || 'ok'
      });
    }
  },

  _onItemChange: function (event) {
    this.setState({item: event.target.value});
  },

  _onTypeChange: function (event) {
    this.setState({type: event.target.value});
  },

  render: function() {
    return (
      <Layer onClose={this.props.onClose} closer={true}>
        <Form>
          <header><h1>Add Task</h1></header>
          <FormFields>
            <fieldset>
              <FormField label="Task" htmlFor="taskInput" help="what's to be done?">
                <input id="taskInput" name="task" type="text" onChange={this._onItemChange} />
              </FormField>
              <FormField label="Type" htmlFor="typeInput">
                <select id="typeInput" name="type" onChange={this._onTypeChange}>
                  <option>ok</option>
                  <option>warning</option>
                  <option>error</option>
                </select>
              </FormField>
            </fieldset>
          </FormFields>
        </Form>
        <Footer>
          <Menu direction="right">
            <Button label="OK" primary={true} onClick={this._onSubmit} />
            <Button label="Cancel" onClick={this.props.onClose} />
          </Menu>
        </Footer>
      </Layer>
    );
  }
});

module.exports = TodoAddTaskForm;
