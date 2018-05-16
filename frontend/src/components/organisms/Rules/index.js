import React from 'react'
import AddRule from '../../../containers/AddRule'
import RuleList from '../../../containers/RuleList'
import Head from "../../../components/molecules/Head";

const Rules = () => {
  return (
    <div>
        <RuleList/>
        <AddRule/>
    </div>
  )
}

export default Rules
