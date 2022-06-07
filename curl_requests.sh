# Topping up credit score
 curl --location --request POST 'http://localhost:9003/credit' \
--header 'Content-Type: application/json' \
--data-raw '{
  "amount": "10"
}'


#Adding a message with credit
 curl --location --request POST 'http://localhost:9003/message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "body": "this is a body",
 "destination": "madrid"
}'

echo "\n POST made new record added \n"


#Adding a message with credit
 curl --location --request POST 'http://localhost:9003/message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "body": "this is another body",
 "destination": "torremolinos"
}'

echo "\n  2nd POST made new record added \n"

# # Getting a list of messages
# time curl --location --request GET 'http://localhost:9003/messages' \
# --header 'Content-Type: application/json' \
# --data-raw '{
#   "destination": "STRING",
#   "body": "STRING"
# }'






