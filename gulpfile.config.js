module.exports = function() {

    var config = {

        serverFiles: [
            'controllers/**/*', 'db/**/*', 'models/**/*', 'services/**/*', 'package.json', 'server.js'
        ],

        clientScriptsDev: [
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            'node_modules/angular2/bundles/angular2-polyfills.min.js',
            'node_modules/systemjs/dist/system.js',
            'node_modules/rxjs/bundles/Rx.min.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/http.min.js',
            'node_modules/angular2/bundles/router.min.js',
            'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js'
        ],

        clientCSSDev: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'public/content/site.css'
        ],
        
        clientScriptsProd: [
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            'node_modules/angular2/bundles/angular2-polyfills.min.js',
            'node_modules/systemjs/dist/system.js',
            'node_modules/rxjs/bundles/Rx.min.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/http.min.js',
            'node_modules/angular2/bundles/router.min.js',
            'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js'
        ],

        clientCSSProd: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'public/content/site.css'
        ]


    };

    return config;

}
