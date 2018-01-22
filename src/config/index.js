import ZoomdataSDK from 'zoomdata-client';

var applicationConfig = {
     secure: true,
     host: 'live.zoomdata.com',
     port: 443,
     path: '/zoomdata'
}

var credentialsConfig = {
      key: "pAuGrUJJsR"
  };

function initClient() {
   return ZoomdataSDK.createClient({
       credentials: credentialsConfig,
       application: applicationConfig
   })
}

export const createClient = initClient;
