import React, {useState} from "react";
import Scheme from "./scheme/Scheme.js";
import SideScheme from "./scheme/SideScheme.js";
import WreckingCrew from "./scheme/WreckingCrew.js";
import {randomScheme} from "./helpers/helpers.js";
import './Stylesheet.css';
import {redirect} from "react-router-dom";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      villain: [],
      hero: [],
      mainScheme:null,
      sideScheme:null,
      data: [],
      wrecker: false,
      greenGoblin: false,
      wreckingCrew:null
    }
    this.sort =this.sort.bind(this);
    this.schemeSort = this.schemeSort.bind(this);
    // this.changeWrecker = this.changeWrecker.bind(this);
  }
  sort(){
    const hero = []
    const villain = []
    const cardTypes = ["hero", "aggression", "justice", "leadership", "protection", "basic"]


    this.state.data.forEach(card => {
      if (card.faction_code === "encounter"){
        villain.push(card)
      }else if(cardTypes.includes(card.faction_code)){
        hero.push(card)
      }
    })
    this.setState({villain:villain, hero:hero})
  }


  schemeSort(){
    const hero = []
    const sideScheme = []
    const mainScheme = []
    const wreckingCrew = []
    const villainNames = ["Bulldozer", "Piledriver", "Thunderball"]
    const sideSchemeNames = ["Goblin Nation", "Goblin Reinforcements", "Overrun", "Collapsing Bridge", "Oscorp Manufacturing", "Payoff"]
    const crewNames = ["Bulldozer", "Piledriver", "Thunderball"]
    this.state.data.forEach(card => {
      if (card.type_code === "villain" && card.health_per_hero === true &&
      !villainNames.includes(card.real_name))
      {  mainScheme.push(card)
        villainNames.push(card.real_name)
      }else if
      (card.type_code === "side_scheme" && card.card_set_type_name_code === "modular" && !sideSchemeNames.includes(card.real_name)) {
        sideScheme.push(card)
      }else if
      (crewNames.includes(card.real_name) && card.stage === 1)
      { wreckingCrew.push(card)
      }else{
        hero.push(card)
      }
    })

    const selectedMainScheme = randomScheme(mainScheme)
    const selectedSideScheme = randomScheme(sideScheme)



    this.setState({mainScheme:selectedMainScheme, sideScheme:selectedSideScheme, wreckingCrew:wreckingCrew})

    setTimeout(() =>{
      if(this.state.mainScheme.real_name === "Wrecker"){
        this.setState({wrecker: true})
      }else{
        this.setState({wrecker: false})
      }
    },100)

    setTimeout(() =>{
      if(this.state.mainScheme.real_name === "Green Goblin"||"Norman Osbourne"){
        this.setState({greenGoblin: true})
      }else{
        this.setState({greenGoblin: false})
      }
    },100)

  }

  //   setTimeout(() =>{
  //      changeWrecker(){
  //     if(this.state.mainScheme.real_name === "Wrecker"){
  //       this.setState({wrecker: true})
  //     }
  //   },1000)
  // }


  componentDidMount(){
    fetch("/api/public/cards/?encounter=1")
    .then(res => res.json())
    .then(cards => this.setState({data:cards}))
    // .then(cards => console.log(cards.map(card => console.log(card))))

    // .then(cards => console.log(console.log(new Set(cards.map(card => card.type_name).sort()))))
  }
  // let side
  // if (this.state.wrecker){
  //   side = {this.state.wreckingCrew.map((wreckingCrew) => {
  //     <WreckingCrew/>
  //   }
  // }else{
  //   side =  <SideScheme selectedScheme={this.state.sideScheme}/>
  // }
  // This is the dev button below. Put back in when woking on the app
  // <button className="clicker" onClick={this.sort}>devTool</button>
  //also put this in the render if you are putting the dev tools back.
  // const display = this.state.data.map(card => {
  // return <p>{card.real_name}</p>
  // const display = this.state.data.map(card => {
  //   return <p>{card.real_name}</p>

  render() {
    let sideScheme
    if (this.state.wrecker === true){
      sideScheme = <WreckingCrew/>
    }else{
      sideScheme = <SideScheme selectedScheme={this.state.sideScheme}/>
    }
    let addOn
    if (this.state.greenGoblin === true){
      addOn = <button className="GoblinGadgets" type="checkbox">Add Goblin Gadgets</button>
    }else{
      addOn = <h2>Good Luck</h2>
    }
    return (
      <div className="main">
      <h1>Villain Finder</h1>
      <button className="scheme" onClick={this.schemeSort}>Scheme</button>
      <Scheme  selectedScheme={this.state.mainScheme}/>
      {sideScheme}
      </div>
    );
  }
}

export default App;
