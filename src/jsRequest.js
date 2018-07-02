import axios from 'axios';
import jsRequestInternal from './jsRequestInternal';

const jsRequest = () => {
    return jsRequestInternal(axios);
};

export default jsRequest();