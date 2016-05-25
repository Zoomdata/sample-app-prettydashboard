# zd-data-app-03

Try this application live at https://developer.zoomdata.com/sample/prettydashboard. Use the following credentials:
```
user: zoomdata
pass: zoomdata
```

This is an advanced dashboard example that uses the Zoomdata v2.2 SDK to query the Ticket Sales datasource hosted by a Zoomdata instance at pubsdk.zoomdata.com.

## Commands

```
cd zd-data-app-03

# Install the dependencies
npm install

# Start for development
npm start

#In the browser:
http://localhost:8090
```

## Developer Notes

Set the production flag to false on config/index.js while developing and testing.  This flag makes the app point to the ZD app dev server instead of the ZD production server. 
