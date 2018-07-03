import { expect } from 'chai';
import sinon from 'sinon';
import jsRequestInternal from '../src/jsRequestInternal';

const mockFactory = () => {
    const axiosMock = sinon.spy();

    const createStub = sinon.stub();
    createStub.returns(axiosMock);
    axiosMock.create = createStub;

    const getStub = sinon.stub();
    const postStub = sinon.stub();
    const patchStub = sinon.stub();
    const putStub = sinon.stub();
    const headStub = sinon.stub();
    const deleteStub = sinon.stub();

    axiosMock.get = getStub;
    axiosMock.post = postStub;
    axiosMock.patch = patchStub;
    axiosMock.put = putStub;
    axiosMock.head = headStub;
    axiosMock.delete = deleteStub;

    return {
        getAxiosMock : () => axiosMock,
        getCreateStub : () => createStub,
        getGetStub : () => getStub,
        getPostStub : () => postStub,
        getPutStub : () => putStub,
        getPatchStub : () => patchStub,
        getHeadStub : () => headStub,
        getDeleteStub : () => deleteStub
    };
};

const createGetSpy = () => {
    const axiosMock = sinon.spy();
    const getStub = sinon.stub();
    const createStub = sinon.stub();

    axiosMock.get = getStub;
    createStub.returns(axiosMock);
    axiosMock.create = createStub;

    return axiosMock;
};

describe('jsRequestInternal', () => {

    const testCases = [
        {url : 'testUrl.com' , data :  { someData : 'test'} },
        {url : 'anUrl.com' , data :  { someData : true, somethingElse : 22 } },
        {url : 'somethingElse.com' , data :  { someData : { someMoreData : { someKey : 'someValue' } } } },
    ];
    const token = '123456789';
    const baseUrl = 'http://something.com';

    it('is instantiable', () => {
        const instance = jsRequestInternal(createGetSpy());
        expect(instance).to.deep.equal(instance);
    });
    describe('it calls the right axios functions', () => {


        it('calls the get function', () => {
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();
            const getStub = factory.getGetStub();

            const instance = jsRequestInternal(axiosMock);

            let i = 1;
            for (const test of testCases) {
                instance.get(test.url);
                expect(getStub.callCount).to.eq(i);
                expect(getStub.calledWith(test.url)).to.eq(true);
                i++;
            }

        });
        it('calls the post function', () => {
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();

            const postStub = factory.getPostStub();
            const instance = jsRequestInternal(axiosMock);

            let i = 1;
            for (const testCase of testCases) {
                instance.post(testCase.url, testCase.data);
                expect(postStub.callCount).to.eq(i);
                expect(postStub.calledWith(testCase.url, testCase.data)).to.eq(true);
                i++;
            }
        });
        it('calls the patch fucntion', () => {
           const factory = mockFactory();

           const axiosMock = factory.getAxiosMock();
           const patchStub = factory.getPatchStub();

           const instance = jsRequestInternal(axiosMock);

           let i = 1;
           for (const test of testCases) {
            instance.patch(test.url, test.data);
            expect(patchStub.callCount).to.eq(i);
            expect(patchStub.calledWith(test.url, test.data)).to.eq(true);
            i++;
           }

        });
        it('calls the put function', () => {
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();
            const putStub = factory.getPutStub();

            const instance = jsRequestInternal(axiosMock);

            let i = 1;
            for (const test of testCases) {
                instance.put(test.url, test.data);
                expect(putStub.callCount).to.eq(i);
                expect(putStub.calledWith(test.url, test.data)).to.eq(true);
                i++;
            }
        });
        it('calls the delete function', () => {
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();
            const deleteStub = factory.getDeleteStub();

            const instance = jsRequestInternal(axiosMock);

            let i = 1;
            for (const test of testCases) {
                instance.delete(test.url);
                expect(deleteStub.callCount).to.eq(i);
                expect(deleteStub.calledWith(test.url)).to.eq(true);
                i++;
            }
        });
        it('calls the head function', () => {
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();
            const headStub = factory.getHeadStub();

            const instance = jsRequestInternal(axiosMock);
            let i = 1;
            for (const test of testCases) {
                instance.head(test.url);
                expect(headStub.callCount).to.eq(i);
                expect(headStub.calledWith(test.url)).to.eq(true);
                i++;
            }
        })

    });
    describe('is is configurable', () => {
        it('sets the base-url correctly', () => {
            const factory = mockFactory();
            const axiosMock = factory.getAxiosMock();
            const createStub = factory.getCreateStub();

            const instance = jsRequestInternal(axiosMock);
            instance.setBaseUrl(baseUrl);
            const config = { baseURL : baseUrl };
            instance.get('something');

            expect(createStub.calledWith(config)).to.eq(true);
        });
        it('it sets the configuration correctly', () => {
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();
            const getStub = factory.getGetStub();

            const instance = jsRequestInternal(axiosMock);

            const url = 'test';
            const config = {
                configParam1 : 'someConfig',
                configParam2 : 'someConfig2'
            };

            instance.get(url, config);
            expect(getStub.calledWith(url, config)).to.eq(true);

        });

        it('adds the right auth header if provided a token function', () =>{
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();
            const createStub = factory.getCreateStub();

            const instance = jsRequestInternal(axiosMock);

            const config = {
                baseURL : baseUrl,
                headers : {
                    'Authorization': 'Bearer ' + token
                }
            };

            const url = 'someUrl';

            for (const test of testCases) {
                instance.setTokenFkt(() => { return token });
                instance.setBaseUrl(baseUrl);
                instance.get(url);
                expect(createStub.calledWith(config)).to.eq(true);
            }

        });

        it('adds the right header if provided via config', () => {
            const factory = mockFactory();

            const axiosMock = factory.getAxiosMock();

            const getStub = factory.getGetStub();
            const instance = jsRequestInternal(axiosMock);

            const callConfig = {
                headers : {
                    someNewHeader : 'someCustomHeaderValue'
                }
            };

            instance.setBaseUrl(baseUrl);

            for (const test of testCases) {
                instance.get(test.url, callConfig);
                expect(getStub.calledWith(test.url, callConfig)).to.eq(true)
            }



        });

        it('allows for the override of http-methods via configuration property', () => {

            const factory = mockFactory();

            const postStub = factory.getPostStub();
            const patchStub = factory.getPatchStub();
            const putStub = factory.getPutStub();
            const headStub = factory.getHeadStub();
            const deleteStub = factory.getDeleteStub();

            const tests = [
                // { method : 'put', url : 'someUrl', data : { test : 'somethign'}, stub : putStub},
                // { method : 'patch', url : 'someUrl', data : { test : 'somethign'}, stub : patchStub },
                { method : 'delete', url : 'someUrl', stub : deleteStub },
                // { method : 'head', url : 'someUrl', stub : headStub }
            ];


            const createSub = factory.getCreateStub();
            const axiosMock = factory.getAxiosMock();

            const instance = jsRequestInternal(axiosMock);

            instance.setOverride(true);
            let i = 1;
            for (const test of tests) {

                const config = {
                    headers : {
                        'X-HTTP-Method-Override' : test.method.toUpperCase()
                    }
                };

                if (test.data) {
                    instance[test.method](test.url, test.data)
                }
                else {
                    instance[test.method](test.url);
                }

                expect(postStub.callCount).to.eq(i);

                expect(createSub.calledWith(config)).to.eq(true);

                if (test.data) {
                    expect(postStub.calledWith(test.url, test.data)).to.eq(true);
                }
                else {
                    expect(postStub.calledWith(test.url)).to.eq(true);
                }

                i++;
            }

        })

    });

});