import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const AddFolderButton = styled.button`
  font-family: ${font('primary')};
  color: #484848;
  background-color: Transparent;
  margin-left: -10px;
  padding-right: 300px;
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
