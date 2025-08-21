import express from "express";
import { getCountriesByName, defineFields } from "@yusifaliyevpro/countries";

const router = express.Router();

// Define the fields we want
const countryFields = defineFields([
  "name",
  "capital",
  "population",
  "region",
  "cca3",
  "flags"
]);

// Fetch by country name
router.get("/name/:country", async (req, res) => {
  try {
    const countryName = req.params.country;
    
    // fullText: false ensures partial / casual match works
    const countries = await getCountriesByName({ name: countryName, fullText: false, fields: countryFields });

    if (!countries || countries.length === 0) {
      return res.status(404).json({ message: "Country not found" });
    }

    // Return the first matching country
    return res.json(countries[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching country data", error: err.message });
  }
});

export default router;
