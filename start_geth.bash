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

geth --rpc --rpcapi "db,eth,net,personal,web3" 

