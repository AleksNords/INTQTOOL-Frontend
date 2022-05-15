# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


##Installation
###requiremnets
The project requires certain software to be installed to run the application\
First requirement is NGINX which can be downloaded with:
```bash
sudo apt get install nginx
```
Second is nodejs which can be installed with:
```bash
sudo apt install nodejs
```

###Clone repo and build optimized version
\
Clone the application from GitHub with the following command to the host machine.
```bash
git clone https://github.com/AleksNords/INTQTOOL-Frontend.git
```
Next run the following commands to install dependencies and create an optimized build
```bash
npm install

npm run build
```

###Set up NGINX
Start by navigating to the nginx config-file and editing it with the following command
```bash
nano /etc/nginx/sites-enabled/default
```
Change the try_files field from
```bash
try_files $uri $uri/=404
```
to
```bash
try_files $uri /index.html;
```
and direct the root field to your projects build-folder. \

Use [Certbot](https://certbot.eff.org/) to get a TLS-certificate to enable https for NGINX

## Usage
This application is meant to serve as an api for the interactive quizzing-tool frontend.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
