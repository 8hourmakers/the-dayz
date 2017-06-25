import moment from 'moment';
import apiUrl from '../constants/api-url';
import template from './event-detail.component.html';
import './event-detail.component.less';

class EventDetailController {
    constructor($state, httpService, storageService) {
        this.$state = $state;
        this.httpService = httpService;
        this.storageService = storageService;
    }

    $onInit() {
        this.isFavorite = false;
        this.data = {
            key: null,
            type: '',
            date: new Date(),
            isLunar: false,
            title: '',
            summary: '',
            content: '',
        };

        const eventId = this.$state.params.id;

        this.httpService
            .get(apiUrl.event({ eventId }))
            .then((res) => {
                const data = res.data;
                const date = new Date(data.date);

                this.data.id = data.id;
                this.data.key = `${moment(date).year()}-${data.id}`;
                this.data.type = data.type;
                this.data.date = date;
                this.data.isLunar = data.is_lunar;
                this.data.title = data.title;
                this.data.summary = data.summary;
                this.data.content = data.content;

                this.checkIsFavorite();
            });
    }

    checkIsFavorite() {
        this.isFavorite = this.storageService.isItemExists(this.data.key);
    }

    toggleFavorite() {
        const key = this.data.key;

        if (this.storageService.isItemExists(key)) {
            this.storageService.removeItem(key);
        } else {
            this.storageService.setItem(key, this.data);
        }

        this.checkIsFavorite();
    }

    backToHome() {
        this.$state.go('home');
    }
}

EventDetailController.$inject = [
    '$state',
    'httpService',
    'storageService',
];

const EventDetailComponent = {
    template,
    controller: EventDetailController,
};

export default EventDetailComponent;
