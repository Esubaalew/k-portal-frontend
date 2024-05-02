import axios from "axios";

const domain = "https://portal.esube.com.et/";

// Function to get all resources
const getAllResources = async (accessToken) => {
    try {
        const response = await axios.get(`${domain}api/resources/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching resources:", error.response.data);
        throw new Error("Error fetching resources");
    }
};

// Function to get a resource by ID
const getResourceById = async (resourceId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/resources/${resourceId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching resource:', error.response.data);
        throw new Error('Error fetching resource');
    }
};

// Function to get metadata for a resource by ID
const getMetadataForResource = async (resourceId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/resources/${resourceId}/metadata/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching resource metadata:', error.response.data);
        throw new Error('Error fetching resource metadata');
    }
};

// Function to add a new resource
const addResource = async (resourceData, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/resources/`, resourceData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding resource:', error.response.data);
        throw new Error('Error adding resource');
    }
};

export { getAllResources, getResourceById, getMetadataForResource, addResource };
