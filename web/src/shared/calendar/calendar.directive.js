import $ from 'jquery';
import moment from 'moment';
import template from './calendar.directive.html';
import './calendar.directive.less';

function CalendarDirective() {
    const config = {
        template,
        restrict: 'E',
        replace: false,
        scope: {
            events: '<',
            favorites: '<',
            onClickEvent: '&',
            onNavigate: '&',
        },
    };

    config.link = function link(scope, elem) {
        const $elem = $(elem).find('.Calendar__inner');

        $elem.fullCalendar({
            locale: 'ko',
            height: 'parent',
            eventBackgroundColor: '#6F59D3',
            eventBorderColor: '#6F59D3',
            eventClick(event) {
                scope.onClickEvent({ event });
                scope.$apply();
            },
            eventAfterAllRender() {
                $('.fc-bg td').each(function each() {
                    $(this).removeClass('IS_MY_FAVORITE');
                });

                scope.favorites
                    .map(favorite => moment(favorite).format('YYYY-MM-DD'))
                    .forEach((date) => {
                        $(`.fc-bg td[data-date=${date}]`).addClass('IS_MY_FAVORITE');
                    });
            },
            viewRender(view) {
                const date = moment(view.currentDate);
                const year = date.year();
                const month = date.month() + 1;

                scope.onNavigate({ year, month });
            },
        });

        scope.$watch('events', (newValue, oldValue) => {
            if (!newValue) return;
            if (newValue === oldValue) return;

            const events = newValue.map(event => ({
                id: event.id,
                title: event.title,
                start: moment(event.date).format('YYYY-MM-DD'),
                allDay: true,
            }));

            for (let idx = 0; idx < events.length; idx += 1) {
                $elem.fullCalendar('renderEvent', events[idx]);
            }

            // scope.$apply();
        });
    };

    return config;
}

export default CalendarDirective;
