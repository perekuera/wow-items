import { execSync } from "child_process";

try {
  const result = execSync('./telnet.sh', { encoding: 'utf-8' });
  console.log('Resultado desde el script de Bash:', result.trim());
} catch (error) {
  console.error('Error al ejecutar el script de Bash:', error.message);
}
