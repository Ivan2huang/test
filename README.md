# Distribution Employee Frontend

## Getting Started

### Development Tools

- Mac + VS Code (recommended)
- NodeJS >= v10.x.x
- Yarn >= 1.7.x

### git commit message conventions:

- _task-id | description | author name_

- _E.g. C2-123 | Add readme to repo | Linus_

### How to set up development

1. Download source code from remote repo
2. Put latest .env file into root folder (Ask teammates to share)
3. Install dependencies, by running `yarn`
4. Run for dev environment `yarn dev`
5. Add new line to /etc/hosts `127.0.0.1 localhost.com`
6. Connect to office network by VPN (optional)
7. Preview application at `https://localhost.com:443`

### How to build production

1. Set up token and install dependencies (Step 1 and step 2 from how to setup development)
2. Build the solution, by running `yarn build`
3. Run application, by running `yarn start`

### How to run test

1. Set up token and install dependencies (Step 1 and step 2 from how to setup development)
2. Run tests, by running `yarn test`

---

## Built With

- [NextJS](https://github.com/zeit/next.js) - React framework used for building server-side web application
- [Typescript](https://github.com/Microsoft/TypeScript) - Superset of JavaScript, and adds optional static typing to the language JS
- [Redux](https://github.com/reduxjs/redux) - Predictable State management container
- [Jest](https://jestjs.io/) - Testing framework
- [React-testing-library](https://github.com/kentcdodds/react-testing-library) - Testing library of choice for react framework
- TBC - E2E testing framework
- [Redux-thunk](https://github.com/reduxjs/redux-thunk) - For handling asynchronous API calls in Redux
- [Redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) - Enables simple, yet robust handling of async action creators in Redux
- [Redux-logger](https://github.com/LogRocket/redux-logger), [Redux-devtools extension](https://github.com/zalmoxisus/redux-devtools-extension) -For logging purposes in development environment
- [Docker](https://docs.docker.com/) - Docker engine
- [Eslint](https://eslint.org/), [Tslint](https://palantir.github.io/tslint/)- Code style linters
- [Prettier](https://github.com/prettier/prettier) - Opinionated code formatter
- [React-intl](https://github.com/yahoo/react-intl) - For localisation purposes
- [Yarn](https://yarnpkg.com/lang/en/) - Dependency management of choice

---

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/cxagroup/distribution-employee-frontend.git).

## Authors

**CXAGroup** - **ThoughtWorks**

## FAQs

TBC

---

## TypeScript Next.js boilerplate example

Please refer to [https://github.com/zeit/next.js/tree/canary/examples/with-typescript](https://github.com/zeit/next.js/tree/canary/examples/with-typescript)
