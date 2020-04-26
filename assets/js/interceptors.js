// Add a request interceptor
axios.interceptors.request.use((config) => {
    console.log('Request:', config);
    return config;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use((response) => {
    console.log('Response:', response);
    return response;
  }, (error) => {
    $("#loader").addClass("hide-loader");
    $("#error").modal("show");
    
    console.error(error);
    
    return Promise.reject(error);
  });