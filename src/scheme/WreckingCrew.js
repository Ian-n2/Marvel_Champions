import React from "react";
import './../Stylesheet.css';



class WreckingCrew extends React.Component {


  render() {
    if (this.props.wreckingCrew === null)
    return null
    return(
    <div className="crew">
    <h1>Here comes the crew</h1>
    <h3>{this.props.wreckingCrew.real_name}</h3>
    <img src='./images/Piledriver.png'/>
      </div>
    )
  }
}

export default WreckingCrew;
