import React from 'react'
import Gallery from 'react-photo-gallery';
import SelectedImage from "../SelectPhoto/SelectedImage";
import {Button, Affix, Icon} from 'antd'

export class PhotoList extends React.Component{
  constructor(props){
    super(props)
    const newphoto = this.createPhoto(this.props.photo_list)
    this.state = {photos:newphoto}
    this.selectPhoto = this.selectPhoto.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log("#########",this.props,nextProps)
    if (nextProps.updated) {
      let newphoto = this.createPhoto(nextProps.photo_list)
      this.setState({photos:newphoto})
    }
  }

  createPhoto = (photos) =>{
    let len = photos.length
    let newphotos = []
    for (let i=0; i < len; i++){
      let photo = photos[i]
      let Photo =[]
      let img = photo.photos_in_folder.length
      if (img > 0){
        for (let j=0; j < img; j++){
          let image = photo.photos_in_folder[j]
          Photo.push({src:image.image.replace(":3000",":8000"),
            sizes :['(min-width: 50px) 20vw,(min-width: 50px) 20vw,40vw'],
            width : 5,
            height : 5,
            selected : false,
            folderId : i,
            Id : image.id
          })
        }
        newphotos.push({folder:photo.name, photos:Photo, id:photo.id})
      }
    }
    return newphotos
  }

  downloadAll = () => {
    let urls = [];
    let PhotoSet = this.state.photos
    for(let j=0; j<PhotoSet.length;j++){
      for(let m=0; m<PhotoSet[j].photos.length; m++){
        if(PhotoSet[j].photos[m].selected == true){
          urls.push(PhotoSet[j].photos[m].src);
        }
      }
    }
    let link = document.createElement('a');
    link.setAttribute('download', null);
    link.style.display = 'none';
    document.body.appendChild(link);
    console.log(urls);
    for (let i=0; i<urls.length; i++){
      link.setAttribute('href',urls[i]);
      link.click();
    }
    document.body.removeChild(link);
  }

  deletePhotos = () => {
    let photoIDs= []
    let PhotoSet = this.state.photos
    for (let j=0;j<PhotoSet.length;j++){
      for (let m=0;m<PhotoSet[j].photos.length;m++){
        if(PhotoSet[j].photos[m].selected == true ){
          photoIDs.push(PhotoSet[j].photos[m].Id);
       }
      }
    }
    console.log(photoIDs)
    this.props.onDeletePhotos(photoIDs)
  }

  deleteFolder = (id) => {
    this.props.onDeleteFolders(id)
  }

  selectPhoto = (event, obj) => {
    console.log(obj.photo)
    console.log(obj.photo.folderId)
    let index2 = obj.photo.folderId
    let photos = this.state.photos
    console.log( photos[index2].photos[obj.index],"PHOTO")
    photos[index2].photos[obj.index].selected = !photos[index2].photos[obj.index].selected
    this.setState({photos:photos})
  }

  render() {
    const PhotoSet = this.state.photos
    const enable = PhotoSet.length>0 ? true : false

    return (
      <div>
      <Affix>
      <h3 className="inline">{"Select photos and click  "}<Icon type="arrow-right"/></h3>
      <Button type="primary" disabled={!enable} onClick={this.downloadAll} style={{marginLeft:10, marginRight:10, marginTop:5, marginBottom:5}}> Download </Button>
      <Button type="primary" disabled={!enable} onClick={this.deletePhotos}> Delete </Button>
      </Affix>

      {enable && PhotoSet.map(data =>
        <div key={data.id}>
        <br/>
        <div className="fol">
        <h2 className="inline">{data.folder} </h2>  
        <Button style={{float:"right"}} type="default" onClick={() => this.deleteFolder(data.id)}> Delete Folder</Button>
        <hr className="myhr"/>
        </div>

        <Gallery photos={data.photos}
        onClick={this.selectPhoto}
        ImageComponent={SelectedImage}
        />
        </div>
      )
      }
    </div>      
    )
  }
}


