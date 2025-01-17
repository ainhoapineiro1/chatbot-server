#/bin/bash

npm run build

ssh -i ~/.ssh/id_ed25519 verified.service.validtech.xyz "rm -rf /var/www/html/chatbot-test/*"
scp -i ~/.ssh/id_ed25519 -r ./dist/* verified.service.validtech.xyz:/var/www/html/chatbot-test/