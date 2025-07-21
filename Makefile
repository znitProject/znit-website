# ZNIT Website Makefile

.PHONY: help dev build start lint clean install

help:
	@echo "Available commands:"
	@echo "  make install  - Install dependencies"
	@echo "  make dev      - Start development server (port 3000)"
	@echo "  make build    - Production build"
	@echo "  make start    - Start production server"
	@echo "  make lint     - Run ESLint"
	@echo "  make clean    - Remove node_modules and .next"
	@echo "  make reset    - Complete reset (clean + install)"

install:
	@echo "Installing dependencies..."
	npm install

dev:
	@echo "Starting development server... (http://localhost:3000)"
	npm run dev

build:
	@echo "Building for production..."
	npm run build

start:
	@echo "Starting production server..."
	npm run start

lint:
	@echo "Running ESLint..."
	npm run lint

clean:
	@echo "Cleaning up..."
	rm -rf node_modules
	rm -rf .next
	rm -rf package-lock.json

reset: clean install
	@echo "Reset completed!"

setup: install
	@echo "Development environment setup completed!"
	@echo "Run 'make dev' to start the development server" 