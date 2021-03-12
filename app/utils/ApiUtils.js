var ApiUtils = {
    checkStatus: function (response) {
      if (response.ok && response.status == 200) {
        return response
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  };
  export { ApiUtils as default };