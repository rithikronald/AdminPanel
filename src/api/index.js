import axios from "axios";
import { BASE_URL } from "configs/auth.config";

export const adminInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzgxOTQ0MzYyLCJpYXQiOjE3Mzg3NDQzNjIsImp0aSI6ImY0NDc5YmJkMjRmZDQ4MjQ5MDZjNjE2NTc5ZjlhYjQxIiwidXNlcl9pZCI6IjdmMDQyZDM5LTI0YWItNDI0My05ZjY3LWMyNTczZjMyZDYyMCJ9.7-hJJtf8xpGIXSxTGZmDFOCih0sjnFvT6oHyTYIbCNo",
  },
});
