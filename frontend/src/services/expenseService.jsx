import API from "./apiConfig";


export const addMaterial = async (siteId, materialData) => {
    try {
        console.log("Adding material to site ID in service:", siteId, materialData);
        const response = await API.post(`/sites/${siteId}/materials`, materialData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateMaterial = async (siteId, materialId, materialData) => {
    try {
        console.log("Updating material in service for site ID:", siteId, "material ID:", materialId, "Data:", materialData);
        const response = await API.post(`/sites/${siteId}/materials/${materialId}`, materialData);  
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteMaterial = async (siteId, materialId) => {
    try {
        const response = await API.delete(`/sites/${siteId}/materials/${materialId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


export const addLabour = async (siteId, labourData) => {
    try {
        const response = await API.post(`/sites/${siteId}/labour`, labourData);     
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateLabour = async (siteId, labourId, labourData) => {
    try {
        const response = await API.post(`/sites/${siteId}/labour/${labourId}`, labourData);             
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteLabour = async (siteId, labourId) => {
    try {
        const response = await API.delete(`/sites/${siteId}/labour/${labourId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


