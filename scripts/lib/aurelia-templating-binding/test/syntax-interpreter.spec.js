import {SyntaxInterpreter} from '../src/syntax-interpreter';
import {
  Parser,
  ObserverLocator,
  EventManager,
  ListenerExpression,
  BindingExpression,
  NameExpression,
  CallExpression,
  bindingMode
} from 'aurelia-binding';

export function createElement(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstChild;
}

describe('SyntaxInterpreter', () => {
  describe('determineDefaultBindingMode', () => {
    var interpreter;

    beforeAll(() => {
      interpreter = new SyntaxInterpreter(new Parser(), new ObserverLocator(), new EventManager());
    });

    it('handles input', () => {
      var el = createElement('<input type="checkbox">');
      expect(interpreter.determineDefaultBindingMode(el, 'value')).toBe(bindingMode.twoWay);
      expect(interpreter.determineDefaultBindingMode(el, 'checked')).toBe(bindingMode.twoWay);
      expect(interpreter.determineDefaultBindingMode(el, 'foo')).toBe(bindingMode.oneWay);

      var el = createElement('<input type="file">');
      expect(interpreter.determineDefaultBindingMode(el, 'files')).toBe(bindingMode.twoWay);
    });

    it('handles textarea', () => {
      var el = createElement('<textarea></textarea>');
      expect(interpreter.determineDefaultBindingMode(el, 'value')).toBe(bindingMode.twoWay);
      expect(interpreter.determineDefaultBindingMode(el, 'foo')).toBe(bindingMode.oneWay);
    });

    it('handles textarea', () => {
      var el = createElement('<select></select>');
      expect(interpreter.determineDefaultBindingMode(el, 'value')).toBe(bindingMode.twoWay);
      expect(interpreter.determineDefaultBindingMode(el, 'foo')).toBe(bindingMode.oneWay);
    });

    it('handles contenteditable="true"', () => {
      var el = createElement('<div contenteditable="true"></div>');
      expect(interpreter.determineDefaultBindingMode(el, 'textcontent')).toBe(bindingMode.twoWay);
      expect(interpreter.determineDefaultBindingMode(el, 'innerhtml')).toBe(bindingMode.twoWay);
      expect(interpreter.determineDefaultBindingMode(el, 'foo')).toBe(bindingMode.oneWay);
    });

    it('handles contenteditable="false"', () => {
      var el = createElement('<div contenteditable="false"></div>');
      expect(interpreter.determineDefaultBindingMode(el, 'textcontent')).toBe(bindingMode.oneWay);
      expect(interpreter.determineDefaultBindingMode(el, 'innerhtml')).toBe(bindingMode.oneWay);
      expect(interpreter.determineDefaultBindingMode(el, 'foo')).toBe(bindingMode.oneWay);
    });

    it('handles inherited contenteditable', () => {
      var el = createElement('<div></div>');
      expect(interpreter.determineDefaultBindingMode(el, 'textcontent')).toBe(bindingMode.oneWay);
      expect(interpreter.determineDefaultBindingMode(el, 'innerhtml')).toBe(bindingMode.oneWay);
      expect(interpreter.determineDefaultBindingMode(el, 'foo')).toBe(bindingMode.oneWay);
    });

    it('handles scrolltop/scrollleft', () => {
      var el = createElement('<div></div>');
      expect(interpreter.determineDefaultBindingMode(el, 'scrolltop')).toBe(bindingMode.twoWay);
      expect(interpreter.determineDefaultBindingMode(el, 'scrollleft')).toBe(bindingMode.twoWay);
    });
  });
  describe('for', () => {
    var interpreter, info;

    beforeAll(() => {
      interpreter = new SyntaxInterpreter(new Parser(), new ObserverLocator(), new EventManager());
      info = {
        attrName: 'repeat',
        command: 'for',
        defaultBindingMode: 1
      };
    });

    it('throws on incorrect syntax', () => {
      info.attrValue = 'foo in items';
      expect(function(){interpreter.for({}, null, info, null)}).toThrow();
    });

    it('parses Array syntax', () => {
      info.attrValue = 'foo of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.local).toBe('foo');
    });

    it('parses destructuring syntax', () => {
      info.attrValue = '[foo, bar] of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.key).toBe('foo');
      expect(instruction.attributes.value).toBe('bar');
    });

    it('parses destructuring syntax without space after comma separator', () => {
      info.attrValue = '[foo,bar] of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.key).toBe('foo');
      expect(instruction.attributes.value).toBe('bar');
    });

    it('parses destructuring syntax with space inside brackets', () => {
      info.attrValue = '[ foo, bar ] of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.key).toBe('foo');
      expect(instruction.attributes.value).toBe('bar');
    });

    it('parses destructuring syntax with space before bracket', () => {
      info.attrValue = ' [foo, bar] of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.key).toBe('foo');
      expect(instruction.attributes.value).toBe('bar');
    });

    it('parses destructuring syntax without comma separator', () => {
      info.attrValue = '[foo bar] of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.key).toBe('foo');
      expect(instruction.attributes.value).toBe('bar');
    });

    it('parses destructuring syntax without space before of', () => {
      info.attrValue = '[foo, bar]of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.key).toBe('foo');
      expect(instruction.attributes.value).toBe('bar');
    });

    it('takes first two from destructuring array', () => {
      info.attrValue = '[foo, bar, baz] of items';
      var instruction = interpreter.for({}, null, info, null);
      expect(instruction.attributes.key).toBe('foo');
      expect(instruction.attributes.value).toBe('bar');
    });

  });
});
