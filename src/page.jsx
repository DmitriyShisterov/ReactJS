import React from 'react';
import styles from './styles.css';
import Event from './event';
import { connect } from 'react-redux'
import { setEvents } from './actions';
class Page extends React.Component() {
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


}