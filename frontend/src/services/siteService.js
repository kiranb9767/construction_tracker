import API from "./apiConfig";

export const createSite = async (siteData) => {
    try {
        const response = await API.post("/sites", siteData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getSites = async () => {
    try {
        const response = await API.get("/sites");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getSiteById = async (siteId) => {
    try {
        console.log("Fetching site details for ID in service:", siteId);
        const response = await API.get(`/sites/${siteId}`);
        console.log("API response in service for site details:", response);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteSite = async (siteId) => {
    try {
        const response = await API.delete(`/sites/${siteId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

