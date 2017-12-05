import 'whatwg-fetch';

const ROOT_URL = 'http://localhost:8080/v1/model/housing';

class Api {

  serializeQueryParams(params) {
    if (!params || Object.keys(params).length === 0) {
      return '';
    }

    return '?' + Object.keys(params).reduce((a, key) => { a.push(key + '=' + encodeURIComponent(params[key])); return a }, []).join('&')
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  parseJSON(response) {
    return response.json()
  }

  get(path, queryParams) {
    return fetch(`${ROOT_URL}/${path}${this.serializeQueryParams(queryParams)}`, {
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }
}

export default Api;
