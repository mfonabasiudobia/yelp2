import axios from "axios";
import {useState,useEffect} from 'react';

const axiosBase = axios.create({
    baseURL:"https://houstoncultures.herokuapp.com",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosBase;