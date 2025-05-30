import axios from 'axios';
import { User } from '../data/main-data/Userdata';


export const registerUser = async (data: Partial<User>) => {
 const payload = {
      accountName: data.accountName,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
      address: data.address,
      phone: data.phoneNumber,
   };
   return axios.post("https://localhost:7183/User/Register", payload);
};