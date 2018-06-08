import React from "react";
import Provider from 'react-redux';
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";

export class SelectPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  selectPhoto(event,obj) {
    this.props.onSelectPhoto(event,obj);
  }

  render() {
    const photos = this.props.photos
    return (
      <div>
        <Gallery
          photos={photos}
          onClick={this.selectPhoto}
          ImageComponent={SelectedImage}
        />
      </div>
    );
  }
}
