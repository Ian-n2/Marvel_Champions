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
      mainScheme:[],
      sideScheme:[],
      data: []
    }
    this.sort = this.sort.bind(this)
    this.schemeSort = this.schemeSort.bind(this)
    this.trimSideScheme = this.trimSideScheme.bind(this)
    this.sorting = this.sorting.bind(this)
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

  trimSideScheme(sideScheme){
    var newSideScheme = []
    for (let card in sideScheme) {
      if (card.real_name === "Collapsing Bridge")
      sideScheme.push(card)

    }
    return sideScheme;
    this.setState({sideScheme:sideScheme})
  };

  sorting(){
    const selectedMainScheme = randomScheme(this.state.mainScheme)
    const selectedSideScheme = randomScheme(this.state.sideScheme)
    this.setState({mainScheme:selectedMainScheme, sideScheme:selectedSideScheme})
  }

  schemeSort(){
    const hero = []
    this.state.data.forEach(card => {
      if (card.card_set_type_name_code != "modular" && card.card_set_type_name_code != "villain"){
        hero.push(card)
      }else if
      (card.type_code === "side_scheme" && card.card_set_type_name_code === "modular") {
        this.state.sideScheme.push(card)
      }else{
        (card.is_unique === true && card.health_per_hero === true)
        this.state.mainScheme.push(card)
      }
    })
    this.trimSideScheme(this.state.sideScheme)
    this.sorting()
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
