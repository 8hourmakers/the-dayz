import moment from 'moment';
import apiUrl from '../constants/api-url';
import template from './timeline.component.html';
import './timeline.component.less';

class TimelineController {
    constructor($state, httpService, storageService) {
        this.$state = $state;
        this.httpService = httpService;
        this.storageService = storageService;
    }

    $onInit() {
        this.eventList = [];
        this.favoriteDates = [];
    }

    goBack() {
        this.$state.go('home');
    }

    showDetail(event) {
        this.$state.go('eventDetail', { id: event.id });
    }

    fetchEvents(year, month) {
        this.httpService
            .get(apiUrl.events, { params: { year, month } })
            .then((res) => {
                this.eventList = res.data.map((event) => {
                    const thisYear = moment().year();

                    return Object.assign({}, event, {
                        date: `${thisYear}-${event.converted_date}`,
                    });
                });
                this.getFavorites();
            });
    }

    getFavorites() {
        this.favoriteDates = [];

        this.eventList.forEach((event) => {
            const key = `${moment(event.date).year()}-${event.id}`;

            if (this.storageService.isItemExists(key)) {
                this.favoriteDates.push(moment(event.date).format('YYYY-MM-DD'));
            }
        });
    }
}

TimelineController.$inject = [
    '$state',
    'httpService',
    'storageService',
];

const TimelineComponent = {
    template,
    controller: TimelineController,
};

export default TimelineComponent;
