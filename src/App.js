import React, {useState} from "react";
import Scheme from "./scheme/Scheme.js"
import SideScheme from "./scheme/SideScheme.js"
import WreckingCrew from "./scheme/WreckingCrew.js"
import {randomScheme} from "./helpers/helpers.js"
class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      villain: [],
      hero: [],
      mainScheme:null,
      sideScheme:null,
      data: [],
      wrecker: true,
      wreckingCrew:null
    }
    this.sort =this.sort.bind(this)
    this.schemeSort = this.schemeSort.bind(this)
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
    console.log(villain)
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
    console.log(wreckingCrew)

    const selectedMainScheme = randomScheme(mainScheme)
    const selectedSideScheme = randomScheme(sideScheme)


    this.setState({mainScheme:selectedMainScheme, sideScheme:selectedSideScheme, wreckingCrew:wreckingCrew})

  }
  componentDidMount(){
    fetch("/api/public/cards/?encounter=1")
    .then(res => res.json())
    .then(cards => this.setState({data:cards}))
    // .then(cards => console.log(cards.map(card => console.log(card))))

    // .then(cards => console.log(console.log(new Set(cards.map(card => card.type_name).sort()))))
  }

  render() {
    const display = this.state.data.map(card => {
      return <p>{card.real_name}</p>

    })
      let side
      if (this.state.wrecker){
        side = {this.state.wreckingCrew.map((wreckingCrew) => {
          <WreckingCrew/>
        }
      }else{
        side =  <SideScheme selectedScheme={this.state.sideScheme}/>
      }
    return (
      <div>
      <button onClick={this.sort}>click</button>
      <button onClick={this.schemeSort}>Scheme</button>
      <Scheme selectedScheme={this.state.mainScheme}/>
      {side}
      </div>
    );
  }
}

export default App;
