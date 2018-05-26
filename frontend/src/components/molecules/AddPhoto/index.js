import React,{PropTypes} from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
//import Button from "../../../components/atoms/Button"
import './../../item.css'
import ReactDOM from 'react-dom';
import {Upload,message,Button,Icon,Modal} from 'antd';

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`


export const AddPhoto = ({onAddPhoto}) =>{
  let state = {
             previewVisible: false,
             previewImage: '',
             selectedFile:[{
                     uid:-1,
                     name:'xxx.png',
                     status:'done',
                     url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                   }],                             

};
 const handleCancel = () =>{ state.previewVisible = false;}
 const handlePreview = (file) => { 
                             state.previewImage=file.url||file.thumbUrl;
                             state.previewVisible = true;
}
 const fileChangedHandler = ({fileList})=> {
  state.selectedFile = fileList;
  }
 
 const onAddPhotoBtn = () => {
  if(state.selectedFile == null)
    throw "select image file";
  else
    onAddPhoto(state.selectedFile);
  }
     const uploadButton = (
          <div>
           <Icon type = "plus" />
           <div className = "ant-upload-text">Upload</div>
          </div> 
     );
  return (
  <div className="photo">
     <Upload
     listType = "picture-card"
     fileList = {state.selectedFile}
     onPreview = {handlePreview}
     onChange={fileChangedHandler}
     >
  
   {state.selectedFile.length >=20 ? null : uploadButton}
    
   </Upload>

  <Modal visible={state.previewVisible} footer={null} onCancel={handleCancel}>
   <img alt ="example" style ={{ width: '100%'}} src={state.previewImage}/>
  </Modal>
  <Button onClick={onAddPhotoBtn}> 올리기 </Button>
    </div>
  );
}

AddPhoto.propTypes = {
   state:PropTypes.arrayOf(PropTypes.shape({
   previewVisible:PropTypes.bool.isRequired,
   previewImage: PropTypes.string.isRequired,
   selectedFile: PropTypes.arrayOf(PropTypes.shape({
   uid:PropTypes.number.isRequired,
   name:PropTypes.string.isRequired,     
   status:PropTypes.string.isRequired,
   url:PropTypes.string.isRequired
   }))
   }))
}

export default AddPhoto
