dev:
	docker-compose up --build
test:
	docker-compose -f .\docker-compose.test.yml -p ruckenprobleme-test up --build
