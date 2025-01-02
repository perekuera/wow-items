#!/bin/bash

# Define the SOAP service host and port
telnet_host="localhost"
telnet_port=3443
telnet_user="$1"
telnet_password="$2"
telnet_additional_command="$3"

# Construct the expect script
expect_script=$(cat <<EOL
spawn telnet "$telnet_host" "$telnet_port"
expect "login:"
send "$telnet_user\r"
expect "Password:"
send "$telnet_password\r"
expect "AC>"
send "$telnet_additional_command\r"
expect "AC>"
send "exit"
EOL
)

# Run the expect script
response=$(expect -c "$expect_script")

#matched_content=$(echo "$response" | grep -oP "AC>$telnet_additional_command\K.*" | sed -n '/AC>/,$p')
#matched_content=$(echo "$response" | awk '/AC>'"$telnet_additional_command"'/ {found=1; next} found {print} /AC>/ {found=0}')
matched_content=$(echo "$response" | awk '/AC>'"$telnet_additional_command"'/ {found=1; next} found {if (/AC>/) {found=0} else {print}}')


# Print the response
echo -e "\nMatch: $matched_content"
#echo -e "\nResponse: $response"
