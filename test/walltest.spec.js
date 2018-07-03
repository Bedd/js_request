import { expect } from 'chai';
import sinon from 'sinon';
import jsRequestInternal from '../src/jsRequestInternal';

const createAxiosMock = () => {
    const axiosMock = sinon.spy();
    const createStub = sinon.stub();
    axiosMock.create = createStub;
    createStub.returns(axiosMock);
    return axiosMock;
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
        const testCases = [
            {url : 'testUrl.com' , data :  { someData : 'test'} },
            {url : 'anUrl.com' , data :  { someData : true, somethingElse : 22 } },
            {url : 'somethingElse.com' , data :  { someData : { someMoreData : { someKey : 'someValue' } } } },
        ];

        it('calls the get function', () => {

            const axiosMock = createAxiosMock();

            const getStub = sinon.stub();
            axiosMock.get = getStub;

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

            const axiosMock = createAxiosMock();
            const postStub = sinon.stub();
            axiosMock.post = postStub;
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
           const axiosMock = createAxiosMock();
           const patchStub = sinon.stub();
           axiosMock.patch = patchStub;

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
            const axiosMock = createAxiosMock();
            const putStub = sinon.stub();
            axiosMock.put = putStub;
            const instance = jsRequestInternal(axiosMock);

            let i = 1;
            for (const test of testCases) {
                instance.put(test.url, test.data);
                expect(putStub.callCount).to.eq(i);
                expect(putStub.calledWith(test.url, test.data)).to.eq(true);
                i++;
            }
        })
        it('calls the delete function', () => {
            const axiosMock = createAxiosMock();
            const deleteStub = sinon.stub();
            axiosMock.delete = deleteStub;

            const instance = jsRequestInternal(axiosMock);

            let i = 1;
            for (const test of testCases) {
                instance.delete(test.url);
                expect(deleteStub.callCount).to.eq(i);
                expect(deleteStub.calledWith(test.url)).to.eq(true);
                i++;
            }
        })

    })

});