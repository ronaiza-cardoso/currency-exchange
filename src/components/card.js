import React, { Component } from 'react';
import API from '../configs/Api';
import '../App.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brlValue: '1',
            eurValue: '',
            BRL: '',
            calculedValude: ''
        };
    }

    componentDidMount() {
        // Self-invoking function
        (() => {
            fetch(API.endpoint)
                .then(r => r.json())
                .then(result =>
                    this.setState({
                        BRL: result.rates.BRL,
                        calculedValude: getFixedValue(1) * getFixedValue(result.rates.BRL)
                    })
                )
                .catch(e => {
                    console.log(e);
                });
        })();

        this.EUR_INPUT.focus();

    }

    _brlToEur = ev => {
        this.setState({
            inputValue: ev.target.value,
            calculedValude: ev.target.value * this.state.BRL
        });
    };

    _eurToBrl = ev => {
        // TODO: make the calc eur to brl
        console.log(ev.target.value)
        console.log(this.state)
    };

    render() {
        // TODO: fix inputs
        return (
            <div className="card">
                <div className="input__container">
                    <label>EUR</label>
                    <input
                        value={this.state.eurValue}
                        onChange={evt => this._brlToEur(evt)}
                        ref={input => this.EUR_INPUT = input }
                    />
                </div>
                <div className="input__container">
                    <label>BRL</label>
                    <input
                        value={getFixedValue(this.state.calculedValude)}
                        readOnly
                    />
                </div>
            </div>
        );
    }
}
export default Card;

export const getFixedValue = value => {
    return isNaN(value) ? 'NaN' : parseFloat(Math.round(value * 100) / 100);
};
