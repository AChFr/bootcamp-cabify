
## API BEHAVIOUR TESTING

This is a chart that shows the expected behaviour of the api. This behaviour can be tested rather by running the [EXECUTABLE.SH FILE](./executable.sh) file with ``./executable.sh``  or ``docker exec bootcamp-cabify-exercise01-1 sh ./executable.sh `` or  [POSTMAN tests Link](./cabifyAppTest.postman_collection.json) with either ``.newman run cabifyAppTest.postman_collection.json --verbose`` or `` docker exec bootcamp-cabify-exercise01-1 node ./newman.js``.
However in both cases, there are two cases that cannot be reprduced so far:
* A real status `500` on the messageapp is very difficult to get since almost all of the possible problems are sorted out at `localhost/9001`. 
* A `408` status is also unobtaiable-at least by me- nither with `Postman` nor `cURL`, althought it is speciofied in the ´Axios´ configuration.

Also it is worth noting that the app has automated integration tests (`npm run test` )that cover almost all of the error cases, with the aforementioned exceptions. 

### ENDPOINT, STATUS & BEHAVIOUR TABLE

Method |Issue| Endpoint | .JSON Payload | Custom  message | Status | 
---------  | ---------  | ---------  |---------  |--------- |--------- |
POST | None. Somtimes it responds with a simulated 500|http://localhost:9001/messages | {"destination": "testDestination", "message":"testMessage"} | "OK" / "This is a \"controlled\" 500 error. This error was created to simulate a non reliable service." | 200/500
POST  | messegeapp returns a real 500|http://localhost:9001/messages |  {"destination": "testDestination", "message":"testMessage"}|"something went terrbly wrong serverwise"| 500
POST | Wrong endpoint |http://localhost:9001/inexistentEndpoint | {"destination": "testDestination", "message":"testMessage"} |"This route does not exist" | 404
POST | Incomplete payload|http://localhost:9001/messages | {"destination": "testDestination"} |"You need to provide both destination and message." | 400
POST | Excesive payload|http://localhost:9001/messages | {"destination": "testDestination", "message":"testMessage","messageAdded":"testMessageAdded"} |"You need to provide destination and message only." | 400
POST | Wrong keys |http://localhost:9001/messages | {"destinationErrr": "testDestination", "messageError":"testMessage" |"The properties can only be called destination and message." | 400
POST | Empty values |http://localhost:9001/messages | {"destination": "", "message":"" |"You need to specify both the destination and the message, they cannot be empty." | 400
POST | JSON written badly |http://localhost:9001/messages | {"destination": "testDestination" "message:"testMessage" |"Your .JSON contains an error" | 500
PUT | Wrong method |http://localhost:9001/messages | {"destination": "testDestination", "message":"testMessage" |"This method is not authorized for this endpoint" | 405
PATCH| Wrong method |http://localhost:9001/messages | {"destination": "testDestination", "message":"testMessage" |"This method is not authorized for this endpoint" | 405
DELETE  | Wrong method |http://localhost:9001/messages | none |"This method is not authorized for this endpoint" | 405
POST  | connection to the messegeapp times out (unable to test and reproduce )|http://localhost:9001/messages |  {"destination": "testDestination", "message":"testMessage"}|"Your request timed out"| 408
###
