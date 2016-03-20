import getResponse from './get-response';

const resolveRedirect = async (url, maxRedirect=3, callback=()=>{}) => {
  if (typeof maxRedirect === 'function') {
    callback = maxRedirect;
    maxRedirect = 3;
  }

  let count = 0;
  let currentUrl = url;

  while (count < maxRedirect) {
    try {
      let response = await getResponse(currentUrl);
      if (response.statusCode === 301 || response.statusCode === 302) {
        currentUrl = response.headers.location;
        count = count + 1;
      } else {
        break;
      }
    } catch (e) {
      callback(e);
      throw e;
    }
  }

  callback(null, currentUrl);

  return currentUrl;
}

export default resolveRedirect
