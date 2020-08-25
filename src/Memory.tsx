import React, { Component } from "react";
import Cards from "./Cards";

import './Memory.css';
import IState from "./models/State";

class Memory extends Component {
    // Main class: memory game logic

    cards: Cards;
    state: IState;

    constructor(props: {}) {
        super(props);
        this.cards = new Cards();
    }

    componentDidMount() {
        this.boardCreation();
    }

    boardCreation() {
        this.cards.cardGeneration();
        this.setState({
            round: 1,
            pairsFound: 0,
            nbrClicks: 0,
            firstId: undefined,
            secondId: undefined
        })
    }

    render() {
        return <div></div>
    }

}

export default Memory;