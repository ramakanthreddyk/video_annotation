1. create new file inside root folder Dockerfile(D should be caps)

2. copy following commands inside Dockerfile

FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/

3. build docker image with the following command

docker build -t app_name:v1 . (this should be anything, preferably for you video_annotationn)

4. run docker container

docker run -p 3000:80 --rm app_name:v1

5. sharing docker image

docker build -t [USERNAME]/app_name:v1 .

6. login docker with

docker login

7. push docker image to dockerhub

docker push [USERNAME]/app_name:v1

8. run docker image from docker hub

docker run [USERNAME]/app_name:v1


docker pull ramakanthreddyk/video_annotation:v1