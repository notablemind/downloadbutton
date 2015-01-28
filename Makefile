
ARGS=-t [ reactify --es6 --everything --visitors jstransform/visitors/es6-destructuring-visitors ] -x react/addons -x react

all: js css

pages:
	rsync build/* pages/ -rLu

build-pages:
	# lessc -x run.less build/download-button.min.css
	browserify ${ARGS} -d index.js | uglifyjs --screw-ie8 > build/download-button.min.js

vendor:
	browserify -r react/addons -r react -o build/react.js

js:
	browserify ${ARGS} -d index.js -s DownloadButton -o build/download-button.js

watch:
	watchify -v ${ARGS} -d index.js -s DownloadButton -o build/download-button.js

css:
	lessc run.less build/download-button.css

docs:
	demobox -i Readme.md -o pages/index.html
	demobox -i demo.md -o pages/demo.html

gh-pages: pages
	cd pages && git add . && git commit -am'update pages' && git push

es5:
	mkdir -p es5
	@mkdir -p es6
	@cp index.js save-as.js es6
	jsx --harmony es6 es5
	@rm -rf es6



.PHONY: css watch js all start-ipython pages vendor vendorlib es5

