#!/bin/bash

# Define the SOAP service host and port
telnet_host="example.com"
telnet_port=3443
telnet_user="your_username"
telnet_password="your_password"

# Construct the expect script
expect_script=$(cat <<EOL
spawn telnet "$telnet_host" "$telnet_port"
expect "login:"
send "$telnet_user\r"
expect "Password:"
send "$telnet_password\r"
expect "$ "  # Assumes the telnet prompt ends with "$" (adjust as needed)
send "$telnet_additional_command\r"
expect eof
EOL
)

# Run the expect script
response=$(expect -c "$expect_script")

# Extract the content of a specific tag (assuming the tag is "YourElement")
parsed_response=$(echo "$response" | grep -oP '<YourElement>\K[^<]+')

# Process the response as needed
echo "Telnet Response: $parsed_response"
