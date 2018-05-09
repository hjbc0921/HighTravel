import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Button = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
  background: #dce3ef
  height: 20px;
  text-align: center;
  verical-align: middle;
  line-height: 20px;
  padding: 5px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
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
