import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Gallery from 'react-photo-gallery';

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const PhotoList = () => {
  const Foldername ='example'
  const Photo = [{
 src:  'http://travel.chosun.com/site/data/img_dir/2017/06/30/2017063001239_0.jpg',
 width:10,
 height:10,
},
  {
    src :'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    width:10,
    height:10	,
}
 ];

  return (
    <div>
      <Foldername/>
      <Gallery photos={Photo}/>
    </div>
  )
}

PhotoList.propTypes = {
  Foldername: PropTypes.string,
  Photo: PropTypes.arrayOf(PropTypes.shape({
  src:PropTypes.string.isRequired,
  width:PropTypes.number.isRequired,
  height:PropTypes.number.isRequired
 }))
}

export default PhotoList
