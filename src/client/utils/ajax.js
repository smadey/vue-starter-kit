import fetch from './fetch';

// 服务器地址
const serverUrl = '';

// 全局请求头
const headers = {};

// 全局请求参数
const ajaxData = {};

// 全局返回状态处理
const statusHandlers = {};

// 全局结果检查器，返回true表示结果正常
let resultChecker = () => true;

/**
 * 获取请求的 headers
 * @param  {Object} _headers 合并之前的请求头
 * @return {Object} 合并“全局请求头”之后的请求头
 */
function getHeaders(_headers = {}) {
  const keys = Object.keys(headers);
  let i = keys.length;

  while (i--) {
    _headers[keys[i]] = headers[keys[i]];
  }

  return _headers;
}

/**
 * 获取请求的数据
 * @param  {Object} _ajaxData 合并之前的请求数据
 * @return {Object} 合并“全局data”之后的data
 */
function getAjaxData(_ajaxData = {}) {
  const keys = Object.keys(ajaxData);
  let i = keys.length;

  while (i--) {
    _ajaxData[keys[i]] = ajaxData[keys[i]];
  }

  return _ajaxData;
}

/**
 * encode 字符串
 * @param  {String} value 需要转码的字符串
 * @return {String} 转码结果
 */
function encode(value) {
  return String(value)
    .replace(/[^ !'()~\*]/g, encodeURIComponent)
    .replace(/ /g, '+')
    .replace(/[!'()~\*]/g, ch => `%${ch.charCodeAt().toString(16).slice(-2).toUpperCase()}`); // eslint-disable-line max-len, newline-per-chained-call
}

/**
 * 将请求对象换成字符串
 * @param  {Object} obj 请求对象
 * @return {String} 请求字符串
 */
function encodeObj(obj) {
  if (!obj) {
    return '';
  }

  const params = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value !== null && value !== undefined) {
      params.push(`${encode(key)}=${encode(value)}`);
    }
  });

  return params.join('&').replace(/%20/g, '+');
}

/**
 * 将请求对象换成 "x-www-form-urlencoded" 类型字符串
 * @param  {Object} obj 请求对象
 * @return {String} 请求字符串
 */
function encodeForm(obj) {
  function append(newObj, key, value) {
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      Object.keys(value).forEach((k) => {
        append(newObj, `${key}[${k}]`, value[k]);
      });
      return newObj;
    }

    newObj[key] = value;
    return newObj;
  }

  return encodeObj(Object.keys(obj).reduce(
    (newObj, key) => append(newObj, key, obj[key]), {}
  ));
}

function handleStatus(status, response) {
  const handler = statusHandlers[status] || statusHandlers.default;

  if (typeof handler === 'function') {
    handler(response);
  }
}

/**
 * 检查请求的返回状态码
 * @param  {Object} response 服务器响应结果
 * @return {Object} 正常的响应结果
 */
function checkStatus(response) {
  const status = response.status;

  if (status >= 200 && status < 300) {
    return response;
  }

  handleStatus(status, response);

  throw new Error(response.statusText);
}

/**
 * 将服务器相应结果转换为json
 * @param  {Object} response 服务器响应结果
 * @return {[type]} JSON数据
 */
function parseJSON(response) {
  return response.json().then(d => d, (ex) => { // 转换JSON失败
    handleStatus(500, response);
    return Promise.reject(ex);
  });
}

/**
 * 请求成功回调函数
 * @param  {Object} result 服务器返回结果
 * @return {Object} 正常的数据 或者 失败的Promise
 */
function successCallback(result) {
  if (resultChecker(result)) {
    return result;
  }

  handleStatus(result.code, result);

  return Promise.reject(result);
}
/**
 * 请求失败回调函数
 * @param  {Object} ex 失败信息
 * @return {Object} 失败的Promise
 */
function errorCallback(ex) {
  // throw new Error(ex);
  return Promise.reject(ex);
}

