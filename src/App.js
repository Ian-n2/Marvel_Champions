import React, {useState} from "react";
import Scheme from "./scheme/Scheme.js"
import SideScheme from "./scheme/SideScheme.js"
import {randomScheme} from "./helpers/helpers.js"
class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      villain: [],
      hero: [],
      mainScheme:null,
      sideScheme:null,
      data: []
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
    this.state.data.forEach(card => {
      if (card.type_code === "villain" && card.health_per_hero === true)
      {  mainScheme.push(card)
      }else if
      (card.type_code === "side_scheme" && card.card_set_type_name_code === "modular") {
        sideScheme.push(card)
      }else {
        hero.push(card)
      }
      console.log(mainScheme)
    })

    const selectedMainScheme = randomScheme(mainScheme)
    const selectedSideScheme = randomScheme(sideScheme)

    this.setState({mainScheme:selectedMainScheme, sideScheme:selectedSideScheme})

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
    return (
      <div>
      <button onClick={this.sort}>click</button>
      <button onClick={this.schemeSort}>Scheme</button>
      <Scheme selectedScheme={this.state.mainScheme}/>
      <SideScheme selectedScheme={this.state.sideScheme}/>
      </div>
    );
  }
}

export default App;
