import React from 'react'
import Rule from '../../../components/atoms/Rule'
import { AddForm } from '../../atoms/AddForm'
import { Button } from 'antd'

export class RuleList extends React.Component {
  render() {
    return (
      <div className="rulelistwrapper">
        <h1>Rules for our Happy Trip</h1>
        {this.props.rules.map(rule => 
          <div className="ruleelement" key={rule.id}>
            <Rule rule={rule} />
            <Button id="button3" onClick={ event => this.props.onDeleteRule(rule.id) }>Delete</Button>
          </div>)}
        <AddForm onAddForm={this.props.onPostRule} icon={'profile'} placeholder={'Contents for new Rule'} msg={'Please input content of new rule!'} btn={'Add Rule'}/>
      </div>
    );
    }
}

export default RuleList
