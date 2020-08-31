import React from "react";
import './../Stylesheet.css';




class WreckingCrew extends React.Component {


  render() {
    if (this.props.wreckingCrew === null)
    return null
    else
    return(
    <div className="crew">
    <h5>And his crew</h5>
    {
      this.props.wreckingCrew.map(function(crew, index){
        return <img src={crew.imagesrc}/>
      })
    }
  </div>
    )
  }
}

export default WreckingCrew;
