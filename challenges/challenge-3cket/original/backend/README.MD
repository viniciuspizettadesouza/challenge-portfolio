# Nuxt Challenge API

Use this project to run a local API that will provide data for your coding challenge.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install
```

## Development Server

Start the development server on http://localhost:3001

```bash
node index.js
```

## Endpoints

http://localhost:3001/events

Provides a list of all events available for the grid building.


http://localhost:3001/events/:event-slug

Provides data for a specific event by slug.