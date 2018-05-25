import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import $ from 'jquery'
import 'fullcalendar'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const Calendar2 = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      {children}
    </Wrapper>
  )
}

Calendar2.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Calendar2
