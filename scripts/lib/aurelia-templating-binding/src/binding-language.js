import {BindingLanguage} from 'aurelia-templating';
import {Parser, ObserverLocator, BindingExpression, NameExpression, bindingMode} from 'aurelia-binding';
import {SyntaxInterpreter} from './syntax-interpreter';
import * as LogManager from 'aurelia-logging';

var info = {},
    logger = LogManager.getLogger('templating-binding');

export class TemplatingBindingLanguage extends BindingLanguage {
  static inject() { return [Parser, ObserverLocator, SyntaxInterpreter]; }
	constructor(parser, observerLocator, syntaxInterpreter){
    super();
    this.parser = parser;
    this.observerLocator = observerLocator;
    this.syntaxInterpreter = syntaxInterpreter;
    this.emptyStringExpression = this.parser.parse('\'\'');
    syntaxInterpreter.language = this;
    this.attributeMap = syntaxInterpreter.attributeMap = {
      'contenteditable':'contentEditable',
      'for':'htmlFor',
      'tabindex':'tabIndex',
      'textcontent': 'textContent',
      'innerhtml': 'innerHTML',
      // HTMLInputElement https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
      'maxlength':'maxLength',
      'minlength':'minLength',
      'formaction':'formAction',
      'formenctype':'formEncType',
      'formmethod':'formMethod',
      'formnovalidate':'formNoValidate',
      'formtarget':'formTarget',
      'rowspan':'rowSpan',
      'colspan':'colSpan',
      'scrolltop':'scrollTop',
      'scrollleft':'scrollLeft',
      'readonly':'readOnly'
    };
  }

  inspectAttribute(resources, attrName, attrValue){
    var parts = attrName.split('.');

    info.defaultBindingMode = null;

    if(parts.length == 2){
      info.attrName = parts[0].trim();
      info.attrValue = attrValue;
      info.command = parts[1].trim();

      if(info.command === 'ref'){
        info.expression = new NameExpression(attrValue, info.attrName);
        info.command = null;
        info.attrName = 'ref';
      } else{
        info.expression = null;
      }
    }else if(attrName == 'ref'){
      info.attrName = attrName;
      info.attrValue = attrValue;
      info.command = null;
      info.expression = new NameExpression(attrValue, 'element');
    }else{
      info.attrName = attrName;
      info.attrValue = attrValue;
      info.command = null;
      info.expression = this.parseContent(resources, attrName, attrValue);
    }

    return info;
  }

	createAttributeInstruction(resources, element, info, existingInstruction){
    var instruction;

    if(info.expression){
      if(info.attrName === 'ref'){
        return info.expression;
      }

      instruction = existingInstruction || {attrName:info.attrName, attributes:{}};
      instruction.attributes[info.attrName] = info.expression;
    } else if(info.command){
      instruction = this.syntaxInterpreter.interpret(
        resources,
        element,
        info,
        existingInstruction
      );
    }

		return instruction;
	}

  parseText(resources, value){
    return this.parseContent(resources, 'textContent', value);
  }

  parseContent(resources, attrName, attrValue){
    var i = attrValue.indexOf('${', 0), ii = attrValue.length,
        char, pos = 0, open = 0, quote = null, interpolationStart,
        parts, partIndex = 0;
    while(i >= 0 && i < ii - 2) {
      open = 1;
      interpolationStart = i;
      i += 2;

      do {
        char = attrValue[i];
        i++;
        switch(char) {
          case "'":
          case '"':
            if (quote === null) {
              quote = char;
            } else if (quote === char) {
              quote = null;
            }
            continue;
          case '\\':
            i++;
            continue;
        }

        if (quote !== null) {
          continue;
        }

        if (char === '{') {
          open++;
        } else if (char === '}') {
          open--;
        }
      } while(open > 0 && i < ii)

      if (open === 0) {
        // lazy allocate array
        parts = parts || [];
        if (attrValue[interpolationStart - 1] === '\\' && attrValue[interpolationStart - 2] !== '\\') {
          // escaped interpolation
          parts[partIndex] = attrValue.substring(pos, interpolationStart - 1) + attrValue.substring(interpolationStart, i);
          partIndex++;
          parts[partIndex] = this.emptyStringExpression;
          partIndex++;
        } else {
          // standard interpolation
          parts[partIndex] = attrValue.substring(pos, interpolationStart);
          partIndex++;
          parts[partIndex] = this.parser.parse(attrValue.substring(interpolationStart + 2, i - 1));
          partIndex++;
        }
        pos = i;
        i = attrValue.indexOf('${', i);
      } else {
        break;
      }
    }

    // no interpolation.
    if (partIndex === 0) {
      return null;
    }

    // literal.
    parts[partIndex] = attrValue.substr(pos);

    return new InterpolationBindingExpression(
      this.observerLocator,
      this.attributeMap[attrName] || attrName,
      parts,
      bindingMode.oneWay,
      resources.valueConverterLookupFunction,
      attrName
    );
  }
}

