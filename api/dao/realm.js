import pool from "./database.js";

const getRealms = async () => {
  const query = "SELECT * FROM acore_auth.realmlist ORDER BY name";
  const [rows] = await pool.execute(query);
  return rows;
};

const getRealmCharacters = async (realmId) => {
  const query = "SELECT * FROM acore_auth.realmcharacters WHERE realmid = ?";
  const [rows] = await pool.execute(query, [realmId]);
  return rows;
};

export { getRealms, getRealmCharacters };
