import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const AddFolderButton = styled.button`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
  background-color: white;
  border: none;
`

AddFolderButton.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

AddFolderButton.defaultProps = {
  palette: 'grayscale',
}

export default AddFolderButton
