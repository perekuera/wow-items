#!/bin/bash

# Define the SOAP service URL with port 7878
soap_url="http://example.com:7878/soap-endpoint"

# Define the SOAP message body in XML format
soap_request='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:YourSOAPRequest>
         <!-- Details of your SOAP request go here -->
      </web:YourSOAPRequest>
   </soapenv:Body>
</soapenv:Envelope>'

# Make the SOAP call using curl and store the response in a temporary file
response=$(curl -s -X POST -H "Content-Type: text/xml" -H "SOAPAction: http://www.example.com/YourSOAPAction" -d "$soap_request" "$soap_url")
# or
# response=$(wget --quiet --output-document - --header="Content-Type: text/xml" --header="SOAPAction: http://www.example.com/YourSOAPAction" --post-data="$soap_request" "$soap_url")


# Extract the content of a specific tag (assuming the tag is "YourElement")
parsed_response=$(echo "$response" | grep -oP '<YourElement>\K[^<]+')



# Print the parsed response
echo "Parsed Response: $parsed_response"
