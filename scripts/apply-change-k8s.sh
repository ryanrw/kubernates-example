#! /bin/sh

# apply secret
kubectl apply kubernetes/secret/database.yaml
kubectl apply kubernetes/secret/backend.yaml

# apply deployment
kubectl apply kubernetes/deployment/database.yaml
kubectl apply kubernetes/deployment/backend.yaml

# apply service
kubectl apply kubernetes/service/database.yaml
kubectl apply kubernetes/service/backend.yaml