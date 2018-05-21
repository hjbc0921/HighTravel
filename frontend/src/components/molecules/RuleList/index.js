import React from 'react'
import Button from '../../../components/atoms/Button'
import Rule from '../../../components/atoms/Rule'

export class RuleList extends React.Component {
  render() {
    return (
      <div className="rulelistwrapper">
        <h1>Rules for our Happy Trip</h1>
        {this.props.rules.map(rule => 
          <div className="ruleelement" key={rule.id}>
            <Rule rule={rule} />
            <Button onClick={ event => this.props.onDeleteRule(rule.id) }>Delete</Button>
          </div>)}
      </div>
    );
    }
}
