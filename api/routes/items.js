import express from "express";
import {
  getItems,
  getItemClasses,
  getItemBondingTypes,
  getItemDamageTypes,
  getItemInventoryTypes,
  getItemMaterials,
  getItemQualities,
  getItemStatTypes,
} from "../dao/item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getItems(req.query));
});

router.get("/item-classes", (_req, res) => {
  res.json(getItemClasses());
});

router.get("/item-bonding-types", (_req, res) => {
  res.json(getItemBondingTypes());
});

router.get("/item-damage-types", (_req, res) => {
  res.json(getItemDamageTypes());
});

router.get("/item-inventory-types", (_req, res) => {
  res.json(getItemInventoryTypes());
});

router.get("/item-materials", (_req, res) => {
  res.json(getItemMaterials());
});

router.get("/item-qualities", (_req, res) => {
  res.json(getItemQualities());
});

router.get("/item-stat-types", (_req, res) => {
  res.json(getItemStatTypes());
});

export default router;
