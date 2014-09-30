# Blindstore event monitor

Event monitor for real-time tracking the execution of Blindstore clients and server.

## Install

### Prerequisites

Meteor:

    curl https://install.meteor.com/ | sh

meteor-collectionapi:

    npm install meteorite
    cd bsmon
    node_modules/.bin/mrt add collection-api

## Run

    cd bsmon
    meteor

## Usage

Open `localhost:3000` with a browser.

Use the rest API to update the interface live:

    curl -d '{"date": "2019-12-12", "title": "thushh", "description": "dsajdjsadsada"}' http://localhost:3000/rest/client-events

See also: https://github.com/crazytoad/meteor-collectionapi
