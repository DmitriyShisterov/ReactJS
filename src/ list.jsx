import React from 'react';
import styles from './styles.css';
import Event from './event';


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
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
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
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            console.log(items);
            return (
                <div className={styles.eventsWrap}>
                    {items.map(item => (
                        <div><Event arg={item} /></div>
                    ))}
                </div>
            );
        }
    }
}

export default List;