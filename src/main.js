// @flow

import axios from 'axios';

                  
type queryConfig = {|
    params : {
      [key: string] : string | number
    }
  |};
  type bodyConfig = {
    [key: string] : string | number
  };
  type requestConfig = {
    baseURL: string,
    headers? : {
      [key: string] : string | number
    }
  };
     

function jsRequest() {

  let tokenFkt;
  const conf : requestConfig = {};

  const setTokenFkt = (newTokenFkt : Function) => {
    tokenFkt = newTokenFkt;
  };

  const setBaseUrl = (baseUrl : string) => {
    conf.baseURL = baseUrl;    
  };

  const makeRequest = (method, ...rest) : Promise<mixed>   => {    
    
    if (typeof tokenFkt !== 'undefined') {
      conf.headers = {
        'Authorization': 'Bearer ' + tokenFkt()
      };
    } else {
      delete conf.headers;
    }

    const requestInstance = axios.create(conf);
    // TODO additional settings (intercept...)
    switch (method) {
      case 'get':
        return requestInstance.get.apply(this, rest);

      case 'post':
        return requestInstance.post.apply(this, rest);

      case 'put':
        return requestInstance.put.apply(this, rest);

      case 'delete':
        return requestInstance.delete.apply(this, rest);

      case 'head':
        return requestInstance.head.apply(this, rest);

      case 'patch':
        return requestInstance.patch.apply(this, rest);

      default:
        return Promise.reject(new Error('Unsupported method'));
    }
  };

  return {

      setTokenFkt : (tokenFkt : Function) => setTokenFkt(tokenFkt),
      setBaseUrl : (baseUrl : string) => setBaseUrl(baseUrl),

    /**
     * 
     * Sendet GET request
     * @returns Promise-based Antwort
     */
    get: (url : string, config? : queryConfig) : Promise<mixed>  => makeRequest('get', url, config),
    /**
     * Sendet DELETE request
     * @returns Promise-based Antwort
     */ 
    delete: (url  :string, config? : queryConfig) : Promise<mixed>  => makeRequest('delete', url, config),
    /**
     * Sendet HEAD request
     * @returns Promise-based Antwort
     */
    head: (url  :string, config? : queryConfig) : Promise<mixed> => makeRequest('head', url, config),
    /**
     * Sendet POST request
     * @returns Promise-based Antwort
     */
    post: (url  :string, body: bodyConfig, config? : queryConfig) : Promise<mixed> => makeRequest('post', url, body, config),
    /**
     * Sendet PUT request
     * @returns Promise-based Antwort
     */
    put: (url :string , body : bodyConfig, config? : queryConfig) : Promise<mixed> => makeRequest('put', url, body, config),
    /**
     * Sendet PATCH request
     * @returns Promise-based Antwort
     */
    patch: (url : string, body : bodyConfig, config? : queryConfig) : Promise<mixed>  => makeRequest('patch', url, body, config)
  };
}

let instance = jsRequest();

export default instance;
