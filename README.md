# 180 Decibels

To Run:

1. `yarn`
1. `yarn run build`
1. `yarn run start`

Developers:

Use VSCode as an editor

Use Chrome as a browser, with the following extensions:

- Redux DevTools
- React DevTools
- Apollo Client Developer Tools

Depending on how you want to run it, use these steps:

- Run Both the client and server in development mode
  1. `yarn`
  1. `yarn run dev`
- Run only the client in development mode
  1. `cd client`
  1. `yarn run dev`

Using the Debugger:

To Debug the server:  (Set breakpoints in files under `src/server` in VS Code)

  1. Start the `Debug Server` debug configuration via VS Code
  1. Run only the client as-per instructions above

To Debug the client:  (Set breakpoints in files under `src/client` in VS Code)

  1. Start Both the client and server in development mode, as per instructions above.
  1. Start the `Launch Chrome` debug configuration via VS Code, and interact via the chrome instance launched by VS Code

## Client

Create-React-App 2.0 based website, using redux, redux-saga, and modular sass.  Apollo GraphQL client for API requests

## Server

Express based server, with Apollo GraphQL server under `/graphql`
