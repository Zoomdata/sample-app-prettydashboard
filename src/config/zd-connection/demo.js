export const serverDev = {
    credentials: {
        access_token: ''
    },
    application: {
        secure: true,   
        host: 'demo.zoomdata.com',                
        port: 443,                 
        path: '/zoomdata'
    },
    oauthOptions: {
        client_id: "UHJldHR5RGFzaGJvYXJkMTQ3MjE0MTMxNzk1MTc5MzJlNzFkLTU5ZDctNDgwOS1hZTIwLWI0ZjQwNjQ2NjFlNQ==",
        redirect_uri: "https://apps.zoomdata.com/prettydashboard",
        auth_uri: "https://demo.zoomdata.com/zoomdata/oauth/authorize",
        scope: ['read']
    }
};
