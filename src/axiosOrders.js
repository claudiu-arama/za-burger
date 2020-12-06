import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-project-react-1ceb0.firebaseio.com/',
});

export default instance;
