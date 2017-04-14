import ZoomdataSDK from 'zoomdata-client';

var applicationConfig = {
     secure: true,
     host: 'prototype.zoomdata.com',
     port: 8443,
     path: '/zoomdata'
}

var credentialsConfig = {
      key: "58f03673e4b054c21d0c5651"
  };

function initClient() {
   return ZoomdataSDK.createClient({
       credentials: credentialsConfig,
       application: applicationConfig
   })
}

export const createClient = initClient;
