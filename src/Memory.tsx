import React, { Component } from "react";
import Cards from "./Cards";

import './Memory.css';

class Memory extends Component {
    // Main class: memory game logic

    cards: Cards;
    constructor(props: {}) {
        super(props);
        this.cards = new Cards();
        this.cards.cardGeneration();
    }


    render() {
        return <div></div>
    }

}

export default Memory;