import React, { Component } from "react";
import ICard from "./models/Card";

class Cardview extends Component<ICard> {
    // When a card is reveal

    constructor(props: ICard) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!this.props.matched && !this.props.imageUp) {
            this.props.onClick(this.props.id, this.props.image);
        }
    }

    render() {
        let path = './img/';
        if (this.props.imageUp) {
            path += `${this.props.image}.jpeg`
        } else {
            path += `back.jpeg`;
        }

        let className = 'card';
        if (this.props.matched) {
            className += ` matched`;
        }

        return (
            <img className={className} src={require(`${path}`)} alt = '' onClick={this.onClick} />
        );
    };

}

export default Cardview;