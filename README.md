# systemlink-vue-example
SystemLink Vue web app as presented at https://info.gsystems.com/labviewlive/ on 17 June 2020.  Here's a link to the summary of that presentation: https://www.gsystems.com/blog/labview-live-recap-effectively-leveraging-systemlink-apis-and-tools.
Code is VueJS implementation of https://github.com/ni/systemlink-web-interface-template.
Demonstrates client and server side filtering in custom plugin using HTTP API.
## Project setup
```
cd to cloned folder
npm install
vue ui
Project: Import Existing (select imported folder)
```

### Compiles and hot-reloads for development
```
tasks-->serve-->Run Task
or
npm run serve
```
Edit vue.config.js if you want to change where your proxy settings are setup during development.

### Compiles and minifies for production
```
tasks-->build-->Run Task
or
npm run build
```

### Deployment
Files in \public are automatically copied to \dist during build task.
Following steps are needed to get running (these steps can be moved to an ni package for install via nipm or combined into a continuous integration process):
1. Cut \conf\conf.d\52_webapp_plugin.conf and paste to C:\Program Files\National Instruments\Shared\Web Server\conf\conf.d
  Note this generically enables custom web plugins, if you already have this file you can leave it as-is.
2. Cut \dist\conf\htpriv.d\vue_example_plugin.xml and paste to C:\Program Files\National Instruments\Shared\Web Server\conf\htpriv.d\vue_example_plugin.xml
  This is the plugin specific config.  At this point the dist\conf folder is no longer needed.
3. Copy remaining items from dist folder to "C:\Program Files\National Instruments\Shared\Web Server\htdocs\plugins\vue_example_plugin"
4. Open SystemLink NI Web Server Configuration, confirm that the plugin shows up with correct permsissions.  Restart the web server.
5. Future updates to app do not need web server restart, just perform step 3.

### Lints and fixes files
```
npm run lint (automatically run when invoked from vue ui)
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
