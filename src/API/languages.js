import axios from "axios";

const domain = "https://portal.esube.com.et/";

// Function to get all languages
const getAllLanguages = async () => {
    try {
        const response = await axios.get(`${domain}api/languages/`, {
           
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching languages:", error.response.data);
        throw new Error("Error fetching languages");
    }
};

// Function to get a language by ID
const getLanguageById = async (languageId) => {
    try {
        const response = await axios.get(`${domain}api/languages/${languageId}/`, {
        
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching language:', error.response.data);
        throw new Error('Error fetching language');
    }
};


// Function to get language proportions by ID
const getLanguageProportionsById = async (languageId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/languages/${languageId}/proportions/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching language proportions:', error.response.data);
        throw new Error('Error fetching language proportions');
    }
};

export { 
    getAllLanguages, 
    getLanguageById,
    getLanguageProportionsById
};