import http from "http";
import { parseStringPromise } from "xml2js";
import { getUserInfo } from "./account.js";

const SOAP_HOST = process.env.AC_SOAP_HOST;

const sendSoapCommand = async (command, username) => {
  try {
    const password = getUserInfo(username);
    console.log(`Password for user ${username} is ${password}`);

    const requestOptions = {
      port: 7878,
      method: "POST",
      hostname: SOAP_HOST,
      //hostname: "localhost",
      timeout: 5000,
      auth: `${username}:${password}`,
      headers: {
        Accept: "application/xml",
        "Content-Type": "application/xml;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    return new Promise((resolve, reject) => {
      const req = http.request(requestOptions, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", async () => {
          try {
            const xml = await parseStringPromise(data);
            const body = xml["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0];
            const fault = body["SOAP-ENV:Fault"];
            if (fault) {
              return reject({
                faultCode: fault[0]["faultcode"][0],
                faultString: fault[0]["faultstring"][0],
              });
            }
            const response = body["ns1:executeCommandResponse"];
            if (response) {
              return resolve({
                result: response[0]["result"][0],
              });
            }
            console.log(data);
            reject(new Error("Unexpected SOAP response structure."));
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", (error) => {
        reject({
          faultCode: -1,
          faultString: "Request error",
        });
        return;
      });

      const soapEnvelope =
        "<SOAP-ENV:Envelope" +
        ' xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"' +
        ' xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"' +
        ' xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"' +
        ' xmlns:xsd="http://www.w3.org/1999/XMLSchema"' +
        ' xmlns:ns1="urn:AC">' +
        "<SOAP-ENV:Body>" +
        "<ns1:executeCommand>" +
        "<command>" +
        command +
        "</command>" +
        "</ns1:executeCommand>" +
        "</SOAP-ENV:Body>" +
        "</SOAP-ENV:Envelope>";

      req.write(soapEnvelope);

      req.end();
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export { sendSoapCommand };
