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
        client_id: "emQtZGF0YS1hcHAtMDMxNDY0MDE4MzI0MDU0OWQzZjgxNzItM2VhMi00NjE5LTk3ZmQtMjhmZTRhMzIxNTRm",
        redirect_uri: "https://developer.zoomdata.com/sample/prettydashboard",
        auth_uri: "https://developer.zoomdata.com/zoomdata/oauth/authorize",
        scope: ['read']
    }
};
