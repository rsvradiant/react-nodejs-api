FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY react-app-prj/ ./react-app-prj/
RUN cd react-app-prj && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/react-app-prj/build ./react-app-prj/build
COPY node_web_api/package*.json ./node_web_api/
RUN cd node_web_api && npm install
COPY node_web_api/server.js ./node_web_api/

EXPOSE 80

CMD ["node", "./node_web_api/server.js"]