dev:
	docker-compose up --build -d
test:
	docker-compose -f ./docker-compose.test.yml build --no-cache mongodb
	docker-compose -f ./docker-compose.test.yml build api

	docker-compose -f ./docker-compose.test.yml -p ruckenprobleme-test run mongodb rm -rf /data/db/*
	docker-compose -f ./docker-compose.test.yml -p ruckenprobleme-test down

	docker-compose -f ./docker-compose.test.yml -p ruckenprobleme-test up --abort-on-container-exit
