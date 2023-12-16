import pool from "./database.js";

const CHECKED_QUERY = [
  "entry",
  "class",
  "subclass",
  "soundoverridesubclass",
  "name",
  "displayid",
  "quality",
  "flags",
  "flagsextra",
  "buycount",
  "buyprice",
  "sellprice",
  "inventorytype",
  "allowableclass",
  "allowablerace",
  "itemlevel",
  "requiredlevel",
  "requiredskill",
  "requiredskillrank",
  "requiredspell",
  "requiredhonorrank",
  "requiredcityrank",
  "requiredreputationfaction",
  "requiredreputationrank",
  "maxcount",
  "stackable",
  "containerslots",
  "statscount",
];

const getItems = async (params = {}) => {
  try {
    const locale = params.locale || "enEN";
    let query = `
      SELECT    it.*, 
                itl.name AS locale_name 
      FROM      acore_world.item_template it 
      LEFT JOIN acore_world.item_template_locale itl ON (entry = id AND locale = '${locale}')
    `;
    console.log("init params", params);
    params = Object.fromEntries(
      Object.entries(params).filter(
        ([key, _value]) => key && CHECKED_QUERY.includes(key.toLowerCase())
      )
    );
    console.log("FINAL PARAMS", params);
    const conditions = Object.keys(params)
      .map((key) => {
        if ("name" === key.toLowerCase()) {
          return `lower(concat(it.name, '|', itl.name) LIKE '%' || ? || '%'`;
        }
        return params[key] !== undefined ? `${key.toLowerCase()} = ?` : null;
      })
      .filter((condition) => condition !== null)
      .join(" AND ");

    if (conditions) {
      query += ` WHERE ${conditions}`;
    }

    query += " LIMIT 1";
    console.log("query is", query);
    const [rows] = await pool.execute(query, Object.values(params));
    return rows;
  } catch (error) {
    console.error("MI ERROR! ", error);
    throw error;
  }
};

export { getItems };
