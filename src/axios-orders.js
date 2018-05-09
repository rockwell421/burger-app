import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://good-burger-592cc.firebaseio.com/'
});

export default instance;
