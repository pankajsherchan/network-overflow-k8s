start:
	docker-compose up -d --build server

sh:
	docker-compose up -d --build server
	docker-compose exec server sh

npm-install:
	docker-compose down
	rm -rf node_modules
	- docker volume create app-server-nodemodules
	- docker rm -f app-npm-install
	docker-compose build server
	docker-compose run --name app-npm-install --entrypoint=npm server install
	docker cp app-npm-install:/app/node_modules .