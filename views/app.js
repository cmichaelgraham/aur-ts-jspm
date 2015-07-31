define(["require", "exports"], function (require, exports) {
    var App = (function () {
        function App() {
            this.message = "Loaded using RequireJS";
        }
        App.prototype.activate = function () {
            var y = 3;
        };
        return App;
    })();
    exports.App = App;
    console.log("THIS APP RAN!");
});
//# sourceMappingURL=app.js.map