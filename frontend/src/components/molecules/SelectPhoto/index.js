import React from "react";
import Provider from 'react-redux';
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";

export class SelectPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: this.props.photos };
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      this.setState({ photos: nextProps.photos})
    }
  }

  selectPhoto(event, obj) {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    console.log(photos.map(p => p.selected));
    this.setState({ photos: photos });
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <Gallery
          photos={this.state.photos}
          onClick={this.selectPhoto}
          ImageComponent={SelectedImage}
        />
      </div>
    );
  }
}
