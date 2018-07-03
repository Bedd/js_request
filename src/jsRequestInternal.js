// @flow
import type { bodyConfig, queryConfig, requestConfig } from './types';

function jsRequestInternal(axios) {

  let tokenFkt;
  const conf : requestConfig = {
    headers : {}
  };
  let overrideMethods = false;

  const setTokenFkt = (newTokenFkt : Function) => {
    tokenFkt = newTokenFkt;
  };

  const setBaseUrl = (baseUrl : string) => {
    conf.baseURL = baseUrl;
  };

  const setOverride = (overrride : boolean) => {
    overrideMethods = overrride;
  };

  const makeRequest = (method, ...rest) : Promise<mixed> => {
    
    if (typeof tokenFkt !== 'undefined') {
      const headers = {};
      headers['Authorization'] = 'Bearer ' + tokenFkt();
      conf.headers = headers;
    } else {
      delete conf.headers;
    }

    if (overrideMethods) {
      const headers = {};
      headers['X-HTTP-Method-Override'] = method.toUpperCase();
      conf.headers = headers;
      method = 'post';
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
    setOverride : (override : boolean) => setOverride(override),

    /**
     *
     * Sendet GET request
     * @returns Promise-based Antwort
     */
    get: (url : string, config? : queryConfig) : Promise<mixed> => makeRequest('get', url, config),
    /**
     * Sendet DELETE request
     * @returns Promise-based Antwort
     */
    delete: (url :string, config? : queryConfig) : Promise<mixed> => makeRequest('delete', url, config),
    /**
     * Sendet HEAD request
     * @returns Promise-based Antwort
     */
    head: (url :string, config? : queryConfig) : Promise<mixed> => makeRequest('head', url, config),
    /**
     * Sendet POST request
     * @returns Promise-based Antwort
     */
    post: (url :string, body: bodyConfig, config? : queryConfig) : Promise<mixed> => makeRequest('post', url, body, config),
    /**
     * Sendet PUT request
     * @returns Promise-based Antwort
     */
    put: (url :string , body : bodyConfig, config? : queryConfig) : Promise<mixed> => makeRequest('put', url, body, config),
    /**
     * Sendet PATCH request
     * @returns Promise-based Antwort
     */
    patch: (url : string, body : bodyConfig, config? : queryConfig) : Promise<mixed> => makeRequest('patch', url, body, config)
  };
}

// /let instance = jsRequestInternal();

export default jsRequestInternal;
