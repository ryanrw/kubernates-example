#! /bin/sh

# create secret
kubectl create -f kubernetes/secret/database.yaml
kubectl create -f kubernetes/secret/backend.yaml

# create deployment
kubectl create -f kubernetes/deployment/database.yaml
kubectl create -f kubernetes/deployment/backend.yaml

# create service
kubectl create -f kubernetes/service/database.yaml
kubectl create -f kubernetes/service/backend.yaml