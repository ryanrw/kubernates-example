#! /bin/sh

# delete secret
kubectl delete secret database
kubectl delete secret backend

# delete deployment
kubectl delete deployment database
kubectl delete deployment backend

# delete service
kubectl delete service database
kubectl delete service backend