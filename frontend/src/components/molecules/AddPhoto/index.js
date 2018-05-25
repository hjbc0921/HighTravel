import React,{PropTypes} from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from "../../../components/atoms/Button"
import './../../item.css'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const AddPhoto = ({onAddPhoto}) => {
  let text;
  let state = {selectedFile: null};

  const fileChangedHandler = (event) => {
   state.selectedFile = event.target.files[0];
 //  var image =URL.createObjectURL(state.selectedFile);
 //  document.write("<img src='" + image + "'>"); 
   }
  const onAddPhotoBtn = () => {
    if(state.selectedFile = null)
     throw "select image file";
    else
    onAddPhoto(state.selectedFile,text);
  } 
  return (
  <div className="photo">
     <div>Imagefile: <input type="file" onChange={fileChangedHandler}/></div>
     <div>한줄 메모 : <input required ref={node =>{text = node;}} /></div>
     <Button onClick={onAddPhotoBtn}>Upload!</Button>
  </div>
  )

}
AddPhoto.propTypes = {
  state : PropTypes.arrayOf(PropTypes.shape({
  SelectedFile:PropTypes.string.isRequired
  })),
  text : PropTypes.string.isRequired
}

export default AddPhoto
