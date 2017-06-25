import moment from 'moment';
import apiUrl from '../constants/api-url';
import template from './home.component.html';
import './home.component.less';

class HomeController {
    constructor($state, httpService) {
        this.$state = $state;
        this.httpService = httpService;
    }

    $onInit() {
        this.todayEvent = {};

        this.httpService
            .get(apiUrl.nearEvent)
            .then((res) => {
                const data = res.data;
                const thisYear = moment().year();

                this.todayEvent = {
                    id: data.id,
                    date: new Date(`${thisYear}-${data.date}`),
                    title: data.title,
                };

                this.parseDayLeft();
            });
    }

    parseDayLeft() {
        const today = moment();
        const eventDate = moment(this.todayEvent.date);

        this.dayLeft = eventDate.diff(today, 'days');
        this.hasDayLeft = this.dayLeft !== 0;
    }

    showCalendar() {
        this.$state.go('timeline');
    }

    showDetail() {
        this.$state.go('eventDetail', {
            id: this.todayEvent.id,
        });
    }
}

HomeController.$inject = [
    '$state',
    'httpService',
];

const HomeComponent = {
    template,
    controller: HomeController,
};

export default HomeComponent;
