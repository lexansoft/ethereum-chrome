#!/bin/sh

browserify -r ./src/background/queue.js -r uuid | uglifyjs | sed -e 's/require/___require___/g' -e 's/\\/\\\\/g' -e 's/\"/\\\"/g' -e 's/^/\"/g' -e 's/$/\\n\"+/g' -e '1s/^/page_bundle_str_js=/'  >  plugin/js/page_bundle_str.js
echo "\"\";" >> plugin/js/page_bundle_str.js

browserify  -r web3 | uglifyjs | sed -e 's/require/___require___/g' -e 's/\\/\\\\/g' -e 's/\"/\\\"/g' -e 's/^/\"/g' -e 's/$/\\n\"+/g' -e '1s/^/web3_str_js=/'  >  plugin/js/web3_str.js
echo "\"\";" >> plugin/js/web3_str.js


sed -e 's/\\/\\\\/g' -e 's/\"/\\\"/g' -e 's/^/\"/g' -e 's/$/\\n\"+/g' -e '1s/^/page_str_js=/' < ./src/client/page.js >  plugin/js/page_str.js
echo "\"\";" >> plugin/js/page_str.js

#browserify  -r jquery -r web3 -r ./plugin_modules/ep_tabs.js > plugin/js/bg_bundle.js
browserify ./src/background/background.js  > plugin/js/bg_bundle.js

browserify -t [ babelify --presets [ es2015 react ] ] ./src/client/popup.jsx > plugin/js/popup.js

browserify -r etherid-js | uglifyjs > test/etherid.js
