# aula com banco de dados postgres e mongodb

## comando para rodar docker

- postgres

```
docker run \
    --name postgres \
    -e POSTGRES_USER=paulotiago \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name adminer \
    -p 9876:8080 \
    --link postgres:postgres \
    -d \
    adminer
```
- MONGODB
```
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 8765:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host 192.168.99.100 -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'paulotiago', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"

#docker run -it --rm -v $(pwd):/home/app -w /home/app --link mongodb node:12 node src/mongooseExample.js
```