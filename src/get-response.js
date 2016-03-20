import http from 'http';
import https from 'https';
import { parse as parseUrl } from 'url';

const getResponse = async (url, callback=()=>{}) => {
  const { protocol, host, pathname, search } = parseUrl(url);
  const path = search ? `${pathname}?${search}` : pathname;

  if (!(protocol && host && path)) {
    const err = new Error(`Not a valid URL: ${url}`);
    callback(err);
    throw err;
  }

  return new Promise((resolve, reject) => {
    const req = ('https:' === protocol ? https : http).request({
      method: 'HEAD',
      host,
      path,
    }, (res) => {
      callback(null, res);
      resolve(res);
    });

    req.end();
  });
}

export default getResponse;
