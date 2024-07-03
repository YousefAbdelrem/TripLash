import axios from "axios";

export default axios.create({
  baseURL: "https://triplash-backend.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWEzNmM5NDEwYzc0NGFhYTM5NTY0ZiIsImlhdCI6MTcwOTg0ODI2NSwiZXhwIjoxNzE3NjI0MjY1fQ.HRd1tbyOqFjFooK2jHRg9TWelxz-ruceGWB_enZfJdo",
  },
});
