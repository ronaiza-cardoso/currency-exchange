import React, { Component } from 'react';
import API from '../configs/Api';
import '../App.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '1',
            BRL: '',
            EUR: '',
            calculedValude: ''
        };
    }

    componentDidMount() {
        const getData = () => {
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
        };
        getData();
    }

    _brlToEur = ev => {
        this.setState({
            inputValue: ev.target.value,
            calculedValude:
                getFixedValue(ev.target.value) * getFixedValue(this.state.BRL)
        });
    };

    _eurToBrl = ev => {
        // TODO: make the calc eur to brl
    };

    render() {
        return (
            <div className="card">
                <div className="input__container">
                    <label>BRL</label>
                    <input
                        value={this.state.inputValue}
                        onChange={evt => this._brlToEur(evt)}
                    />
                </div>
                <div className="input__container">
                    <label>EUR</label>
                    <input
                        value={getFixedValue(this.state.calculedValude)}
                        onChange={evt => this._eurToBrl(evt)}
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
