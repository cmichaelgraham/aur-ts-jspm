System.register([], function (_export) {
  'use strict';

  var History;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      History = (function () {
        function History() {
          _classCallCheck(this, History);
        }

        History.prototype.activate = function activate(options) {
          throw new Error('History must implement activate().');
        };

        History.prototype.deactivate = function deactivate() {
          throw new Error('History must implement deactivate().');
        };

        History.prototype.navigate = function navigate(fragment, options) {
          throw new Error('History must implement navigate().');
        };

        History.prototype.navigateBack = function navigateBack() {
          throw new Error('History must implement navigateBack().');
        };

        return History;
      })();

      _export('History', History);
    }
  };
});