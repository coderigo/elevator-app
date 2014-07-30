As part of a screening process I was recently asked to build a basic web application.
This repo is what I put together in the time avaialable.

## The brief
Build a web app to administer an elevatory system that:

- Is responsive.
- Caters for 4 elevators (A,B,C,D).
- Caters for 10 floors.
- Has a max person load of 20 per elevator.
- Dispatches an elevator closest to floor where one was requested.
- Shows how many boarding passengers are waiting for a given floor.
- Has a mechanism for entering boarding passengers and destination for a given floor (related to the above).
- Shows each elevator and its direction of travel (up, down, stationary) along with its load.

## Built application
The built end result can be found in the **`compiled-app`** directory.

This can be served through your web server of choice.

Alternatively, you can use `grunt` to serve it with `grunt serveCompiledApp` from the terminal.

## Development requirements

- [Node.js](http://nodejs.org/)
- [Yeoman](http://yeoman.io/)
- [Yeoman generator-angular](https://github.com/yeoman/generator-angular)

To install dependencies run:

`npm install`
`bower install`

To develop, run:

`grunt serve` 

This will start a server and see LiveReload changes.

## Tests

The tests focus on the brief's requirements.

Run:

`grunt test` 

This will run automatically while developing using `grunt serve`.

## Deployment

Run:

`grunt build`

This will build the app into the `compiled-app` directory and start a server to serve it on:

`http://locahost:8787`

It essentially runs `grunt serveCompiledApp` as the last task in the `build` queue.

## Limitations

- There is no backend although it could benefit from one. The data is mocked in the `MainCtrl` controller.
- The `main.html` view could refactor the use of `ng-class`, perhaps making use of a directive instead.
- There could be better error handling and validation in the view and controller.


