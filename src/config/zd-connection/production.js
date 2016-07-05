export const serverProd = {
    credentials: {
        access_token: ''
    },
    application: {
          secure: true,
          host: 'developer.zoomdata.com',
          port: 443,
          path: '/zoomdata'
    },
    oauthOptions: {
        client_id: "emQtZGF0YS1hcHAtMDMxNDY0MTI4MDgzNDE1ZDM0MjhkYTEtMWZjNC00MWFmLTkxNzQtMDU4MzUwMzc3MTAz",
        redirect_uri: "https://developer.zoomdata.com/sample/prettydashboard/%23/tab/dash",
        auth_uri: "https://developer.zoomdata.com/zoomdata/oauth/authorize",
        scope: ['read']
    }
};
