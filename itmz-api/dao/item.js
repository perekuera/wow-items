import pool from "./database.js";

const getItems = async (params = {}) => {
  try {
    let query = "SELECT * FROM acore_world.item_template";

    const conditions = Object.keys(params)
      .map((key) => (params[key] !== undefined ? `${key} = ?` : null))
      .filter((condition) => condition !== null)
      .join(" AND ");

    if (conditions) {
      query += ` WHERE ${conditions}`;
    }

    query += " LIMIT 5";
    console.log("query is: ", query);
    const [rows] = await pool.execute(query, Object.values(params));
    console.log("result is ", rows);
    return rows;
  } catch (error) {
    console.error("MI ERROR! ", error);
    throw error;
  }
};

export { getItems };
