import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Gallery from 'react-photo-gallery';
import { Button } from 'antd'
import EditableAutoSize from '../../atoms/EditableAutoSize'

export const Diaries = (diary_list) => {
  const onCellChange = (id, originVal) => {
    return (value) => {
        diary_list.changeDiaryContent(id, value)
   }
 }

 const onDiaryConfirm = () => {
 }

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
            tempPhoto.push({src:diary_list.diary_list[l].photos[i].image.replace(":3000",":8000"),
                        width:10,
                        height:10
                       });
        }
        DiarySet.push({date:diary_list.diary_list[l].date,
		contents: diary_list.diary_list[l].contents,
                photos:tempPhoto, id:l, tID:diary_list.diary_list[l].id})
   }

   return(
   <div>
       {onDiaryConfirm}
       {DiarySet.map(data =>
        <div key={data.id}>
          <h1> {data.date} </h1>
          <EditableAutoSize
            value={data.contents}
            onChange={onCellChange(data.tID, data.contents)}
            updated={true}
          />
          <Gallery photos={data.photos} />
	  <br/><br/><br/>
	  <Button id="ddbutton" onClick={ event => diary_list.onDeleteDiary(data.tID) }>Delete</Button>
	  <br/><hr/>
	</div>)}
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
