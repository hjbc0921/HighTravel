import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Gallery from 'react-photo-gallery';

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`
export const Diaries = (diary_list) => {			
   console.log(diary_list) 
     var newArray= [];
     var date;
     var contents;
     var dateShowed='';
     var DiarySet=[];
   if(diary_list.diary_list == null)
   return (
     <div></div>
   )
   for(var l=0; l<diary_list.diary_list.length;l++){
        var tempPhoto=[];
        for(var i=0; i<diary_list.diary_list[l].photos.length;i++){
          console.log("DIARY########",diary_list.diary_list[l].photos[i].image.replace(":3000",":8000"))
            tempPhoto.push({src:diary_list.diary_list[l].photos[i].image.replace(":3000",":8000"),
                        width:10,
                        height:10
                       });
        }
        DiarySet.push({date:diary_list.diary_list[l].date,
		contents: diary_list.diary_list[l].contents,
                photos:tempPhoto, id:l})
   }
   console.log(DiarySet)
   return(
   <div>
       {DiarySet.map(data =>
      <div key={data.id}>
      <div> {data.date} </div>
	  <div> {data.contents} </div>
         <Gallery photos={data.photos} />
        </div>  )
      }
    </div>
   )
 
}

Diaries.propTypes = {
  Photo: PropTypes.arrayOf(PropTypes.shape({
  src:PropTypes.string.isRequired,
  width:PropTypes.number.isRequired,
  height:PropTypes.number.isRequired
 }))
}

export default Diaries
