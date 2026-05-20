import axios from "axios";

const API = axios.create({
  baseURL: "https://us-central1-constructiontracker1.cloudfunctions.net/api",
});

export default API;
