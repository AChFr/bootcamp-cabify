
echo "\n API ERROR TEST"
echo "\n"
echo "\n ALL IS CORRECT (may return a 'controlled 500')"
curl -d "destination=testName" -d "message=testMessage" http://localhost:9001/messages
echo "\n WRONG ENDPOINT"
curl -d "destination=testName" -d "message=testMessage" http://localhost:9001/messagess


echo "\n"
echo "\n"
echo "\n 9001 TEST"
echo "\n"
echo "\n INCOMPLETE PAYLOAD"
curl  -d"destination=testName" http://localhost:9001/messages
echo "\n EXCESIVE PAYLOAD"
curl  -d"destination=testName" -d "message=testMessage" -d "additionalKey=additionalValue" http://localhost:9001/messages
echo "\n WRONG KEYS"
curl  -d"errorDst=testName" -d "errorMsg=testMessage" http://localhost:9001/messages
echo "\n EMPTY VALUE: destination"
curl  -d"destination=" -d "message=message" http://localhost:9001/messages
echo "\n EMPTY VALUE: message"
curl  -d"destination=testName" -d "message=" http://localhost:9001/messages
echo "\n WRONG METHOD: DELETE"
curl -X DELETE http://localhost:9001/messages
echo "\n WRONG METHOD: PUT"
curl -X PUT http://localhost:9001/messages
echo "\n WRONG METHOD: PATCH"
curl -X PATCH http://localhost:9001/messages