import template from 'lodash/template';

const apiUrl = {
    events: '/api/events',
    event: template('/api/events/<%= eventId %>'),
    nearEvent: '/api/events/near',
};

export default apiUrl;
