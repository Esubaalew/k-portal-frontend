import axios from 'axios';

const domain = 'https://portal.esube.com.et/';

// Function to search Wikipedia articles
export const searchWikipedia = async (query, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/wiki/search/${query}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching Wikipedia articles:', error.response.data);
        throw new Error('Error searching Wikipedia articles');
    }
};

// Function to fetch Wikipedia article by title
export const getWikipediaArticle = async (title, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/wiki/article/${title}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Wikipedia article:', error.response.data);
        throw new Error('Error fetching Wikipedia article');
    }
};
