# Music Database

This application allows users to search song or artist information.
It fetches information from genius api. 

 
For artist, it displays the following info in 3 separate angular material tiles
    1st tile: Singer name and image
    2nd tile: Biodata
    3rd tile: Top 5 popular Albums along with Title, sub title, release date and album cover thumbnale image

For song, it displays the following info in 3 separate angular material tiles
    1st tile: Album Title, sub title, release date and album cover image
    2nd tile: Lyrics
    3rd tile: Singer name, image and biodata


Note:
The genius api license is limited for 8K calls only.
Application key is being set in enviroment.prod.ts file. It can be changed in case if it exceeds its quota.


## Development server

Run `npm run buildserve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
It uses in-built light-weight angular dev server.

## Run production server
Run `npm run buildserve:prod` for a prod server. Navigate to `http://localhost:4200/`. 
It uses express server.

## Run production server using docker
Run `./start.sh` script to deploy and execute the app on docker. Navigate to `http://localhost:80/` or just `http://localhost`.  

This script deploys the application on nginx server instance. See Dockerfile for more information.
When adding a new api call, ensure that the relevant reverse proxy is added in nginx.conf file.
It uses nginx server.

## Build and run using docker
1. Build the application by executing `npm run build`
2. Run `./start.sh` script to deploy and execute the app on docker. Navigate to `http://localhost:80/` or just `http://localhost`.  

This script deploys the application on nginx server instance. See Dockerfile for more information.
When adding a new api call, ensure that the relevant reverse proxy is added in nginx.conf file.
It uses nginx server.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
