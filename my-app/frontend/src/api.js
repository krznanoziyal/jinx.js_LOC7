import axios from "axios";

const API_BASE_URL = "https://cf6e-61-246-51-230.ngrok-free.app"; // Ensure this matches your backend's URL and port

// Function to analyze CSV file
export const analyzeCSV = async (csvFile, question) => {
  try {
    const formData = new FormData();
    formData.append("csv_file", csvFile);
    formData.append("question", question);

    const response = await axios.post(`${API_BASE_URL}/analyze/csv`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing CSV:", error);
    return { error: "Could not analyze CSV file." };
  }
};

// Function to generate and analyze graphs
const Charities = async () => {
  try {
    const data1 = await ragGraph(); // Wait for the promise to resolve
    console.log(data1); // Now you can use data1 as it holds the resolved value
    return data1; // Return or use the data as needed
  } catch (error) {
    console.error("Error fetching graph data:", error);
    return null; // Handle the error as needed
  }
};

export default Charities;

// Function to get response from funk()
export const askFunk = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ask`);
    return response;
  } catch (error) {
    console.error("Error with funk endpoint:", error);
    return { error: "Could not retrieve data from funk endpoint." };
  }
};

// Function to get food industry trends
export const getFoodIndustryTrends = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/qna_market`);
    return response.data;
  } catch (error) {
    console.error("Error getting food industry trends:", error);
    return { error: "Could not retrieve food industry trends." };
  }
};

// Function to forecast and evaluate data
export const forecastData = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tsfm`);
    return response.data;
  } catch (error) {
    console.error("Error forecasting data:", error);
    return { error: "Could not forecast data." };
  }
};
