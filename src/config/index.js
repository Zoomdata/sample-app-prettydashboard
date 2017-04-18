import ZoomdataSDK from 'zoomdata-client';

var applicationConfig = {
     secure: true,
     host: '52.72.193.58',
     port: 8443,
     path: '/zoomdata'
}

var credentialsConfig = {
      key: "58f4f2dae4b08525c1801b07"
  };

function initClient() {
   return ZoomdataSDK.createClient({
       credentials: credentialsConfig,
       application: applicationConfig
   })
}

export const createClient = initClient;
