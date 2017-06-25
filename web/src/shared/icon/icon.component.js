import template from './icon.component.html';
import './icon.component.less';

const iconBaseUrl = '/assets/icons';

class IconComponentController {
    constructor() {
        this.iconUrl = '';
    }

    $onInit() {
        this.iconUrl = `${iconBaseUrl}/${this.iconName}.png`;
    }
}

const IconComponent = {
    template,
    controller: IconComponentController,
    bindings: {
        iconName: '@',
    },
};

export default IconComponent;
