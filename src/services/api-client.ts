import axios from "axios";

export default axios.create({
    baseURL: 'http://54.242.169.193:9000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWEzNmM5NDEwYzc0NGFhYTM5NTY0ZiIsImlhdCI6MTcwOTg0ODI2NSwiZXhwIjoxNzE3NjI0MjY1fQ.HRd1tbyOqFjFooK2jHRg9TWelxz-ruceGWB_enZfJdo',
      }
})
