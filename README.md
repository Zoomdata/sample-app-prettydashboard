# zd-data-app-03

Try this application live at https://developer.zoomdata.com/sample/prettydashboard. Use the following credentials:
```
user: zoomdata
pass: zoomdata
```

This is an advanced dashboard example that uses the Zoomdata v2.2 SDK to query the Ticket Sales datasource hosted by a Zoomdata instance at developer.zoomdata.com.

##Commands

`cd YOUR-INSTALLATION-FOLDER`

1 Install the dependencies
`npm install`

1 Start for development
`npm start`

1 In the browser:
`http://localhost:8090`

## Developer Notes

Set the production flag to false on config/index.js while developing and testing.  This flag makes the app point to the ZD app dev server instead of the ZD production server. 
