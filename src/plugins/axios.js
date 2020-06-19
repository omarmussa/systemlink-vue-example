import axios from 'axios';

var axiosheaders = {'cache-control': 'no-cache'}

//In production mode the auth is handled by server so no key is needed, pass in key if not running on server
//you can get your key from using Swagger UI - note that Basic auth is weak and not recommended for production
//alternately you can login to SystemLink in a browser and then the auth should be ok for this app
/*
if (process.env.NODE_ENV != "production") {
  axiosheaders['Authorization'] = 'Basic [BasicAuth]'
}
*/
//window.console.log(axiosheaders)

const instance = axios.create({
  headers: axiosheaders
});

export default instance;