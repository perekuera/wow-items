import { execSync } from "child_process";

try {
  execSync("./telnet.sh", { encoding: "utf-8" });
} catch (error) {
  console.error("Error al ejecutar el script de Bash:", error.message);
}
