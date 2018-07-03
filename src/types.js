export type queryConfig = {|
    params : {
        [key: string] : string | number
    }
|};
export type bodyConfig = {
    [key: string] : string | number
};
export type requestConfig = {
    baseURL: string,
    headers? : {
        [key: string] : string | number
    }
};