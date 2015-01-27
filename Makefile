
ARGS=-t [ reactify --es6 --everything --visitors jstransform/visitors/es6-destructuring-visitors ] -x react/addons

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

gh-pages: pages
	cd pages && git add . && git commit -am'update pages' && git push



.PHONY: css watch js all start-ipython pages vendor vendorlib

