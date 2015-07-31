var origin = window.location.origin;
var pathname = window.location.pathname;
var baseUrl = origin;
require.config({
    baseUrl: baseUrl,
    paths: {
        "aurelia-binding": baseUrl + "/scripts/lib/aurelia-binding/dist/amd/aurelia-binding",
        "aurelia-bootstrapper": baseUrl + "/scripts/lib/aurelia-bootstrapper/dist/amd/aurelia-bootstrapper",
        "aurelia-dependency-injection": baseUrl + "/scripts/lib/aurelia-dependency-injection/dist/amd/aurelia-dependency-injection",
        "aurelia-event-aggregator": baseUrl + "/scripts/lib/aurelia-event-aggregator/dist/amd/aurelia-event-aggregator",
        "aurelia-framework": baseUrl + "/scripts/lib/aurelia-framework/dist/amd/aurelia-framework",
        "aurelia-history": baseUrl + "/scripts/lib/aurelia-history/dist/amd/aurelia-history",
        "aurelia-history-browser": baseUrl + "/scripts/lib/aurelia-history-browser/dist/amd/aurelia-history-browser",
        "aurelia-html-template-element": baseUrl + "/scripts/lib/aurelia-html-template-element/dist/amd/aurelia-html-template-element",
        "aurelia-loader": baseUrl + "/scripts/lib/aurelia-loader/dist/amd/aurelia-loader",
        "aurelia-loader-default": baseUrl + "/scripts/lib/aurelia-loader-default/dist/amd/aurelia-loader-default",
        "aurelia-logging": baseUrl + "/scripts/lib/aurelia-logging/dist/amd/aurelia-logging",
        "aurelia-logging-console": baseUrl + "/scripts/lib/aurelia-logging-console/dist/amd/aurelia-logging-console",
        "aurelia-metadata": baseUrl + "/scripts/lib/aurelia-metadata/dist/amd/aurelia-metadata",
        "aurelia-path": baseUrl + "/scripts/lib/aurelia-path/dist/amd/aurelia-path",
        "aurelia-route-recognizer": baseUrl + "/scripts/lib/aurelia-route-recognizer/dist/amd/aurelia-route-recognizer",
        "aurelia-router": baseUrl + "/scripts/lib/aurelia-router/dist/amd/aurelia-router",
        "aurelia-task-queue": baseUrl + "/scripts/lib/aurelia-task-queue/dist/amd/aurelia-task-queue",
        "aurelia-templating": baseUrl + "/scripts/lib/aurelia-templating/dist/amd/aurelia-templating",
        "aurelia-templating-binding": baseUrl + "/scripts/lib/aurelia-templating-binding/dist/amd/aurelia-templating-binding",

        "aurelia-templating-resources": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/aurelia-templating-resources",
        "compose": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/compose",
        "focus": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/focus",
        "global-behavior": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/global-behavior",
        "if": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/if",
        "repeat": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/repeat",
        "replaceable": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/replaceable",
        "sanitize-html": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/sanitize-html",
        "show": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/show",
        "with": baseUrl + "/scripts/lib/aurelia-templating-resources/dist/amd/with",

        "aurelia-templating-router": baseUrl + "/scripts/lib/aurelia-templating-router/dist/amd/aurelia-templating-router",
        "route-href": baseUrl + "/scripts/lib/aurelia-templating-router/dist/amd/route-href",
        "route-loader": baseUrl + "/scripts/lib/aurelia-templating-router/dist/amd/route-loader",
        "router-view": baseUrl + "/scripts/lib/aurelia-templating-router/dist/amd/router-view",

        "core-js": baseUrl + "/scripts/lib/core-js/client/core",
        "views": baseUrl + "/views",
        "underscore": baseUrl + "/scripts/lib/underscore/underscore-min"
    },
    shim: {
        "underscore": {
            exports: "_"
        }
    }
});

require(["aurelia-bootstrapper"], function (b) { });