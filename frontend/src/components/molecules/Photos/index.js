import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Gallery from 'react-photo-gallery';
import SelectedImage from "../SelectPhoto/SelectedImage";
import {Button} from 'antd'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const PhotoList = (photo_list) => {
     console.log("PHOTO#############",photo_list);  
  const onPhotoConfirm = () =>{
  }
  
  
  


 
     var newArray= [];
     var tempArray = [];
     var usedArray = [];
     var date;
     var folder;
     var Photo=[];
     var folderShowed='';
     var PhotoSet=[];
     if(photo_list == {})
     return(
      <div></div>
     ) 
     for(var k=0; k<photo_list.photo_list.length;k++){
        usedArray[k] = 0;
     }
     console.log(usedArray)
     for(var i=0; i<photo_list.photo_list.length;i++){
        if ( folder !=undefined && usedArray[i] == 0){
          folder = photo_list.photo_list[i].folder.name;
          tempArray.push(photo_list.photo_list[i]);
          usedArray[i] = 1;
        }  
        else if(  folder != photo_list.photo_list[i].folder.name && usedArray[i] == 0){
          folder = photo_list.photo_list[i].folder.name;
          tempArray.push(photo_list.photo_list[i]);
          usedArray[i] = 1;
       }
       for (var j=i+1; j<photo_list.photo_list.length;j++){
          if( folder == photo_list.photo_list[j].folder.name && usedArray[j]==0){
               tempArray.push(photo_list.photo_list[j]); 
               usedArray[j] = 1;
          }   
       }
     if(tempArray!=[])
        newArray.push(tempArray); 
        tempArray=[];
     }
     console.log(newArray)
   for(var l=0; l< newArray.length;l++){
    for ( var m=0; m< newArray[l].length;m++){
         folderShowed = newArray[l][m].folder.name;
         Photo.push({src:newArray[l][m].image.replace(":3000",":8000"),
                     sizes: ['(min-width: 50px) 20vw,(min-width: 50px) 20vw,40vw'],
                     width:5,
                     height:5,
                     selected:false,
                     folderId:l,
                     Id:newArray[l][m].id
                    }
                   )
    }
    console.log(Photo)
    if(folderShowed!='')
    PhotoSet.push({folder:folderShowed,
                   photos:Photo,
                   id:l
                  }
                  );
    folderShowed ='';
    Photo=[];
   }
   console.log(PhotoSet);
  const selectPhotos = (event, obj) => {
      for(var i=0; i<PhotoSet.length;i++){
     if(PhotoSet[i].id == obj.photo.folderId){
     PhotoSet[i].photos[obj.index].selected = !PhotoSet[i].photos[obj.index].selected; 
    console.log(PhotoSet[i].photos[obj.index]);
    }
   } 
  }
  const downloadAll = () => {
   var urls = [];
   for(var j=0; j<PhotoSet.length;j++){
    for(var m=0; m<PhotoSet[j].photos.length; m++){
      if(PhotoSet[j].photos[m].selected == true){
      urls.push(PhotoSet[j].photos[m].src);
      }
    }
   }
   var link = document.createElement('a');
   link.setAttribute('download', null);
   link.style.display = 'none';
   document.body.appendChild(link);
   console.log(urls);
   for (var i=0; i<urls.length; i++){
     link.setAttribute('href',urls[i]);
     link.click();
   }
 
   document.body.removeChild(link);
 

  }
  const deletePhotos = () =>{
    console.log("delete photos in molecule")
    var photoIDs= []
    for (var j=0;j<PhotoSet.length;j++){
      for (var m=0;m<PhotoSet[j].photos.length;m++){
        if(PhotoSet[j].photos[m].selected == true ){
           photoIDs.push(PhotoSet[j].photos[m].Id);
        }
      }
    }
   console.log(photoIDs);
   photo_list.onDeletePhotos(photoIDs);  
  }   
  
   return(
   <div>
      {onPhotoConfirm}
       {PhotoSet.map(data =>
      <div>
      <h1> {data.folder} </h1>
        <Gallery photos={data.photos}
                 onClick={selectPhotos}
                 ImageComponent={SelectedImage}
                  />
      </div>  )
      }
    <div></div>
     <Button type="primary" onClick={downloadAll}> Download </Button>
     <Button type="primary" onClick={deletePhotos}> Delete </Button>
    </div>
   )
 
}

PhotoList.propTypes = {
  Photo: PropTypes.arrayOf(PropTypes.shape({
  src:PropTypes.string.isRequired,
  width:PropTypes.number.isRequired,
  height:PropTypes.number.isRequired
 }))
}

export default PhotoList
