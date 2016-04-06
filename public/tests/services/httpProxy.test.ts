import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
    injectAsync,

} from 'angular2/testing';

import {HttpProxy} from './../../httpProxy/httpProxy';
import {AuthService} from './../../services/auth.service';
import {provide} from 'angular2/core';


import {Http, HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions, RequestOptionsArgs, Headers} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {MockAuthService} from './mock.services.test';


describe('httpProxy', () => {

    beforeEachProviders(() => [
        HttpProxy,
        HTTP_PROVIDERS,
        provide(AuthService, { useClass: MockAuthService }),
        provide(XHRBackend, { useClass: MockBackend })
    ]);

    describe('#get()', () => {
        it('get should return something', inject([XHRBackend, HttpProxy], (mockBackend, httpProxy) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    var options = new ResponseOptions({
                        body: { "data": "test data..." }
                    });
                    connection.mockRespond(new Response(options));
                });

            httpProxy.get("/something").subscribe((res: Response) => {
                var data = res.json();
                expect(data.data).toBe("test data...");
            });
        }));

        it('it should add auth header when specified', inject([XHRBackend, HttpProxy], (mockBackend, httpProxy) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    var authHeader = connection.request.headers.get("Authorization");
                    var options = new ResponseOptions({
                        body: { "authHeader": authHeader }
                    });
                    connection.mockRespond(new Response(options));
                });

            httpProxy.get("/something", null, false).subscribe((res: Response) => {
                var data = res.json();
                expect(data.authHeader).toBe("Bearer Mock-token");
            });
        }));

        it('it should support customised header', inject([XHRBackend, HttpProxy], (mockBackend, httpProxy) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    var customHeader = connection.request.headers.get("Custom-Header");
                    var options = new ResponseOptions({
                        body: { "customHeader": customHeader }
                    });
                    connection.mockRespond(new Response(options));
                });

            let requestOptions: RequestOptionsArgs = {};
            requestOptions.headers = new Headers();
            requestOptions.headers.append("Custom-Header", "custom test header");

            httpProxy.get("/something", requestOptions, false).subscribe((res: Response) => {
                var data = res.json();
                expect(data.customHeader).toBe("custom test header");
            });
        }));

    });

    describe('#post()', () => {
        it('Post should post data', inject([XHRBackend, HttpProxy], (mockBackend, httpProxy: HttpProxy) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    var body = connection.request.text();
                    var options = new ResponseOptions({
                        body: JSON.parse(body.toString())
                    });
                    connection.mockRespond(new Response(options));
                });

            httpProxy.post("/something", '{ "postData": "some data"}', "applcation/json").subscribe((res: Response) => {
                var data = res.json();
                expect(data.postData).toBe("some data");
            });
        }));
        
        it('Post should be able to send content type header', inject([XHRBackend, HttpProxy], (mockBackend, httpProxy: HttpProxy) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    var contentType = connection.request.headers.get("Content-Type");
                    var options = new ResponseOptions({
                        body: {contentType: contentType}
                    });
                    connection.mockRespond(new Response(options));
                });

            httpProxy.post("/something", '{ "postData": "some data"}', "applcation/json").subscribe((res: Response) => {
                var data = res.json();
                expect(data.contentType).toBe("applcation/json");
            });
        }));
        
    });



});