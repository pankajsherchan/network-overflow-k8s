start:
	docker-compose up -d --build client 
	docker-compose exec client bash npm start 


bash:
	docker-compose up -d --build client
	docker-compose exec client bash

npm-install:
	docker-compose down
	rm -rf node_modules
	- docker volume create app-nodemodules
	- docker rm -f app-npm-install
	docker-compose build client
	docker-compose run --name app-npm-install --entrypoint=npm client install
	docker cp app-npm-install:/app/node_modules .