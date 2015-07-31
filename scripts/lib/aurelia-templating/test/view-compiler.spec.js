import {ViewCompiler} from '../src/view-compiler';
import {ViewResources, ResourceRegistry} from '../src/resource-registry';

class MockBindingLanguage {
  inspectAttribute(resources, attrName, attrValue){
  }

  createAttributeInstruction(resources, element, info, existingInstruction){
  }

  parseText(resources, value){
  }
}

describe('compileNode', () => {
  var viewCompiler, language, resources;
  beforeAll(() => {
    language = new MockBindingLanguage();
    viewCompiler = new ViewCompiler(language);
    resources = new ViewResources(new ResourceRegistry(), 'app.html');
  });

  it('concatenates adjacent text nodes', () => {
    var instructions = [], parentInjectorId = 'root', targetLightDOM = true,
        node, parentNode;

    parentNode = document.createElement('div');
    node = document.createTextNode('Hello');
    parentNode.appendChild(node);
    parentNode.appendChild(document.createTextNode(' '));
    parentNode.appendChild(document.createTextNode('World'));
    parentNode.appendChild(document.createTextNode('!'));
    spyOn(language, 'parseText');

    node = viewCompiler.compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
    expect(language.parseText).toHaveBeenCalledWith(resources, 'Hello World!');
    expect(node).toBe(null);
  });

  it('does not concatenate non-adjacent text nodes', () => {
    var instructions = [], parentInjectorId = 'root', targetLightDOM = true,
        node, parentNode, nextNode;

    parentNode = document.createElement('div');
    node = document.createTextNode('Hello');
    parentNode.appendChild(node);
    parentNode.appendChild(document.createTextNode(' '));
    nextNode = document.createElement('em');
    nextNode.textContent = 'World';
    parentNode.appendChild(nextNode);
    parentNode.appendChild(document.createTextNode('!'));
    spyOn(language, 'parseText');

    node = viewCompiler.compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
    expect(language.parseText).toHaveBeenCalledWith(resources, 'Hello ');
    expect(node).toBe(nextNode);
  });

  it('clears class attributes containing interpolation expressions', () => {
    var instructions = [], parentInjectorId = 'root', targetLightDOM = true,
        node = document.createElement('div'), parentNode = null;
    node.setAttribute('class', 'foo ${bar} baz');
    spyOn(language, 'inspectAttribute').and.returnValue({ attrName: 'class', expression: {attrToRemove:'class'}, command: null });
    spyOn(language, 'createAttributeInstruction').and.returnValue({ attributes:{ 'class': { discrete:true,attrToRemove:'class' } }, attrName:'class'  });
    viewCompiler.compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
    expect(node.className).toBe('au-target');
  });

  it('does not clear class attributes with no interpolation expressions', () => {
    var instructions = [], parentInjectorId = 'root', targetLightDOM = true,
        node = document.createElement('div'), parentNode = null;

    node.setAttribute('class', 'foo bar baz');
    node.setAttribute('class.bind', 'someProperty');

    spyOn(language, 'inspectAttribute').and.callFake((resources, attrName, attrValue) => {
      if (attrName === 'class') {
        return { attrName: 'class', expression: null, command: null }
      } else {
        return { attrName: 'class', expression: null, command: 'bind' };
      }
    });

    spyOn(language, 'createAttributeInstruction').and.callFake((resources, node, info) => {
      if(info.command){
        return { attributes:{ 'class': { discrete:true } }, attrName:'class'  };
      }else{
        return null;
      }
    });

    viewCompiler.compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
    expect(node.className).toBe('foo bar baz au-target');
  });

});
