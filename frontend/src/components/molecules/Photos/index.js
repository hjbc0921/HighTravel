import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Gallery from 'react-photo-gallery';

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
                     height:5
                    }
                   )
    }
    console.log(Photo)
    if(folderShowed!='')
    PhotoSet.push({folder:folderShowed,
                   photos:Photo}
                  );
    folderShowed ='';
    Photo=[];
   }
   console.log(PhotoSet)
   
   return(
   <div>
      {onPhotoConfirm}
       {PhotoSet.map(data =>
      <div>
      <div> {data.folder} </div>
        <Gallery photos={data.photos}/>
      </div>  )
      }
     
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
