# Cozy_quiz

Cozy quiz is a University project of web development.

The purpose of this project is to enable people to create quiz and share them easily. The project rely on websockets thanks to Socket.io as main way of communication between clients and server. Vue.JS is also used for the frontend part.

## Development

**IMPORTANT: Start backend first then frontend !**

### Backend

Subfolder: `back`

Installation: `npm install`
Run: `npm run dev`

Backend will be served on `localhost:8080`

### Frontend

Subfolder: `front`

Installation: `npm install`
Run: `npm run serve`

Frontend will be served on `localhost:8081`


## Production

Deployment using docker-compose

Go to the root folder of the project and then simply run `docker-compose up`

app will be served on port 8080
