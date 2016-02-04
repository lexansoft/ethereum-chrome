#!/bin/sh

browserify -t [ babelify --presets [ es2015 react ] ] ./src/client/popup.jsx > plugin/js/popup.js
