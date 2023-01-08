var tmpAddr = 'http://localhost:8002';
export default {
    serviceUrl: tmpAddr,
    displayServiceUrl: new String(tmpAddr).replace(/^https?:\/\//ig, ''),
    mode: 'extension'
};
