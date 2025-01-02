#!/bin/bash

# Define the SOAP service URL with port 7878
soap_url="http://localhost:7878/soap-endpoint"

# Define the SOAP message body in XML format
soap_request='
<SOAP-ENV:Envelope  
    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" 
    xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance" 
    xmlns:xsd="http://www.w3.org/1999/XMLSchema" 
    xmlns:ns1="urn:AC">
    <SOAP-ENV:Body>
	<ns1:executeCommand>
	    <command>server status</command>
	</ns1:executeCommand>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>'

# Make the SOAP call using curl and store the response in a temporary file
response=$(curl -s -X POST -H "Content-Type: text/xml" -H "SOAPAction: http://localhost:7878/YourSOAPAction" -d "$soap_request" "$soap_url")
# or
# response=$(wget --quiet --output-document - --header="Content-Type: text/xml" --header="SOAPAction: http://www.example.com/YourSOAPAction" --post-data="$soap_request" "$soap_url")


# Extract the content of a specific tag (assuming the tag is "YourElement")
parsed_response=$(echo "$response" | grep -oP '<YourElement>\K[^<]+')

# Print the response
echo "Response: $response"


# Print the parsed response
echo "Parsed Response: $parsed_response"
