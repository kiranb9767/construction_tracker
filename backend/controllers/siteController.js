import  e from "express";
import Site from "../models/Site.js";
const router = e.Router();

// Create a new site

async function createSite(req, res) {
    try{
    const { siteName, location, buget, owner, startDate, endDate, remainingBudget } = req.body;

    const site = await Site.create({
        user:req.user.id,
        siteName,
        owner,
        buget,
        location,
        remainingBudget,
        startDate,
        endDate,
        Materials:[],
        Labours:[]
    });

    res.status(201).json({message: "Site created..... ", site});
    }catch(error){
        
    res.status(500).json({message:error.message});

    }
}

// Get all sites
async function getSites(req, res) {
    try{
        const site = await Site.find({ user: req.user.id });
        res.status(200).json(site);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Get a site by ID
async function getSiteById(req, res) {
    try{
        const site = await Site.findById(req.params.id);
        res.status(200).json(site);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Add materials to a site
async function addMaterials(req, res) {
    try{
        const site = await Site.findOne({ _id: req.params.id, user: req.user.id }); 
        const { name, quantity, price, brand, dateOfPurchase, dateofPayment, mediumofPayment } = req.body;

        site.Materials.push({ name, quantity, price, brand, dateOfPurchase, dateofPayment, mediumofPayment });
        site.remainingBudget -= quantity * price; 
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
        const site = await Site.findOne({ _id: siteId, user: req.user.id });

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
        const site = await Site.findOne({ _id: req.params.id, user: req.user.id }); 
        const { name, salary, date, mediumofPayment } = req.body;

        site.Labours.push({ name, salary, date, mediumofPayment });
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
        const site = await Site.findOne({ _id: siteId, user: req.user.id });

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
        await Site.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Site deleted successfully" });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Delete a material from a site
async function deleteMaterial(req, res) {
    try{
        const {siteId, materialId} = req.params;
        const site = await Site.findOne({ _id: siteId, user: req.user.id });
        site.Materials.id(materialId).remove();
        await site.save();
        res.status(200).json({ message: "Material deleted successfully" });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}


// Delete a labour from a site
async function deleteLabour(req, res) {
    try{
        const {siteId, labourId} = req.params;
        const site = await Site.findOne({ _id: siteId, user: req.user.id });
        site.Labours.id(labourId).remove();
        await site.save();
        res.status(200).json({ message: "labour deleted successfully" });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export { createSite, getSites, getSiteById, addMaterials, updateMaterials, addLabours, updateLabours, deleteSite, deleteMaterial, deleteLabour };