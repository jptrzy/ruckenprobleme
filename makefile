dev:
	docker run -it --rm -p 80:80 -v ./src:/app/src -w /app ruckenprobleme-image

build:
	docker build -t ruckenprobleme-image .
