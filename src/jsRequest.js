// @flow
import axios from 'axios';
import jsRequestInternal from './jsRequestInternal';


type queryConfig = {|
    params : {
        [key: string] : string | number
    }
|};
type bodyConfig = {
    [key: string] : string | number
};

const jsRequest = () => {
    const jsrequest = jsRequestInternal(axios);
    return {

        /**
         * Sets function to get the Bearer-Token for authentication
         * @param {Function} tokenFkt the function returning the token
         * @returns {void}
         */
        setTokenFkt : (tokenFkt : Function) : void => jsrequest.setTokenFkt(tokenFkt),
        /**
         * sets the base url to use when making a request
         * @param {string} baseUrl the base url 
         * @returns {void}
         */
        setBaseUrl : (baseUrl : string) : void => jsrequest.setBaseUrl(baseUrl),
        /**
         * uses xhttp-method-override headers instaed of the corrensponding http-verbs
         * @param {boolean} override whether or not the methods should be overridden
         * @returns {void}
         */
        setOverride : (override : boolean) : void => jsrequest.setOverride(override),

        /**
         *
         * sends a GET request
         * @returns Promise-based response
         */
        get: (url : string, config? : queryConfig) : Promise<mixed>  => jsrequest.get(url, config),
        /**
         * sends a DELETE request
         * @returns Promise-based response
         */
        delete: (url  :string, config? : queryConfig) : Promise<mixed>  => jsrequest.delete(url, config),
        /**
         * sends a HEAD request
         * @returns Promise-based response
         */
        head: (url  :string, config? : queryConfig) : Promise<mixed> => jsrequest.head(url, config),
        /**
         * sends a POST request
         * @returns Promise-based response
         */
        post: (url  :string, body: bodyConfig, config? : queryConfig) : Promise<mixed> => jsrequest.post(url, body, config),
        /**
         * sends a PUT request
         * @returns Promise-based response
         */
        put: (url :string , body : bodyConfig, config? : queryConfig) : Promise<mixed> => jsrequest.put(url, body, config),
        /**
         * sends a PATCH request
         * @returns Promise-based response
         */
        patch: (url : string, body : bodyConfig, config? : queryConfig) : Promise<mixed>  => jsrequest.patch(url, body, config)
    };

};

export default jsRequest();