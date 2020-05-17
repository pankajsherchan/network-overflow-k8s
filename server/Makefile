
start:
	docker-compose up -d --build api 
	docker-compose exec api bash npm start 

sh:
	docker-compose up -d --build api
	docker-compose exec api sh

npm-install:
	docker-compose down
	rm -rf node_modules
	- docker volume create app-server-nodemodules
	- docker rm -f app-npm-install
	docker-compose build api
	docker-compose run --name app-npm-install --entrypoint=npm api install
	docker cp app-npm-install:/app/node_modules .