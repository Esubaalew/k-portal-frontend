import axios from "axios";

const domain = "https://portal.esube.com.et/";

// Function to get top users
const getTopUsers = async (accessToken) => {
    try {
        const response = await axios.get(`${domain}api/top-users/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching top users:", error.response.data);
        throw new Error("Error fetching top users");
    }
};

// Function to get top languages
const getTopLanguages = async (accessToken) => {
    try {
        const response = await axios.get(`${domain}api/top-languages/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching top languages:", error.response.data);
        throw new Error("Error fetching top languages");
    }
};

// Function to get to resources
const getTopResources = async (accessToken) => {
    try {
        const response = await axios.get(`${domain}api/top-resources/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching top resources:", error.response.data);
        throw new Error("Error fetching top resources");
    }
};

export { getTopUsers, getTopLanguages, getTopResources };