domini-build:
	docker build -t 389798/domini-image .
doimini-run:
	docker run --rm -p 3000:3000 --name domini-main-container 389798/domini-image
domini-stop:
	docker stop domini-main-container 
domini-inside:
	docker exec -it domini-main-container /bin/bash
domini-rmi:
	docker rmi 389798/domini-image 
pg-build:
	docker pull postgres 
pg-rmi:
	docker rmi postgres
pg-up:
	docker run --rm -p 5432:5432 --name pg-domini-container --env-file=./.development.env -e POSTGRES_USER=$PG_USER -e POSTGRES_PASSWORD=$PG_PASSWORD -e POSTGRES_DB=$PG_DB -v pg-domini:/var/lib/postgresql/data --network=domini-network postgres
pg-down:
	docker stop pg-domini-container 
pg-inside-container:
	docker exec -it pg-domini-container /bin/bash

chain-to-life:
	docker build -t 389798/domini-image .
	docker-compose up
	
chain-to-die:
	docker-compose down
	docker-compose stop
	docker rmi 389798/domini-image 