#!/bin/sh

#rm ~/Library/Ethereum/keys/.DS_Store
ulimit -n 8096

read -r -p "Delete the log? [Y/n] " response
case $response in [nN][oO]|[nN]) 
        ;;
    *)
        rm -f /Users/alexn/geth.log
        ;;
esac

geth --rpc --rpccorsdomain "*"  --unlock ${1:-""} --rpcapi "db,eth,net,personal,web3"  --autodag --rpcaddr "0.0.0.0"  --verbosity "0" --etherbase 0xb1f9faafe5f917d92ebf5b21c25dc77c2cf86000    console 2>>  /Users/alexn/geth.log 

