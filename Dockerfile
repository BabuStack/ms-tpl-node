ARG PROJECT="/server"

# Stage-1 (Build)
FROM node:12 as build

ARG PROJECT

RUN mkdir -p $PROJECT
WORKDIR $PROJECT

COPY package* ./
RUN npm i --production --quiet
RUN cp -rf node_modules/ ./node_modules_prod

RUN npm i --quiet

RUN ls
ADD . .

RUN npm run build


# Stage-2 (Final)
FROM node:12-alpine

ARG PROJECT

RUN mkdir $PROJECT
WORKDIR $PROJECT

COPY package* ./

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=1 CMD [ "npm", "run", "health-check" ]

COPY --from=build $PROJECT/node_modules_prod node_modules

COPY --from=build $PROJECT/dist ./dist

ENTRYPOINT [ "npm", "run", "production" ]