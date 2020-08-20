
import React from 'react';
import styles from './styles.css';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(event.target);
        console.log(this.state);
        let target = event.target;
        if (target.classList.contains(styles.bookmark)) {
            if (!target.classList.contains(styles.checked)) {
                target.classList.toggle(styles.checked, true)
                this.state.isToggleOn = false;
            } else {
                target.classList.toggle(styles.checked, false);
                this.state.isToggleOn = true;
            }
        }
    }

    render() {
        const { arg } = this.props;
        const imgUrl = arg.image;
        return (
            <div className={styles.event} style={{ backgroundImage: 'url(' + imgUrl + ')' }}>
                <div className={styles.dateBookmark}>
                    <div className={styles.date}>{(arg.date).slice(0, 2)}</div>
                    <div className={styles.bookmark} onClick={this.handleClick}></div>
                </div>
                <div className={styles.eventTitle}>{arg.name}</div>
            </div>
        );
    }
}
export default Event;