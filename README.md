# Basic-blog-app-using-docker-Only-Backend-
Created multiple docker containers(redis, mongoDB, node and nginx) for blog app. To learn more about docker.

# To Run The code: 🏎
Go To code directory and run the following command:

* docker build -t blog . (To create an image)
* docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d (To run a container in development mode)
* docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d (To run a container in production mode)

# Some useful commands: 😉
* docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d **--build** ("--build" is useful when you have installed a new package)
* docker-compose down (Container down)
* docker image ls (To view all images)
* docker ps (To view running containers)
* docker ps -a (To view all containers including the stopped one too)
* docker volume ls (To view all volumes)
* docker rm container_id (To remove a container)
* docker image rm image_id (To remove an image)
* docker volume rm volume_name (To remove a volume)
* docker exec -it container_id bash/ssh/redis-cli (To enter inside the container)
* docker logs container_id -f (To check logs)
