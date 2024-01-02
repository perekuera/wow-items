import path from "path";
import { createRequire } from "module";
import { URL } from "url";
import pool from "./database.js";

const require = createRequire(import.meta.url);
const __dirname = new URL(".", import.meta.url).pathname;

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
  "material",
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
  const locale = params.locale || "enEN";
  let query = `
      SELECT    it.*, 
                itl.name AS locale_name 
      FROM      acore_world.item_template it 
      LEFT JOIN acore_world.item_template_locale itl ON (entry = id AND locale = '${locale}')
    `;

  // Special params
  const xConditions = [];
  const xValues = [];

  if (params.desc) {
    xConditions.push(
      `lower(concat(it.name, '|', IFNULL(itl.name, ''))) LIKE concat('%', ?, '%')`
    );
    xValues.push(params.desc);
  }
  if (params.qualities) {
    xConditions.push(`Quality IN (${params.qualities})`);
  }
  if (params.minItemLevel) {
    xConditions.push(`ItemLevel >= ?`);
    xValues.push(parseInt(params.minItemLevel));
  }
  if (params.maxItemLevel) {
    xConditions.push(`ItemLevel <= ?`);
    xValues.push(parseInt(params.maxItemLevel));
  }
  if (params.minRequiredLevel) {
    xConditions.push(`RequiredLevel >= ?`);
    xValues.push(parseInt(params.minRequiredLevel));
  }
  if (params.maxRequiredLevel) {
    xConditions.push(`RequiredLevel <= ?`);
    xValues.push(parseInt(params.minRequiredLevel));
  }

  params = Object.fromEntries(
    Object.entries(params).filter(
      ([key, _value]) => key && CHECKED_QUERY.includes(key.toLowerCase())
    )
  );

  const conditions = Object.keys(params)
    .map((key) => {
      /*if ("name" === key.toLowerCase()) {
        return `lower(concat(it.name, '|', IFNULL(itl.name, ''))) LIKE concat('%', ?, '%')`;
      }*/
      return params[key] !== undefined ? `${key.toLowerCase()} = ?` : null;
    })
    .filter((condition) => condition !== null)
    .concat(xConditions)
    .join(" AND ");

  if (conditions) {
    query += ` WHERE ${conditions}`;
  }

  query += " ORDER BY itl.name, it.name";
  query += " LIMIT 500";

  const values = Object.values(params).concat(xValues);

  const [rows] = await pool.execute(query, values);
  return rows;
};

const getItemClasses = () => {
  return require(path.join(__dirname, "static/item-classes.json"));
};

const getItemBondingTypes = () => {
  return require(path.join(__dirname, "static/item-bonding-types.json"));
};

const getItemDamageTypes = () => {
  return require(path.join(__dirname, "static/item-damage-types.json"));
};

const getItemInventoryTypes = () => {
  return require(path.join(__dirname, "static/item-inventory-types.json"));
};

const getItemMaterials = () => {
  return require(path.join(__dirname, "static/item-materials.json"));
};

const getItemQualities = () => {
  return require(path.join(__dirname, "static/item-qualities.json"));
};

const getItemStatTypes = () => {
  return require(path.join(__dirname, "static/item-stat-types.json"));
};

export {
  getItems,
  getItemClasses,
  getItemBondingTypes,
  getItemDamageTypes,
  getItemInventoryTypes,
  getItemMaterials,
  getItemQualities,
  getItemStatTypes,
};
