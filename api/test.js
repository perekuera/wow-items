//const { exec } = require("child_process");
import { exec } from "child_process";

exec("telnet localhost 3443", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar telnet: ${error.message}`);
    return;
  }
  console.log(`Salida de telnet: ${stdout}`);
  console.error(`Errores de telnet: ${stderr}`);
});

console.log("fin");
