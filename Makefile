# Dir
CLIENT_DIR=client
SERVER_DIR=server/cmd/wsrs
DOCKER_DIR=server

# Commands
YARN_DEV=yarn dev
GO_RUN=go run main.go
DOCKER_COMPOSE_DOWN=docker-compose down
DOCKER_COMPOSE_UP=docker-compose up -d

.PHONY: start
start:
	cd $(DOCKER_DIR) && $(DOCKER_COMPOSE_DOWN)
	cd $(DOCKER_DIR) && $(DOCKER_COMPOSE_UP)

	cd $(CLIENT_DIR) && $(YARN_DEV) &

	cd $(SERVER_DIR) && cp ../../.env . && $(GO_RUN)

.PHONY: stop
stop:
	@pkill -f "yarn dev" || true
	@pkill -f "go run main.go" || true

	cd $(DOCKER_DIR) && $(DOCKER_COMPOSE_DOWN)

	cd $(CLIENT_DIR) && yarn stop
