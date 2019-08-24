const electron = require('electron');
const path = require('path');
const url = require('url');


const{app , BrowserWindow} = electron;
let windowApp;

app.on('ready', function(){
    windowApp = new BrowserWindow({});
    windowApp.loadURL(url.format({
        pathname: path.join('http://localhost/Ecommerce/public/'),
        protocol: 'file',
        slashes: true
    }));
});