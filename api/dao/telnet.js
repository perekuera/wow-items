import { Telnet } from "telnet-client";

const sendTelnetCommand = async () => {
  const telnet = new Telnet();
  try {
    console.log("host", process.env.AC_TELNET_HOST);
    await telnet.connect({
      host: process.env.AC_TELNET_HOST,
      port: 3443,
      timeout: 10000,
      username: "xxx",
      password: "xxx",
    });
  } catch (error) {
    console.log("telnet error", error);
    throw new Error(error);
  }
  const res = await telnet.exec("uptime");
  console.log("result", res);
  return res;
};

export default sendTelnetCommand;
