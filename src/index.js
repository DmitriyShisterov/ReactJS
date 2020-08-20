

import styles from './styles.css';

function evlist(params) {
    let cities = ['All', 'Amsterdam', 'Berlin', 'Rim', 'Sr.Petersburg'];
    let month = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let evl = {};
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let result;
    let url = 'https://raw.githubusercontent.com/DmitriyShisterov/ReactJS/master/src/events.json';
    let filter = {
        city: undefined,
        month: undefined
    }
    let newEvl = [];
    let sortEvl = [];

    renderHead();

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

    let selects = document.querySelectorAll('.' + styles.select);

    selects.forEach(function (select, i, selects) {
        select.addEventListener('change', function (event) {
            let value = select.value;
            if (event.target.classList.contains(styles.city)) {
                filter.city = value;
            }
            else if (event.target.classList.contains(styles.month)) {
                filter.month = '0' + value;
            }
            console.log('value:_' + filter.month);
            if (filter.city && filter.month) {
                sortEvl = [];
                let found = 0;
                evl.forEach(function (evt, i, evl) {
                    let month;
                    month = evt.date.slice(3, 5)
                    if (evt.city === filter.city && month === filter.month) {
                        sortEvl.push(evt);
                        found++;
                    }
                    if (filter.city === 'All' && month === filter.month) {
                        sortEvl.push(evt);
                        found++;
                    }
                    if (filter.city === evt.city && filter.month === 'All') {
                        sortEvl.push(evt);
                        found++;
                    }
                    if (filter.city === 'All' && filter.month === 'All') {
                        sortEvl.push(evt);
                        found++;
                    }
                })
                if (found === 0) {
                    sortEvl = [];
                }
                render(sortEvl);
                console.log(sortEvl);
                console.log('1array');
            } else {
                newEvl = [];
                evl.forEach(function (evt, i, evl) {
                    let month;
                    if (event.target.classList.contains(styles.month)) {
                        month = evt.date.slice(3, 5);
                    }
                    if (evt.city === value || month === value) {
                        newEvl.push(evt);
                    }
                })
                render(newEvl);
                console.log(newEvl);
                console.log('1array');
            }
        })
    })



    /*renderBlock*/
    /*render Header*/
    function renderHead() {
        let wrapper = document.createElement('div');
        wrapper.className = styles.wrapper;

        let mainTitle = document.createElement('h1');
        mainTitle.className = styles.mainTitle;
        mainTitle.innerHTML = 'Event Listing';
        wrapper.append(mainTitle);

        let inBoxWrap = document.createElement('div');
        inBoxWrap.className = styles.inputsBoxWrap;
        let evWrap = document.createElement('div');
        evWrap.className = styles.eventsWrap;

        function ins(arr, el, elClass) {
            for (let i = 0; i < arr.length; i++) {
                let opt = document.createElement('option');
                opt.innerHTML = arr[i];

                if (elClass === styles.city) {
                    opt.value = arr[i]
                }
                if (elClass === styles.month) {
                    opt.value = i;
                }
                if (i === 0 && elClass === styles.month) {
                    opt.value = 'all';
                }
                el.append(opt);
            }
            return el;
        }

        for (let i = 0; i < 2; i++) {
            let inputBox = document.createElement('div');
            inputBox.className = styles.inputBox;
            let select = document.createElement('select');
            select.className = styles.select;
            let label = document.createElement('label');
            let el;

            if (i === 0) {
                label.innerHTML = 'Cities:';
                select.classList.add(styles.city);
                el = ins(cities, select, styles.city);
            }

            if (i === 1) {
                label.innerHTML = 'Month:';
                select.classList.add(styles.month);
                el = ins(month, select, styles.month);
            }

            inputBox.append(label, el);
            inBoxWrap.append(inputBox)
        }

        wrapper.append(inBoxWrap);
        wrapper.append(evWrap);
        document.body.append(wrapper);
    }

    /*render Content*/
    function render(x) {
        const evWrap = document.querySelector('.' + styles.eventsWrap);
        console.log(evWrap);
        console.log(evWrap.childElementCount);
        if (evWrap.childElementCount != 0) {
            evWrap.innerHTML = '';
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
                evWrap.append(event);
            }
        } else {
            let error = document.createElement('div');
            error.className = styles.event;
            error.classList.add(styles.error);
            error.style.border = '1px solid #444';
            error.style.borderRadius = '6px';
            error.innerHTML = 'По указанным параметрам событий не найдено. <br>Попробуйте повторить поиск с другими параметрами.';
            evWrap.append(error);
        }
        evWrap.onclick = function (event) {
            let target = event.target;
            if (target.classList.contains(styles.bookmark)) {
                if (!target.classList.contains(styles.checked)) {
                    target.classList.toggle(styles.checked, true)
                } else {
                    target.classList.toggle(styles.checked, false);
                }
            }
        };
    }

}

evlist();
