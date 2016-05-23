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
        client_id: "emQtZGF0YS1hcHAtMDIxNDY0MDA0ODEwMjMwMzU0ZTRiOWMtYWRhYy00Y2I1LWE1NzgtYWFmOTFmOWNiNzAw",
        redirect_uri: "https://developer.zoomdata.com/sample/prettydashboard",
        auth_uri: "https://developer.zoomdata.com/zoomdata/oauth/authorize",
        scope: ['read']
    }
};
