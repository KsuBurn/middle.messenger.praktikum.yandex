import Sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { HTTPTransport } from '../HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport test', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let httpTransport: HTTPTransport;
    let requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = Sinon.useFakeXMLHttpRequest();
        global.XMLHttpRequest = xhr as any;
        xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        };
        httpTransport = new HTTPTransport('/');
    });

    afterEach(() => {
        xhr.restore();
        requests = [];
    });

    it('should send a GET request', async () => {
        httpTransport.get({ url: 'test' });
        const [currentRequest] = requests;

        expect(currentRequest.method).to.be.eq('GET');
        expect(currentRequest.url).to.be.eq('https://ya-praktikum.tech/api/v2/test');
    });

    it('Should send POST request', async () => {
        httpTransport.post({ url: 'test' });
        const [currentRequest] = requests;

        expect(currentRequest.method).to.be.eq('POST');
        expect(currentRequest.url).to.be.eq('https://ya-praktikum.tech/api/v2/test');
    });

    it('Should send PUT request', async () => {
        httpTransport.put({ url: 'test' });
        const [currentRequest] = requests;

        expect(currentRequest.method).to.be.eq('PUT');
        expect(currentRequest.url).to.be.eq('https://ya-praktikum.tech/api/v2/test');
    });

    it('Should send DELETE request', async () => {
        httpTransport.delete({ url: 'test' });
        const [currentRequest] = requests;

        expect(currentRequest.method).to.be.eq('DELETE');
        expect(currentRequest.url).to.be.eq('https://ya-praktikum.tech/api/v2/test');
    });
})
