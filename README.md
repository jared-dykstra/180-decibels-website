# 180 Decibels

https://decibels-website.herokuapp.com/vast

## Get started

Install prerequisites:

- Git - https://git-scm.com/download
- Yarn - https://yarnpkg.com/en/
- Node.js - https://nodejs.org/en/
- VS Code - https://code.visualstudio.com/  (Only needed if editing the source)

To Run:

1. Clone the repository: `git@github.com:180decibels/website.git`
1. Start VSCode, click File->Open Folder, and select the `website` folder from the cloned git Repo in the previous step
1. From the shell in VSCode (or any shell, opened to the `Website` folder)
   1. Install dependencies - `yarn`
   1. Build a client distribution - `yarn run build`
   1. Create a local empty database - `yarn run db:create`
   1. Start the development server & client webpack server - `yarn run dev` (Opens a browser window automatically)

If you want to see into the locally running database, install sqlLiteBrowser (`https://sqlitebrowser.org/`) and open `website/server/dev.sqlite3`  This file is not committed to the git repo, but generated via the steps above

## Developers

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

### Client

Create-React-App 2.0 based website, using redux, redux-saga, and modular sass.  Apollo GraphQL client for API requests

### Server

Express based server, with Apollo GraphQL server under `/graphql`
