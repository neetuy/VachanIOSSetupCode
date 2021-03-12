

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

const fetchApi = async (url) => {
  try {
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(ApiUtils.checkStatus)
      .then((response) => response.json())
      .catch(e => e)
  } catch (error) {
    return error;
  }
}


export default fetchApi

