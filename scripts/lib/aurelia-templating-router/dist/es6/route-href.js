import {customAttribute, bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';

@customAttribute('route-href')
@bindable({name: 'route', changeHandler: 'processChange'})
@bindable({name: 'params', changeHandler: 'processChange'})
@bindable({name: 'attribute', defaultValue: 'href'})
@inject(Router, Element)
export class RouteHref {
  constructor(router, element) {
    this.router = router;
    this.element = element;
  }

  bind() {
    this.processChange();
  }

  attributeChanged(value, previous) {
    if (previous) {
      this.element.removeAttribute(previous);
    }

    this.processChange();
  }

  processChange() {
    let href = this.router.generate(this.route, this.params);
    this.element.setAttribute(this.attribute, href);
  }
}