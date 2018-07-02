import { expect } from 'chai';
import sinon from 'sinon';
import jsRequestInternal from '../src/jsRequestInternal';

const createGetSpy = () => {
    const axiosMock = sinon.spy();
    const getStub = sinon.stub();
    const createStub = sinon.stub();

    axiosMock.get = getStub;
    createStub.returns(axiosMock);
    axiosMock.create = createStub;
    return axiosMock;
};

describe('jsRequestInterna', () => {


    it('is instantiable', () => {
        const instance = jsRequestInternal(createGetSpy());
        expect(instance).to.deep.equal(instance);
    });

    it('sets the base-url correctly', () => {
        const axiosMock = sinon.spy();
        const getStub = sinon.stub();
        const createStub = sinon.stub();


        axiosMock.get = getStub;
        createStub.returns(axiosMock);
        axiosMock.create = createStub;
        const baseUrl = 'https://testUrl.com';
        
        const instance = jsRequestInternal(axiosMock);
        instance.setBaseUrl(baseUrl);
        const config = { baseURL : baseUrl };
        instance.get('something');

        expect(createStub.calledWith(config)).to.eq(true);
    });

    describe('it calls the right axios functions', () => {
        it ('calls the get function', () => {
            const axiosMock = sinon.spy();
            const getStub = sinon.stub();
            const createStub = sinon.stub();

            axiosMock.get = getStub;
            createStub.returns(axiosMock);
            axiosMock.create = createStub;

            const instance = jsRequestInternal(axiosMock);

            instance.get('http://testUrl');
            expect(getStub.calledOnce).to.eq(true);
        });
        it ('calls the post function', () => {

            const axiosMock = sinon.spy();
            const postStub = sinon.stub();
            const createStub = sinon.stub();

            const testCases = [
                {url : 'testUrl.com' , data :  { someData : 'test'} },
                {url : 'anUrl.com' , data :  { someData : true, somethingElse : 22 } },
                {url : 'somethingElse.com' , data :  { someData : { someMoreData : { someKey : 'someValue' } } } },
            ];

            axiosMock.post = postStub;
            createStub.returns(axiosMock);
            axiosMock.create = createStub;
            const instance = jsRequestInternal(axiosMock);

            let i = 1;
            for (const testCase of testCases) {
                instance.post(testCase.url, testCase.data);
                expect(postStub.callCount).to.eq(i);
                expect(postStub.calledWith(testCase.url, testCase.data)).to.eq(true);
                i++;
            }
        });

    })

});