docker stop ux-container
docker rm ux-container
docker rmi ux-image
docker build . -t ux-image
docker run -p 80:80 --name ux-container ux-image