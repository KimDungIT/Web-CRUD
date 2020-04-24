import axios from 'axios';
import * as Config from './../constants/Config';
import { trackPromise } from 'react-promise-tracker';
const axiosIntance = axios.create({});

export default function callApi(endpoint, method = 'GET', body){
    let ax = axiosIntance({
        method: method,
        url : `${Config.API_URL}/${endpoint}`,
        data : body
    });
    // return axios({
    //     method: method,
    //     url : `${Config.API_URL}/${endpoint}`,
    //     data : body
    // });
    return trackPromise(ax);
    
};