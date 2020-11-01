REPOSITORY = spa-disaster-monitor-webpack

help:
	@echo -B --always-make
	@echo first //make this the first and the only commit
	@echo repo //create repository

.PHONY: first
first:
	rm -rfv .git
	git init
	git add --all
	git commit -m "."
	git remote add origin https://github.com/albraga/${REPOSITORY}
	git tag -a v0.1 -m "vue, bootstrap, feather-icons, leaflet"
	git push --tags -u --force origin master 

.PHONY: repo
repo:
	curl -u 'albraga' https://api.github.com/user/repos -d '{"name":"${REPOSITORY}"}'
	$(MAKE) first

.PHONY: pull
pull:
	git fetch --all
	git reset --hard origin/master

.PHONY: push
push:
	git add --all
	git commit -m '.'
	git push

.PHONY: build
build:
	rm -rfv docs
	npx webpack --mode=production

.PHONY: dev
dev:
	npx webpack --watch --progress

.PHONY: serve
serve:
	cd docs && php -S localhost:8080

.PHONY: reset
reset:
	git status
	git reset --hard HEAD

.PHONY: lint
lint:
	@echo arg1=
	npx eslint $(arg1)