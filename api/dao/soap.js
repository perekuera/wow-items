import http from "http";
import { parseStringPromise } from "xml2js";
import { getUserInfo } from "./account.js";

const SOAP_HOST = process.env.AC_SOAP_HOST;

const sendSoapCommand = (command, username) => {
  try {
    const password = getUserInfo(username);
    console.log(`Password for user ${username} is ${password}`);
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
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
        },
        (res) => {
          res.on("data", async (d) => {
            const xml = await parseStringPromise(d.toString());
            const body = xml["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0];
            const fault = body["SOAP-ENV:Fault"];
            if (fault) {
              reject({
                faultCode: fault[0]["faultcode"][0],
                faultString: fault[0]["faultstring"][0],
              });
              return;
            }
            const response = body["ns1:executeCommandResponse"];
            if (response) {
              resolve({
                result: response[0]["result"][0],
              });
              return;
            }
            console.log(d.toString());
          });
        }
      );
      req.on("error", (error) => {
        reject({
          faultCode: -1,
          faultString: "Request error",
        });
        return;
      });
      req.write(
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
          "</SOAP-ENV:Envelope>"
      );
      req.end();
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export { sendSoapCommand };
