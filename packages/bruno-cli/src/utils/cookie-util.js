const { createCookieAgent, HttpCookieAgent, HttpsCookieAgent } = require('http-cookie-agent/http');

const { CookieJar } = require('tough-cookie');

const jar = new CookieJar();

function getCookieAgents() {
  return {
    httpAgent: new HttpCookieAgent({ cookies: { jar } }),
    httpsAgent: new HttpsCookieAgent({ cookies: { jar } }),
  }
}

/**
 *
 * @param {object} agentClass
 * @param {object} arg Any first (non-options) argument (e.g. proxy URL)
 * @param {object} options
 * @return {CookieAgent<http.Agent>}
 */
function getCookieEnabledAgent(agentClass, arg = null, options= {}) {
  const WrappedClass = createCookieAgent(agentClass);
  const combinedArgs = {
    ...options,
    cookies: { jar }
  };
  if (arg) {
    return new WrappedClass(arg, combinedArgs);
  } else {
    return new WrappedClass(combinedArgs);
  }
}

module.exports = {
  getCookieAgents,
  getCookieEnabledAgent
}