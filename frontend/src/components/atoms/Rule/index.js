import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Styledli = styled.li`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

const Rule = ({ contents, tripID }) => (
    <Styledli>{ contents }</Styledli>
)

Rule.propTypes = {
  contents: PropTypes.string.isRequired,
  tripID: PropTypes.number.isRequired,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Rule.defaultProps = {
  palette: 'grayscale',
}

export default Rule
