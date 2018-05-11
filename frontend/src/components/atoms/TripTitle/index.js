import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
const StyledButton = styled.button`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
  background: #dce3ef;
  text-align: center;
  verical-align: middle;
  padding: 5px 10px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 2.5px;
  top: 50%;
  trasnform: translateY(-50%);
  border-radius: 20px;
`

const TripTitle = ({title}) => (
   <StyledButton>{ title }</StyledButton>
);

TripTitle.propTypes = {
  title: PropTypes.string.isRequired,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

TripTitle.defaultProps = {
  palette: 'grayscale',
}

export default TripTitle
