import React from "react";


class WreckingCrew extends React.Component {


  render() {
    if (this.props.wreckingCrew === null)
      return null
    return (
      <div>
      <img src={this.props.wreckingCrew.imagesrc}/>
      </div>
    );
  }
}

export default WreckingCrew;
