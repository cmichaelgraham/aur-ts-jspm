import {History} from 'aurelia-history';
import {Container} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AppRouter} from '../src/app-router';
import {PipelineProvider} from '../src/pipeline-provider';
import {RouteLoader} from '../src/route-loading';
import {Pipeline} from '../src/pipeline';

class MockHistory extends History {
  activate() {}
  deactivate() {}
  navigate() {}
  navigateBack() {}
}

class MockEventAggregator {
  publish(name, data) {}
}

class MockLoader extends RouteLoader {
  loadRoute(router, config) {
    return Promise.resolve({
      executionContext: {}
    });
  }
}

describe('app-router', () => {
  let router;
  let history;
  let ea;
  let viewPort;
  let container;
  let instruction;
  let provider;
  let pipelineStep;

  beforeEach(() => {
    history = new MockHistory();
    container = new Container();
    container.registerSingleton(RouteLoader, MockLoader);
    ea = { publish(){} };
    viewPort = {
      process(viewPortInstruction) {
        viewPortInstruction.behavior = {};
        return Promise.resolve();
      },
      swap() {}
    };

    instruction = { resolve() {} };
    provider = {
      createPipeline() {
        let p = new Pipeline();
        p.withStep({ run(ctx, next) { return pipelineStep(ctx, next); } });
        return p;
      }
    };

    router = new AppRouter(container, history, provider, ea);
  });

  it('configures from root view model configureRouter method', (done) => {
    let routeConfig = { route: '', moduleId: './test' };
    let viewModel = {
      configureRouter(config) {
        config.map([routeConfig]);
      }
    };

    spyOn(viewModel, 'configureRouter').and.callThrough();

    container.viewModel = viewModel;

    expect(router.isConfigured).toBe(false);
    expect(router.routes.length).toBe(0);

    Promise.resolve(router.registerViewPort(viewPort))
      .then(result => {
        expect(viewModel.configureRouter).toHaveBeenCalled();
        expect(router.isConfigured).toBe(true);
        expect(router.routes.length).toBe(1);
        expect(router.routes[0]).toEqual(jasmine.objectContaining(routeConfig));
        done();
      });
  });

  describe('dequeueInstruction', () => {
    let processingResult;
    let completedResult;

    beforeEach(() => {
      router.queue.push(instruction);

      spyOn(ea, 'publish');
      processingResult = jasmine.objectContaining({ instruction });
      completedResult = jasmine.objectContaining({ instruction, result: jasmine.objectContaining({}) })
    });

    it('triggers events on successful navigations', (done) => {
      pipelineStep = (ctx, next) => next.complete({});

      router.dequeueInstruction()
        .then(result => {
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:processing', processingResult);
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:success', completedResult);
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:complete', completedResult);
        })
        .catch(expectSuccess)
        .then(done);
    });

    it('returns expected results from successful navigations', (done) => {
      let output = {};
      pipelineStep = (ctx, next) => next.complete(output);

      router.dequeueInstruction()
        .then(result => {
          expect(result.completed).toBe(true);
          expect(result.status).toBe('completed');
          expect(result.output).toBe(output);
          expect(result.context).toBeTruthy();
        })
        .catch(expectSuccess)
        .then(done);
    });

    it('triggers events on canceled navigations', (done) => {
      pipelineStep = (ctx, next) => next.cancel('test');

      router.dequeueInstruction()
        .then(result => {
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:processing', processingResult);
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:canceled', completedResult);
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:complete', completedResult);
        })
        .catch(expectSuccess)
        .then(done);
    });

    it('returns expected results from canceled navigations', (done) => {
      let output = {};
      pipelineStep = (ctx, next) => next.cancel(output);

      router.dequeueInstruction()
        .then(result => {
          expect(result.completed).toBe(false);
          expect(result.status).toBe('cancelled');
          expect(result.output).toBe(output);
          expect(result.context).toBeTruthy();
        })
        .catch(expectSuccess)
        .then(done);
    });

    it('triggers events on error navigations', (done) => {
      pipelineStep = (ctx, next) => { throw new Error('test'); };

      router.dequeueInstruction()
        .then(result => {
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:processing', processingResult);
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:error', completedResult);
          expect(ea.publish).toHaveBeenCalledWith('router:navigation:complete', completedResult);
        })
        .catch(expectSuccess)
        .then(done);
    });

    it('returns expected results from error navigations', (done) => {
      let output = new Error('test');
      pipelineStep = (ctx, next) => next.reject(output);

      router.dequeueInstruction()
        .then(result => {
          expect(result.completed).toBe(false);
          expect(result.status).toBe('rejected');
          expect(result.output).toBe(output);
          expect(result.context).toBeTruthy();
        })
        .catch(expectSuccess)
        .then(done);
    });
  });

  describe('loadUrl', () => {
    it('restores previous location when route not found', (done) => {
      spyOn(history, 'navigate');

      router.history.previousLocation = 'prev';
      router.loadUrl('next')
        .then(result => {
          expect(result).toBeFalsy();
          expect(history.navigate).toHaveBeenCalledWith('#/prev', { trigger: false, replace: true });
        })
        .catch(result => expect(true).toBeFalsy('should have succeeded'))
        .then(done);
    });

    it('restores previous location on error', (done) => {
      spyOn(history, 'navigate');

      router.history.previousLocation = 'prev';
      router.activate();
      router.configure(config => {
        config.map([
          { name: 'test', route: '', moduleId: './test' }
        ]);
      });

      router.loadUrl('next')
        .then(result => {
          expect(result).toBeFalsy();
          expect(history.navigate).toHaveBeenCalledWith('#/prev', { trigger: false, replace: true });
        })
        .catch(result => expect(true).toBeFalsy('should have succeeded'))
        .then(done);
    });
  });
});

function expectSuccess(result) {
  expect(result).not.toBe(result, 'should have succeeded');
}
