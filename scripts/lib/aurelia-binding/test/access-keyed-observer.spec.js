import {bindingMode} from '../src/binding-mode';
import {
  createElement,
  fireEvent,
  checkDelay,
  createObserverLocator,
  getBinding
} from './shared';

describe('AccessKeyedObserver', () => {
  var observerLocator;

  beforeAll(() => {
    observerLocator = createObserverLocator();
  });

  describe('object property, key property', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { record: { person: { first: 'John', last: 'Doe' } }, key: 'first' };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, 'record.person[key]', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe(obj.record.person[obj.key]);
    });

    it('responds to property change', done => {
      obj.record.person[obj.key] = 'Jeremy';
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key]);
        done();
      }, checkDelay * 2);
    });

    it('responds to object change', done => {
      obj.record.person = { first: 'Johnny', last: 'Trejo' };
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key]);
        done();
      }, checkDelay * 2);
    });

    it('responds to path change', done => {
      obj.record = { person: { first: 'Donald', last: 'Draper' } };
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key]);
        done();
      }, checkDelay * 2);
    });

    it('responds to key change', done => {
      obj.key = 'last';
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key]);
        done();
      }, checkDelay * 2);
    });

    it('responds to element change', done => {
      el.value = 'Jake';
      fireEvent(el, 'change');
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key]);
        done();
      }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('object property, key property 2', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { record: { person: { first: { value: 'John', lastUpdated: new Date() }, last: { value: 'Doe', lastUpdated: new Date() } } }, key: 'first' };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, 'record.person[key].value', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe(obj.record.person[obj.key].value);
    });

    it('responds to property change', done => {
      obj.record.person[obj.key].value = 'Jeremy';
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key].value);
        done();
      }, checkDelay * 2);
    });

    it('responds to object change', done => {
      obj.record.person = { first: { value: 'Johnny', lastUpdated: new Date() }, last:{ value: 'Trejo', lastUpdated: new Date() } };
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key].value);
        done();
      }, checkDelay * 2);
    });

    it('responds to path change', done => {
      obj.record = { person: { first: { value: 'Vincent', lastUpdated: new Date() }, last:{ value: 'Chase', lastUpdated: new Date() } } };
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key].value);
        done();
      }, checkDelay * 2);
    });

    it('responds to key change', done => {
      obj.key = 'last';
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key].value);
        done();
      }, checkDelay * 2);
    });

    it('responds to element change', done => {
      el.value = 'Jake';
      fireEvent(el, 'change');
      setTimeout(() => {
        expect(el.value).toBe(obj.record.person[obj.key].value);
        done();
      }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('object literal, key property', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { key: 'first' };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, '{ first: \'John\', last: \'Doe\' }[key]', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe('John');
    });

    it('responds to key change', done => {
      obj.key = 'last';
      setTimeout(() => {
        expect(el.value).toBe('Doe');
        done();
      }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('object property, key literal', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { person: { first: 'John', last: 'Doe' } };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, 'person[\'first\']', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe(obj.person['first']);
    });

    it('responds to property change', done => {
      obj.person[obj.key] = 'Jeremy';
      setTimeout(() => {
        expect(el.value).toBe(obj.person['first']);
        done();
        }, checkDelay * 2);
    });

    it('responds to object change', done => {
      obj.person = { first: 'Johnny', last: 'Trejo' };
      setTimeout(() => {
        expect(el.value).toBe(obj.person['first']);
        done();
        }, checkDelay * 2);
    });

    it('responds to element change', done => {
      el.value = 'Jake';
      fireEvent(el, 'change');
      setTimeout(() => {
        expect(el.value).toBe(obj.person['first']);
        done();
        }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('object literal, key literal', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = {};
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, '{ first: \'John\', last: \'Doe\' }[\'first\']', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe('John');
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('array property, numeric key property', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { array: ['a', 'b', 'c'], key: 1 };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, 'array[key]', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe(obj.array[obj.key]);
    });

    it('responds to property change', done => {
      obj.array[obj.key] = 'foo';
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to array change', done => {
      obj.array = ['x', 'y', 'z']
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to key change', done => {
      obj.key = 2;
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to out of bounds key change', done => {
      obj.key = 99;
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        obj.key = 1;
        done();
        }, checkDelay * 2);
    });

    it('responds to element change', done => {
      el.value = 'bar';
      fireEvent(el, 'change');
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('array property, string key property', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { array: ['a', 'b', 'c'], key: '1' };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, 'array[key]', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe(obj.array[obj.key]);
    });

    it('responds to property change', done => {
      obj.array[obj.key] = 'foo';
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to array change', done => {
      obj.array = ['x', 'y', 'z']
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to key change', done => {
      obj.key = '2';
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to out of bounds key change', done => {
      obj.key = '99';
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        obj.key = '1';
        done();
        }, checkDelay * 2);
    });

    it('responds to element change', done => {
      el.value = 'bar';
      fireEvent(el, 'change');
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('array property, numeric key literal', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { array: ['a', 'b', 'c'], key: 1 };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, 'array[1]', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe(obj.array[obj.key]);
    });

    it('responds to property change', done => {
      obj.array[obj.key] = 'foo';
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to array change', done => {
      obj.array = ['x', 'y', 'z']
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('responds to element change', done => {
      el.value = 'bar';
      fireEvent(el, 'change');
      setTimeout(() => {
        expect(el.value).toBe(obj.array[obj.key]);
        done();
        }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });

  describe('array literal, numeric key property', () => {
    var obj, el, binding;

    beforeAll(() => {
      obj = { key: 1 };
      el = createElement('<input type="text" />');
      document.body.appendChild(el);
      binding = getBinding(observerLocator, obj, '[\'a\', \'b\', \'c\'][key]', el, 'value', bindingMode.twoWay).binding;
    });

    it('binds', () => {
      binding.bind(obj);
      expect(el.value).toBe('b');
    });

    it('responds to key change', done => {
      obj.key = 2;
      setTimeout(() => {
        expect(el.value).toBe('c');
        done();
        }, checkDelay * 2);
    });

    it('responds to out of bounds key change', done => {
      obj.key = 99;
      setTimeout(() => {
        expect(el.value).toBe('undefined');
        obj.key = 1;
        done();
        }, checkDelay * 2);
    });

    it('unbinds', () => {
      binding.unbind();
    });

    afterAll(() => {
      document.body.removeChild(el);
    });
  });
});
