// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Unknown = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    var className = 'status-icon status-icon-unknown';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" role="img" aria-labelledby="title-icon-unknown" version="1.1">
        <title id="title-icon-unknown">{this.getGrommetIntlMessage('Unknown')}</title>
        <g className={"status-icon__base"}>
          <path role="presentation" d="M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 L12,2 Z M12,0 C5.4,0 0,5.4 0,12 C0,18.6 5.4,24 12,24 C18.6,24 24,18.6 24,12 C24,5.4 18.6,0 12,0 L12,0 L12,0 Z" stroke="none"></path>
        </g>
        <g className={"status-icon__detail"}>
          <path role="presentation" d="M9,10.4 C9,8.8 10.4,7.6 12,7.6 C13.6,7.6 14.9,9 15,10.4 C15,11.7 14.1,12.7 12.9,13.1 C12.4,13.2 12,13.7 12,14.2 L12,15.5" fill="none" strokeWidth="2"></path>
          <circle role="presentation" stroke="none" cx="12" cy="17.6" r="1"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = Unknown;