/**
 * 添加请求头
 * @param  {String} name  请求头名称
 * @param  {String} value 请求头内容
 */
export function appendHeaders(name, value) {
  if (name) {
    headers[name] = value;
  }
}

/**
 * 移除请求头
 * @param  {String} name 请求头名称
 */
export function removeHeaders(name) {
  delete headers[name];
}
/**
 * 添加请求数据
 * @param  {String} name  请求数据名称
 * @param  {String} value 请求数据内容
 */
export function appendAjaxData(name, value) {
  if (name) {
    ajaxData[name] = value;
  }
}

/**
 * 移除请求数据
 * @param  {String} name 请求数据名称
 */
export function removeAjaxData(name) {
  delete ajaxData[name];
}

/**
 * 添加异常响应状态解析方法
 * @param  {Number|Array}   status  状态码
 * @param  {Function}     handler 解析方法
 */
export function appendStatusHandler(status, handler) {
  if (typeof status === 'function') {
    statusHandlers.default = status;
  } else if (Array.isArray(status)) {
    status.forEach((s) => (statusHandlers[s] = handler));
  } else if (status) {
    statusHandlers[status] = handler;
  }
}

/**
 * 移除异常响应状态解析方法
 * @param  {Number|Array} status 状态码
 */
export function removeStatusHandler(status) {
  if (!status) {
    delete statusHandlers.default;
  } else if (Array.isArray(status)) {
    status.forEach((s) => (delete statusHandlers[s]));
  } else {
    delete statusHandlers[status];
  }
}

export function replaceResultChecker(checker) {
  if (typeof checker === 'function') {
    resultChecker = checker;
  }
}

/**
 * Get请求
 * @param  {String} url  路径
 * @param  {Object} params 参数
 * @return {Promise} 请求Promise
 */
export function get(url, params) {
  const options = {
    credentials: 'same-origin',
    headers: getHeaders(),
  };

  let queryString = encodeObj(getAjaxData(params));

  if (queryString) {
    if (url.indexOf('?') === -1) {
      queryString = `?${queryString}`;
    } else {
      queryString = `&${queryString}`;
    }
  }

  return fetch(`${serverUrl}${url}${queryString}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(errorCallback);
}

/**
 * Get请求（返回JSON）
 * @param  {String} url  路径
 * @param  {Object} params 参数
 * @return {Promise} 请求Promise
 */
export function getJSON(url, params) {
  const options = {
    credentials: 'same-origin',
    headers: getHeaders(),
    // mode: 'no-cors',
  };

  let queryString = encodeObj(getAjaxData(params));

  if (queryString) {
    if (url.indexOf('?') === -1) {
      queryString = `?${queryString}`;
    } else {
      queryString = `&${queryString}`;
    }
  }

  return fetch(`${serverUrl}${url}${queryString}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}

/**
 * Post请求
 * @param  {String} url  路径
 * @param  {Object} data 参数
 * @return {Promise} 请求Promise
 */
export function post(url, data) {
  const options = {
    credentials: 'same-origin',
    method: 'post',
    headers: getHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: encodeForm(getAjaxData(data)),
  };

  return fetch(`${serverUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}

/**
 * Post请求（发送formdata）
 * @param  {String} url    路径
 * @param  {FormData} formdata 参数
 * @return {Promise} 请求Promise
 */
export function postForm(url, formdata) {
  const options = {
    credentials: 'same-origin',
    method: 'post',
    headers: getHeaders(),
    body: formdata,
  };

  const data = getAjaxData({});

  Object.keys(data).forEach((d) => {
    formdata.append(d, data[d]);
  });

  return fetch(`${serverUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}

/**
 * Post请求（发送json）
 * @param  {String} url  路径
 * @param  {Object} json 参数
 * @return {Promise} 请求Promise
 */
export function postJSON(url, json) {
  const options = {
    credentials: 'same-origin',
    method: 'POST',
    headers: getHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(getAjaxData(json)),
  };

  return fetch(`${serverUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}
