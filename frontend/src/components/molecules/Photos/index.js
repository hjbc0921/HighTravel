import React from 'react'
import Gallery from 'react-photo-gallery';
import SelectedImage from "../SelectPhoto/SelectedImage";
import {Button, Affix, Icon} from 'antd'
import axios from 'axios'

export class PhotoList extends React.Component{
  constructor(props){
    super(props)
    const newphoto = this.createPhoto(this.props.photo_list)
    this.state = {photos:newphoto[0], enable:newphoto[1]}
    this.selectPhoto = this.selectPhoto.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log("#########",nextProps)
    if (nextProps.updated) {
      let newphoto = this.createPhoto(nextProps.photo_list)
      this.setState({photos:newphoto[0],enable:newphoto[1]})
    }
  }

  createPhoto = (photos) =>{
    let len = photos.length
    let enable = false
    let newphotos = []
    for (let i=0; i < len; i++){
      let photo = photos[i]
      let Photo =[]
      let img = photo.photos_in_folder.length
      if (img > 0){
        enable = true
        for (let j=0; j < img; j++){
          let image = photo.photos_in_folder[j]
          Photo.push({src:image.image.replace(":3000/media/",":8000/media/"),
            sizes :['(min-width: 50px) 20vw,(min-width: 50px) 20vw,40vw'],
            width : 5,
            height : 5,
            selected : false,
            folderId : i,
            Id : image.id
          })
        }
      }
      newphotos.push({folder:photo.name, photos:Photo, id:photo.id})
    }
    return [newphotos, enable]
  }

  downloadAll = () => {
    let urls = [];
    let PhotoSet = this.state.photos
    for(let j=0; j<PhotoSet.length;j++){
      for(let m=0; m<PhotoSet[j].photos.length; m++){
        if(PhotoSet[j].photos[m].selected == true){
          let filename = PhotoSet[j].folder + "_" + PhotoSet[j].photos[m].src.split("/")[4]
          console.log(filename)
          urls.push({src:PhotoSet[j].photos[m].src,filename:filename});
        }
      }
    }
    for (let i=0; i<urls.length; i++){
      axios({
        url: urls[i].src,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', urls[i].filename);
        document.body.appendChild(link);
        link.click();
      });
    }
    const newphoto = this.createPhoto(this.props.photo_list)
    this.setState({photos:newphoto[0], enable:newphoto[1]})
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
    this.props.onDeletePhotos(photoIDs)
  }

  deleteFolder = (id) => {
    this.props.onDeleteFolders(id)
  }

  downFolder = (id) => {
    let PhotoSet = this.state.photos.find(photo => photo.id===id)
    let urls = []
 
    for(let m=0; m<PhotoSet.photos.length; m++){
      let filename = PhotoSet.folder + "_" + PhotoSet.photos[m].src.split("/")[4]
      urls.push({src:PhotoSet.photos[m].src,filename:filename});
    }
  
    for (let i=0; i<urls.length; i++){
      axios({
        url: urls[i].src,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', urls[i].filename);
        document.body.appendChild(link);
        link.click();
      });
    }

  }

  selectPhoto = (event, obj) => {
    let index2 = obj.photo.folderId
    console.log(obj,index2)
    let photos = this.state.photos
    console.log(photos)
    photos[index2].photos[obj.index].selected = !photos[index2].photos[obj.index].selected
    console.log(photos)
    this.setState({photos:photos})
  }

  render() {
    const PhotoSet = this.state.photos
    const enable = PhotoSet.length>0 ? true : false
    const enable2 = this.state.enable

    return (
      <div>
      <Affix>
      <h3 className="inline">{"Select photos and click  "}<Icon type="arrow-right"/></h3>
      <Button type="primary" disabled={!enable2} onClick={this.downloadAll} style={{marginLeft:10, marginRight:10, marginTop:5, marginBottom:5}}> Download </Button>
      <Button type="primary" disabled={!enable2} onClick={this.deletePhotos}> Delete </Button>
      </Affix>

      {enable && PhotoSet.map(data =>
        <div key={data.id}>
        <br/>
        <div className="fol">
        <Button style={{float:"left"}} type="default" onClick={() => this.downFolder(data.id)}> Download Folder</Button>
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


