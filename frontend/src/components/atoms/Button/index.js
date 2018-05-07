import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Button = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
  background: #dce3ef
  width: 250px;
  height: 20px;
  position: relative;
  text-align: center;
  verical-align: middle;
  line-height: 20px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 2.5px;
  top: 50%;
  trasnform: translateY(-50%);
  border-radius: 20px;
`

Button.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Button.defaultProps = {
  palette: 'grayscale',
}

export default Button
