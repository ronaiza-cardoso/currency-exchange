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
            eurValue: getFixedValue(ev.target.value) * getFixedValue(this.state.BRL)
        });
    };

    _eurToBrl = ev => {
        this.setState({
            brlValue: getFixedValue(ev.target.value) * getFixedValue(this.state.BRL)
        });
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
                    />
                </div>
                <div className="input__container">
                    <label>BRL</label>
                    <input
                        value={this.state.brlValue}
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
