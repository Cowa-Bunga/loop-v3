import axios from 'axios';

export const REQ = (options ={}) => {
 return axios(options);
};