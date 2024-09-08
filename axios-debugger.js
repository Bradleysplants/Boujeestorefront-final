import axios from 'axios'; // Ensure axios is imported

const setupAxiosDebug = () => {
  axios.interceptors.request.use(config => {
    console.log('Request:', config);
    return config;
  });

  axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  }, error => {
    console.error('Error:', error);
    return Promise.reject(error);
  });
};

setupAxiosDebug();

// Test with simple request
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Test Request Successful:', response);
  })
  .catch(error => {
    console.log('Test Request Failed:', error);
  });


export default setupAxiosDebug;
