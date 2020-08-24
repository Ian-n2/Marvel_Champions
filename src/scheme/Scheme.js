import React from "react";


class Scheme extends React.Component {


  render() {
    console.log(this.props)
    if (this.props.selectedScheme === null)
      return null
    return (
      <div className="name" >
      <h3>{this.props.selectedScheme.real_name}</h3>
      <img src={this.props.selectedScheme.imagesrc}/>
      </div>
    );
  }
}

export default Scheme;
