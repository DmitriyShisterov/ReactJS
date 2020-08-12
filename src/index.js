
import styles from './styles.css';
function evl(params) {
    let evl = {};
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let result;
    let url = 'https://dmitriyshisterov.github.io/xsolla-frontend-school-2020/src/events.json';
    fetch(url, requestOptions)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            evl = data;
            render(evl);
        })
        .catch(function () {
            //error
        });

    /*render*/
    function render(x) {
        let eventsWrap = document.querySelector('.eventsWrap');
        if (eventsWrap.childElementCount != 0) {
            eventsWrap.innerHTML = '';
        }
        if (x.length > 0) {
            for (let i = 0; i < x.length; i++) {
                let name = x[i].name;
                let fullDate = x[i].date;
                let img = x[i].image;

                let event = document.createElement('div');
                event.className = styles.event;
                event.style.backgroundImage = `url(${img})`;
                console.log()

                let dateBookmark = document.createElement('div');
                dateBookmark.className = styles.dateBookmark;

                let dates = document.createElement('div');
                dates.className = styles.date;
                let date = fullDate.slice(0, 2);
                dates.innerHTML = date;

                let bookmark = document.createElement('div');
                bookmark.className = styles.bookmark;

                let eventTitle = document.createElement('div');
                eventTitle.className = styles.eventTitle;
                eventTitle.innerHTML = name;

                dateBookmark.append(dates, bookmark);
                event.append(dateBookmark, eventTitle);
                eventsWrap.append(event);
            }
        } else {
            let error = document.createElement('div');
            error.className = styles.event;
            error.classList.add(styles.error);
            error.style.border = '1px solid #444';
            error.style.borderRadius = '6px';
            error.innerHTML = 'По указанным параметрам событий не найдено. <br>Попробуйте повторить поиск с другими параметрами.';
            eventsWrap.append(error);
        }
    }
    /*favorite toggler*/
    eventsWrap.onclick = function (event) {
        let target = event.target;
        if (target.className === styles.bookmark) {
            if (!target.classList.contains(styles.checked)) {
                target.classList.toggle(styles.checked, true)
            } else {
                target.classList.toggle(styles.checked, false);
            }
        }
    };

    let filter = {
        city: undefined,
        month: undefined
    }
    let newEvl = [];
    let sortEvl = [];

    let selects = document.querySelectorAll('select');
    console.log(selects);
    selects.forEach(function (select, i, selects) {
        select.addEventListener('change', function (event) {
            let value = select.value;
            if (event.target.className === styles.city) {
                filter.city = select.value;
            } else if (event.target.className === styles.month) {
                filter.month = select.value;
            }
            if (filter.city && filter.month) {
                sortEvl = [];
                let found = 0;
                //let message = 'Событий не найдено, попробуйте поискать по другим параметрам.'
                evl.forEach(function (evt, i, evl) {
                    let month;
                    month = evt.date.slice(3, 5)
                    if (evt.city === filter.city && month === filter.month) {
                        sortEvl.push(evt);
                        found++;
                    }
                    if (filter.city === 'all' && month === filter.month) {
                        sortEvl.push(evt);
                        found++;
                    }
                    if (filter.city === evt.city && filter.month === 'all') {
                        sortEvl.push(evt);
                        found++;
                    }
                    if (filter.city === 'all' && filter.month === 'all') {
                        sortEvl.push(evt);
                        found++;
                    }
                })
                if (found === 0) {
                    sortEvl = [];
                }
                render(sortEvl);
                console.log(sortEvl);
            } else {
                newEvl = [];
                evl.forEach(function (evt, i, evl) {
                    let month;
                    if (event.target.className === styles.month) {
                        month = evt.date.slice(3, 5)
                    }
                    if (evt.city === value || month === value) {
                        newEvl.push(evt);
                    }
                })
                render(newEvl);
                console.log(newEvl);
            }
        })
    })
};

evl();
