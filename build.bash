#!/bin/sh

#browserify  -r web3 -r url -r jquery | uglifyjs > plugin/js/bundle.js

browserify  -r web3 | uglifyjs | sed -e 's/\"/\\\"/g' -e 's/^/\"/g' -e 's/$/\"\+/g' -e '1s/^/bundle_js_str=/' >> "HAHAHA" >  plugin/js/bundle.js
