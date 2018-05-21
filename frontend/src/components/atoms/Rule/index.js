import React from 'react'

class Rule extends React.Component {
  render() {
  return (
    <div className="rule">{ this.props.rule.contents }</div>
  );
  }
}

export default Rule
