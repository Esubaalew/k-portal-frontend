import axios from "axios";

// Function to get all resources
const getAllResources = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/link-resources/");
        return response.data;
    } catch (error) {
        console.error("Error fetching resources:", error.response.data);
        throw new Error("Error fetching resources");
    }
    }

// Function to get a resource by ID

const getResourceById = async (resourceId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/link-resources/${resourceId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching resource:', error.response.data);
        throw new Error('Error fetching resource');
    }
}

export { getAllResources, getResourceById };