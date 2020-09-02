import React from 'react';
import styles from './styles.css';
import Event from './event';
import { connect } from 'react-redux'
import { setEvents } from './actions';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let result;
        let url = 'https://raw.githubusercontent.com/DmitriyShisterov/ReactJS/master/src/events.json';

        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    // this.setState({
                    //     isLoaded: true,
                    //     items: result
                    // });
                    this.setState({ isLoaded: true }, () => {
                        this.props.setEvents(result);
                    })
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { city, month, events } = this.props;
        const { error, isLoaded } = this.state;
        const items = filter(city, month, events)
        console.log(items)
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            console.log(events);
            return (
                <div className={styles.eventsWrap}>
                    {items.map(item => (
                        <div><Event arg={item} /></div>
                    ))}
                </div>
            );
        }
        function filter(c, m, e) {
            switch (m) {
                case 'January':  // if (x === 'value1')
                    m = '01';
                    break

                case 'February':  // if (x === 'value2')
                    m = '02';
                    break

                case 'March':  // if (x === 'value2')
                    m = '03';
                    break
                case 'April':  // if (x === 'value2')
                    m = '04';
                    break
                case 'May':  // if (x === 'value2')
                    m = '05';
                    break
                case 'June':  // if (x === 'value2')
                    m = '06';
                    break
                case 'July':  // if (x === 'value2')
                    m = '07';
                    break
                case 'August':  // if (x === 'value2')
                    m = '08';
                    break
                case 'September':  // if (x === 'value2')
                    m = '09';
                    break
                case 'October':  // if (x === 'value2')
                    m = '10';
                    break
                case 'November':  // if (x === 'value2')
                    m = '11';
                    break
                case 'December':  // if (x === 'value2')
                    m = '12';
                    break
            }
            let items = [];
            e.forEach(function (evt, i, e) {
                let month;
                month = evt.date.slice(3, 5)
                // if (c === evt.city && m === month) {
                //     items.push(evt)
                // }
                // if (c === 'All' && month === m) {
                //     items.push(evt)
                // }
                // if (c === evt.city && m === 'All') {
                //     items.push(evt)

                // }
                // if (c === 'All' && c === 'All') {
                //     items = e
                // }
                if ((c === 'All' || c === evt.city) && (m === 'All' || month === m)) {
                    items.push(evt)
                }
            })
            return items;
        }
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
        getEvents: (value) => {
            dispatch(getEvents(value))
        },
        setEvents: (items) => {
            dispatch(setEvents(items))
        }
    }
}

const l = connect(mapStateToProps, mapDispatchToProps)(List)
export default l;


/*<Page>
    <List items={items}>
</Page>*/