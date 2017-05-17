# P4 Game

P4 is an Connect Four game application <> with the MEAN Stack. 
Check out the [live example](https://github.com/Waregalias/YnodeJS_Project)(comming soon)!

## Usage
### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [MongoDB](https://www.mongodb.com/)
* [AngularJS](https://angularjs.org/)
* [ExpressJS](http://expressjs.com/)
* [Socket.io](https://socket.io/)
* [Bootstrap](http://getbootstrap.com/)


### Usage
1. Clone the repository: `git clone https://github.com/Waregalias/P4`
2. Install the NodeJS dependencies: `npm install`.
5. Start mongoDB Server : .\mongod.exe
6. Go to url page: http://localhost:3000.


### Development Structure
```
models (nodejs)
    user.js -----------------> Mongoose Schema User. Contain mongoDB Helpers.
public
    javascripts (angular)
        dashboard.js --------> dashboard front controller /!\ uncomplete
        puissance4.js -------> game front controller
    pictures
        red.png
        slot.jpg
        yellow.png
    stylesheets (css)
        style.css
routes
    game.js   ---------------> game control /!\ uncomplete
    index.js  ---------------> default route
    users.js  ---------------> authentification control
views
    layouts
        layout.handlebars
    game.handlebars ---------> game view
    home.handlebars ---------> first view
    index.handlebars --------> dashboard view (need auth)
    login.handlebars --------> login view
    register.handlebars -----> register view
config.js -------------------> Maybe used for storing config data
package.json
server.js -------------------> Server execution file. Contain socket.io callers.
```

#### Modules & Packages
Please see `packages.json` for more infos.


#### TODO & Updates
- [ ] Game: Diagonal control
- [ ] Game: Random starter
- [ ] Dashboard: Auto refresh list of rooms

This project will be regulary updated.

## Credits
* [Saïd Mezhoud](https://github.com/Waregalias)
