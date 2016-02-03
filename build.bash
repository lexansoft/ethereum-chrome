#!/bin/sh

browserify  -r uuid | uglifyjs | sed -e 's/require/___require___/g' -e 's/\\/\\\\/g' -e 's/\"/\\\"/g' -e 's/^/\"/g' -e 's/$/\\n\"+/g' -e '1s/^/page_bundle_str_js=/'  >  plugin/js/page_bundle_str.js
echo "\"\";" >> plugin/js/page_bundle_str.js

browserify  -r web3 | uglifyjs | sed -e 's/require/___require___/g' -e 's/\\/\\\\/g' -e 's/\"/\\\"/g' -e 's/^/\"/g' -e 's/$/\\n\"+/g' -e '1s/^/web3_str_js=/'  >  plugin/js/web3_str.js
echo "\"\";" >> plugin/js/web3_str.js


sed -e 's/\\/\\\\/g' -e 's/\"/\\\"/g' -e 's/^/\"/g' -e 's/$/\\n\"+/g' -e '1s/^/page_str_js=/' < plugin_modules/page.js >  plugin/js/page_str.js
echo "\"\";" >> plugin/js/page_str.js

browserify  -r react -r web3 > plugin/js/bg_bundle.js
