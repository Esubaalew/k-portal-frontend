import axios from "axios";

// Function to get all resources
const getAllResources = async (accessToken) => {
    try {
        const response = await axios.get("http://localhost:8000/api/resources/", {
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
        const response = await axios.get(`http://localhost:8000/api/resources/${resourceId}/`, {
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
        const response = await axios.get(`http://localhost:8000/api/resources/${resourceId}/metadata/`, {
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

export { getAllResources, getResourceById, getMetadataForResource };
