import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
//import { useAppStore } from "./app";
//import { useRealmStore } from "./realms";

const pinia = createPinia();

pinia.use(piniaPersist);
//pinia.use(useAppStore);
//pinia.use(useRealmStore);

export default pinia;
