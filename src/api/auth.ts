import axios from "axios";
import { User } from "../models/User";

const AUTH_URL = 'http://localhost:3500/users';

export const fetchUserByEmail = async (email:string) => {
    try {
        const response = await axios.get(`${AUTH_URL}?email=${email}`);
        return response.data;
    } catch (error) {   
        console.error(error);
    }
}

export const register = async (user: User) => {
    try {
        const response = await axios.post(AUTH_URL, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}