export class InterpolationBindingExpression {
  constructor(observerLocator, targetProperty, parts,
    mode, valueConverterLookupFunction, attribute){
    this.observerLocator = observerLocator;
    this.targetProperty = targetProperty;
    this.parts = parts;
    this.mode = mode;
    this.valueConverterLookupFunction = valueConverterLookupFunction;
    this.attribute = this.attrToRemove = attribute;
    this.discrete = false;
  }

  createBinding(target){
    return new InterpolationBinding(
      this.observerLocator,
      this.parts,
      target,
      this.targetProperty,
      this.mode,
      this.valueConverterLookupFunction
      );
  }
}

class InterpolationBinding {
  constructor(observerLocator, parts, target, targetProperty, mode, valueConverterLookupFunction){
    if (targetProperty === 'style') {
      logger.info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
    } else if (target.parentElement && target.parentElement.nodeName === 'TEXTAREA' && targetProperty === 'textContent') {
      throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
    }
    this.observerLocator = observerLocator;
    this.parts = parts;
    this.targetProperty = observerLocator.getObserver(target, targetProperty);
    this.mode = mode;
    this.valueConverterLookupFunction = valueConverterLookupFunction;
    this.toDispose = [];
  }

  getObserver(obj, propertyName){
    return this.observerLocator.getObserver(obj, propertyName);
  }

  bind(source){
    this.source = source;

    if(this.mode == bindingMode.oneWay){
      this.unbind();
      this.connect();
      this.setValue();
    }else{
      this.setValue();
    }
  }

  setValue(){
    var value = this.interpolate();
    this.targetProperty.setValue(value);
  }

  partChanged(newValue, oldValue, connecting){
    var map, info;
    if (!connecting) {
      this.setValue();
    }
    if (oldValue instanceof Array) {
      map = this.arrayPartMap;
      info = map ? map.get(oldValue) : null;
      if (info) {
        info.refs--;
        if (info.refs === 0) {
          info.dispose();
          map.delete(oldValue);
        }
      }
    }
    if (newValue instanceof Array) {
      map = this.arrayPartMap || (this.arrayPartMap = new Map());
      info = map.get(newValue);
      if (!info) {
        info = {
          refs: 0,
          dispose: this.observerLocator.getArrayObserver(newValue).subscribe(() => this.setValue())
        }
        map.set(newValue, info);
      }
      info.refs++;
    }
  }

  connect(){
    var info,
        parts = this.parts,
        source = this.source,
        toDispose = this.toDispose = [],
        partChanged = this.partChanged.bind(this),
        i, ii;

    for(i = 0, ii = parts.length; i < ii; ++i){
      if (i % 2 === 0) {
        //do nothing
      } else {
        info = parts[i].connect(this, source);
        if(info.observer){
          toDispose.push(info.observer.subscribe(partChanged));
        }
        if (info.value instanceof Array) {
          partChanged(info.value, undefined, true);
        }
      }
    }
  }

  interpolate(){
    var value = '',
        parts = this.parts,
        source = this.source,
        valueConverterLookupFunction = this.valueConverterLookupFunction,
        i, ii, temp;

    for(i = 0, ii = parts.length; i < ii; ++i){
      if (i % 2 === 0) {
        value += parts[i];
      } else {
        temp = parts[i].evaluate(source, valueConverterLookupFunction);
        value += (typeof temp !== 'undefined' && temp !== null ? temp.toString() : '');
      }
    }

    return value;
  }

  unbind(){
    var i, ii, toDispose = this.toDispose, map = this.arrayPartMap;

    if(toDispose){
      for(i = 0, ii = toDispose.length; i < ii; ++i){
        toDispose[i]();
      }
    }

    this.toDispose = null;

    if (map) {
      for(toDispose of map.values()) {
        toDispose.dispose();
      }
      map.clear();
    }

    this.arrayPartMap = null;
  }
}
