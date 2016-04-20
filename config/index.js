import ZoomdataSDK from 'ZoomdataSDK';

var applicationConfig = {
	secure: true,   
	host: 'pubsdk.zoomdata.com',                
	port: 8443,                 
	path: '/zoomdata'
};

// Security parameters
var credentialsConfig = {
  	key: "56ec8877e4b0c1680babc247"
};

function initClient() {
    return ZoomdataSDK.createClient({
        credentials: credentialsConfig,
        application: applicationConfig
    });
}

export const createClient = initClient;