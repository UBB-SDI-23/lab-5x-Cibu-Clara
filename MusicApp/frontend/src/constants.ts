const PROD_BACKEND_API_URL = "http://ec2-16-170-171-187.eu-north-1.compute.amazonaws.com";
const DEV_BACKEND_API_URL = "http://127.0.0.1:8000";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;