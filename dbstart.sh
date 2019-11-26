#! /bin/sh

# delete the old database
kubectl delete pods database
kubectl delete services database

# run the simple database
kubectl run database --image=postgres:alpine  --env="POSTGRES_PASSWORD=123456" --port=5432 --generator=run-pod/v1

# expose the service
kubectl expose pods database --port=5432 --type=LoadBalancer