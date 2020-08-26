import React from "react";


class WreckingCrew extends React.Component {


  render() {
    if (this.props.wreckingCrew === null)
      return null
    return (
      <div className="name">
      <h1>we are the crew!!</h1>
      </div>
    );
  }
}

export default WreckingCrew;
