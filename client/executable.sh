
echo "\n API ERROR TEST"
echo "\n"
echo "\n ALL IS CORRECT (may return a 'controlled 500')"
curl  -X POST -H 'Content-Type: application/json' -d '{"destination":"testDestination", "message":"testMessage"}' http://localhost:9001/messages    -v
echo "\n WRONG ENDPOINT"
curl  -X POST -H 'Content-Type: application/json' -d '{"destination":"testDestination", "message":"testMessage"}' http://localhost:9001/messagess   -v
 




echo "\n"
echo "\n"
echo "\n 9001 TEST"
echo "\n"
# echo "\n TIMEOUT TO THE API "
# curl -X POST -H 'Content-Type: application/json' -d '{"destination":"testDestination", "message":"testMessage"}' --connect-timeout 0.1 http://localhost:9001/messages-v
echo "\n WRONG CONTENT TYPE"
curl  -X POST  -H 'Content-Type: text' -d 'destination:testDestination' http://localhost:9001/messages  -v
echo "\n INCOMPLETE PAYLOAD"
curl -X POST -H 'Content-Type: application/json' -d '{"destination":"testDestination"}' http://localhost:9001/messages   -v
echo "\n EXCESIVE PAYLOAD"-v
curl -X POST -H 'Content-Type: application/json' -d'{"destination":"testDestination", "message":"testMessage","additionalKey":"additionalValue"}' http://localhost:9001/messages   -v
echo "\n WRONG KEYS"
curl -X POST -H 'Content-Type: application/json' -d '{"destinationErr":"testDestination", "messageErr":"testMessage"}' http://localhost:9001/messages   -v
echo "\n EMPTY VALUE: destination"
curl -X POST -H 'Content-Type: application/json' -d'{"destination":"", "message":"testMessage"}' http://localhost:9001/messages   -v
echo "\n EMPTY VALUE: message"
curl -X POST -H 'Content-Type: application/json' -d '{"destination":"testDestination", "message":""}' http://localhost:9001/messages   -v
echo "\n WRONG METHOD: DELETE"
curl -X DELETE http://localhost:9001/messages   
echo "\n WRONG METHOD: PUT"
curl -X PUT http://localhost:9001/messages   
echo "\n WRONG METHOD: PATCH"
curl -X PATCH http://localhost:9001/messages   