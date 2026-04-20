import  e from "express";
import Site from "../models/Site.js";
const router = e.Router();

// Create a new site

async function createSite(req, res) {
    try{

    console.log(req.body);
    
    const { name, location, budget, owner, startDate, endDate} = req.body;

    const site = await Site.create({
        user:req.user?.id,
        name,
        owner,
        budget,
        location,
        startDate,
        endDate,
        Materials:[],
        Labours:[]
    });
    console.log("SAVED:", site);
    res.status(201).json({message: "Site created..... ", site});
    }catch(error){
    console.error("ERROR:", error); 
    res.status(500).json({message:error.message});

    }
}

// Get all sites
async function getSites(req, res) {
    try{
        const site = await Site.find();
        res.status(200).json({ sites: site });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Get a site by ID
async function getSiteById(req, res) {
    try{
        const { siteId } = req.params;
        console.log("Fetching site with ID:", siteId);
        const site = await Site.findById(siteId);
        res.status(200).json({ site });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Add materials to a site
async function addMaterials(req, res) {
    try{

        const {siteId} = req.params;
        const site = await Site.findOne({ _id: siteId, user: req.user?.id || null }); 
        const { name, quantity, unit, price, brand, dateOfPurchase, dateOfPayment, mediumofPayment } = req.body;

        site.Materials.push({ name, quantity, unit, price, brand, dateOfPurchase, dateOfPayment, mediumofPayment });
        await site.save();
        res.status(200).json({ message: "Material added successfully", site });

    }catch(error){
        res.status(500).json({message:error.message});
    }
}  

// Update materials 

async function updateMaterials(req, res){
    try{
        const {siteId, materialId} = req.params;

        console.log("Updating material with ID:", materialId, "for site ID:", siteId, "Data:", req.body);
        const site = await Site.findOne({ _id: siteId, user: req.user?.id || null });

        const material = site.Materials.id(materialId);
        Object.assign(material, req.body);
        await site.save();
        res.status(200).json({ message: "Material updated successfully", site });

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Add labour to a site
async function addLabours(req, res) {
    try{
        const {siteId} = req.params;
        const site = await Site.findOne({ _id: siteId, user: req.user?.id || null }); 
        const { name, labourType, salary, date, mediumofPayment } = req.body;

        site.Labours.push({ name, labourType, salary, date, mediumofPayment });
        await site.save();
        res.status(200).json({ message: "Labour added successfully", site });

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Update labour 

async function updateLabours(req, res){
    try{
        const {siteId, labourId} = req.params;
        const site = await Site.findOne({ _id: siteId, user: req.user?.id || null });
        console.log("Updating labour with ID:", labourId, "for site ID:", siteId, "Data:", req.body);
        const labour = site.Labours.id(labourId);
        Object.assign(labour, req.body);
        await site.save();
        res.status(200).json({ message: "Labour updated successfully", site });

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Delete a site by ID
async function deleteSite(req, res) {
    try{
        const { siteId } = req.params;
        console.log("Deleting site with ID:", siteId);
        await Site.findByIdAndDelete(siteId);
        res.status(200).json({ message: "Site deleted successfully" });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Delete a material from a site
async function deleteMaterial(req, res) {
    try{
        const {siteId, itemId} = req.params;
        console.log("Deleting material with ID:", itemId, "from site ID:", siteId);
        const site = await Site.findOne({ _id: siteId, user: req.user?.id || null });
        console.log("Site found for deletion:", site);
        console.log("Materials before deletion:", site.Materials.id(itemId));
        site.Materials.pull({ _id: itemId });
        await site.save();
        res.status(200).json({ message: "Material deleted successfully" });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}


// Delete a labour from a site
async function deleteLabour(req, res) {
    try{
        const {siteId, itemId} = req.params;
        const site = await Site.findOne({ _id: siteId, user: req.user?.id || null });
        site.Labours.pull({ _id: itemId });
        await site.save();
        res.status(200).json({ message: "labour deleted successfully" });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export { createSite, getSites, getSiteById, addMaterials, updateMaterials, addLabours, updateLabours, deleteSite, deleteMaterial, deleteLabour };