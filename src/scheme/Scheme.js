import React from "react";


class Scheme extends React.Component {


  render() {
    console.log(this.props)
    if (this.props.selectedScheme === null)
      return null
    return (
      <div>
      <h3>{this.props.selectedScheme.real_name}</h3>
      <img style={{width: 300, height:300}}/>
      </div>
    );
  }
}

export default Scheme;
