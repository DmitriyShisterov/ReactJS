import React, { cloneElement } from 'react';
import styles from './styles.css';
import { render } from 'react-dom';
const cities = ['All', 'Amsterdam', 'Berlin', 'Rim', 'Sr.Petersburg'];
const monthes = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            city: 'All',
            month: 'All'
        }
        this.onChangeCity = this.onChangeCity.bind(this),
            this.onChangeMonth = this.onChangeMonth.bind(this)
    }

    componentDidUpdate() {
        console.log("componentDidUpdate()");
        console.log(this.state);
        this.setState({ city })
        this.setState({ month })
    }

    render() {
        const city = this.state.city;
        const month = this.state.month;

        return (
            <div className={styles.inputsBoxWrap}>
                <div className={styles.inputBox}>
                    <label>City:</label>
                    <div className={styles.selectWrap}>
                        <Select selectorType={cities} onChange={this.onChangeCity} />
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <label>Month:</label>
                    <div className={styles.selectWrap}>
                        <Select selectorType={monthes} onChange={this.onChangeMonth} />
                    </div>
                </div>
            </div>
        );
    }

    onChangeCity(city) {
        this.setState({ city })
    }
    onChangeMonth(month) {
        this.setState({ month })
    }
}

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    render() {
        const selectorType = this.props.selectorType;
        return (
            <select onChange={this.onChange} className={styles.select}>
                {selectorType.map((element, i) => { return (<option key={i} value={element}>{element}</option>) })}
            </select>
        );
    }

    onChange(elm) {
        const value = elm.target.value;
        this.props.onChange(value);
    }
}
export default Header;
