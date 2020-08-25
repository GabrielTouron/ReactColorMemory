import React, { Component } from "react";
import Cards from "./Cards";
import CardView from "./CardView";
import './Memory.css';
import IState from "./models/State";

class Memory extends Component {
    // Main class: memory game logic

    cards: Cards;
    state: IState;
    timeout: any;

    constructor(props: {}) {
        super(props);
        this.onCardClicked = this.onCardClicked.bind(this);
        this.onPlayAgain = this.onPlayAgain.bind(this);
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

    getCardsViews(): JSX.Element[] {
        const cardViews: JSX.Element[] = [];
        const onClick = this.onCardClicked;
        this.cards.cards.forEach(c => {
            const cardView = <CardView key={c.id}
                id={c.id}
                image={c.image}
                imageUp={c.imageUp}
                matched={c.matched}
                onClick={onClick} />
            cardViews.push(cardView);
        });
        return cardViews;
    }

    clearBoard() {
        if (this.state.nbrClicks !== 2) {
            return;
        }
        this.cards.flipCard(this.state.firstId, false);
        this.cards.flipCard(this.state.secondId, false);
        this.setState({
            firstId: undefined,
            secondId: undefined,
            nbrClicks: 0,
            round: this.state.round + 1
        });
    }

    onCardClicked(id: number) {
        if (this.state.nbrClicks === 0 || this.state.nbrClicks === 2) {
            if (this.state.nbrClicks === 2) {
                clearTimeout(this.timeout);
                this.clearBoard();
            }
            this.cards.flipCard(id, true);
            this.setState({
                firstId: id,
                nbrClicks: 1
            });
        } else if (this.state.nbrClicks === 1) {
            this.cards.flipCard(id, true);
            this.setState({
                secondId: id,
                nbrClicks: 2
            });
            if (this.cards.cardsHaveSameImage(id, this.state.firstId)) {
                this.cards.cardMatched(this.state.firstId, true);
                this.cards.cardMatched(id, true);
                this.setState({
                    pairsFound: this.state.pairsFound + 1,
                    firstId: undefined,
                    secondId: undefined,
                    round: this.state.round + 1,
                    nbrClicks: 0
                });
            } else {
                this.timeout = setTimeout(() => {
                    this.clearBoard();
                }, 5000);
            }
        }
    }

    onPlayAgain() {
        this.boardCreation();
    }

    render() {
        const cardViews = this.getCardsViews();
        let gameStat = <div className='memory-status'>
            <div>Tour : {this.state?.round}</div>
            <div>Paires trouvées : {this.state?.pairsFound}</div>
        </div>;

        if (this.state?.pairsFound === this.cards.NUM_IMAGES) {
            gameStat = <div className='memory-status'>
                <div>GAGNÉ <span role="img" aria-label=''>🏅🏅🏅</span> !</div>
                <div> En {this.state?.round - 1} tours !</div>
                <div><button className='btn' onClick={this.onPlayAgain}>Jouer encore ?</button></div>
            </div>
        }

        return (
            <div className='memory'>
                <header className='memory-header'>
                    <div className='memory-title'>Colors Memory en React</div>
                </header>
                <div>
                    {gameStat}
                </div>
                <div className='card-container'>
                    {cardViews}
                </div>
            </div>
        );
    }

}

export default Memory;