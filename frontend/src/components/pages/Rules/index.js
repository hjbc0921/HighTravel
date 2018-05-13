import React from 'react'
import AddRule from '../../../containers/AddRule'
import RuleList from '../../../containers/RuleList'
import Header from "../../../components/molecules/Header";

const Rules = () => {
  return (
    <div>
        <Header/>
        <RuleList/>
        <AddRule/>
    </div>
  )
}

export default Rules
