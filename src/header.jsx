import React, { cloneElement } from 'react';
import { connect } from 'react-redux'
import styles from './styles.css';
import { render } from 'react-dom';
import { changeCity, changeMonth } from './actions'
import store from './store';


const cities = ['All', 'Amsterdam', 'Berlin', 'Rim', 'Sr.Petersburg'];
const monthes = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this)
    }

    render() {
        const city = this.props.city;
        const month = this.props.month;

        return (
            <div className={styles.inputsBoxWrap}>
                <div className={styles.inputBox}>
                    <label>City:</label>
                    <div className={styles.selectWrap}>
                        <Select value={city} selectorType={cities} onChange={this.onChangeCity} />
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <label>Month:</label>
                    <div className={styles.selectWrap}>
                        <Select value={month} selectorType={monthes} onChange={this.onChangeMonth} />
                    </div>
                </div>
            </div>
        );
    }

    onChangeCity(city) {
        this.props.changeCity(city);
    }
    onChangeMonth(month) {
        this.props.changeMonth(month);
    }
}

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    render() {
        const value = this.props.value;
        const selectorType = this.props.selectorType;
        return (
            <select value={value} onChange={this.onChange} className={styles.select}>
                {selectorType.map((element, i) => { return (<option key={i} value={element}>{element}</option>) })}
            </select>
        );
    }

    onChange(elm) {
        const value = elm.target.value;
        this.props.onChange(value);
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        city: state.city,
        month: state.month,
        events: state.events
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeCity: (value) => {
            dispatch(changeCity(value))
        },
        changeMonth: (value) => {
            dispatch(changeMonth(value))
        }
    }
}

const h = connect(mapStateToProps, mapDispatchToProps)(Header)
export default h;
