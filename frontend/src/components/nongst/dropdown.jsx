import React, { useState } from "react";

const categoryOptions = {
  "ACCESSORIES": ["Covers", "Mats", "Seat Belts", "Mirrors"],
  "BATTERY": ["Lithium", "Lead Acid", "AGM", "Gel"],
  "BEARING": ["Ball Bearing", "Roller Bearing", "Thrust Bearing", "Needle Bearing"],
  "BRAKE": ["Disc Brake", "Drum Brake", "Brake Pad", "Brake Fluid"],
  "CLUTCH": ["Clutch Plate", "Pressure Plate", "Clutch Bearing", "Clutch Cable"],
  "CROWN": ["Crown Gear", "Crown Nut", "Crown Shaft", "Crown Washer"],
  "ELECTRIC": ["Wiring", "Fuses", "Alternator", "Starter Motor"],
  "ENGINE": ["Engine Oil", "Engine Filter", "Engine Mount", "Piston Rings"],
  "FUEL PUMP": ["Electric Pump", "Mechanical Pump", "High-Pressure Pump", "Low-Pressure Pump"],
  "GEAR BOX": ["Gear Oil", "Gear Shaft", "Gear Assembly", "Gear Casing"],
  "GREASING": ["Grease Gun", "Grease Nipples", "Grease Pump", "Grease Hose"],
  "HYDRAULIC": ["Hydraulic Pump", "Hydraulic Fluid", "Hydraulic Cylinder", "Hydraulic Filter"],
  "INSURANCE": ["Comprehensive", "Third-Party", "Own Damage", "Zero Depreciation"],
  "PAINT": ["Primer", "Base Coat", "Clear Coat", "Thinner"],
  "PAPERS": ["Registration", "Permit", "Insurance", "Pollution"],
  "RADIATOR": ["Radiator Fan", "Radiator Coolant", "Radiator Cap", "Radiator Hose"],
  "SUSPENSION": ["Shock Absorber", "Struts", "Springs", "Bushings"],
  "TYRE": ["Radial", "Tubeless", "Bias Ply", "Winter Tyre"],
  "UREA": ["AdBlue", "DEF Solution", "SCR Urea", "Urea Pump"],
  "WELDING": ["MIG Welding", "TIG Welding", "Arc Welding", "Gas Welding"]
};

const CategorySubcategoryDropdown = ({ formData, setFormData }) => {
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });
  };

  return (
    <div>
      <div className="input-container">
        <label className="input-label">Category</label>
        <select
          name="category"
          className="input-field"
          value={formData.category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {Object.keys(categoryOptions).map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <label className="input-label">Subcategory</label>
        <select
          name="subcategory"
          className="input-field"
          value={formData.subcategory}
          onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
          disabled={!formData.category}
        >
          <option value="">Select Subcategory</option>
          {formData.category && categoryOptions[formData.category].map((sub, index) => (
            <option key={index} value={sub}>{sub}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategorySubcategoryDropdown;
