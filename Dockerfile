FROM node:10.16.0-alpine AS initial
ARG APP_FOLDER=/app

WORKDIR $APP_FOLDER
RUN chown -R node:node $APP_FOLDER
USER node
COPY --chown=node:node . ./

RUN yarn install --frozen-lockfile

FROM initial AS test

USER node

ENTRYPOINT ["yarn", "test"]

FROM initial AS build
ARG SENTRY_DSN
ARG SENTRY_ENV
ARG COMMIT_SHA
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ENV SENTRY_DSN $SENTRY_DSN
ENV SENTRY_ENV $SENTRY_ENV
ENV COMMIT_SHA $COMMIT_SHA
ENV SENTRY_AUTH_TOKEN $SENTRY_AUTH_TOKEN
ENV SENTRY_ORG $SENTRY_ORG
ENV SENTRY_PROJECT $SENTRY_PROJECT

RUN yarn build
RUN yarn sentry-release-init
RUN yarn sentry-release-files
RUN yarn sentry-final-release
RUN yarn sourcemap-cleanup

FROM node:10.16.0-alpine AS final
ARG APP_FOLDER=/app
ARG PORT_NUMBER=5000
EXPOSE $PORT_NUMBER
ENV NODE_ENV production
ENV PORT $PORT_NUMBER

WORKDIR $APP_FOLDER
RUN chown -R node:node $APP_FOLDER
USER node
COPY --chown=node:node --from=build $APP_FOLDER/dist ./dist
COPY --chown=node:node --from=build $APP_FOLDER/src/static ./src/static
COPY --chown=node:node --from=build $APP_FOLDER/next.config.js ./next.config.js
COPY --chown=node:node --from=build $APP_FOLDER/node_modules ./node_modules

ENTRYPOINT ["node", "dist/main.min.js"]
