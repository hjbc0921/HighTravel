import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Gallery from 'react-photo-gallery';

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`
export const Diaries = (diary_list) => {
     console.log(diary_list.diary_list);  
     var newArray= [];
     var date;
     var contents;
     var Photo=[];
     var dateShowed='';
     var DiarySet=[];
   for(var l=0; l<diary_list.length;l++){
        DiarySet.push({date:diary_list[i].date,
		contents: diary_list[i].contents})
   }
   console.log(DiarySet)
   return(
   <div>
       {DiarySet.map(data =>
      <div>
      <div> {data.date} </div>
	  <div> {data.contents} </div>
        //<Gallery photos={data.photos}
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
