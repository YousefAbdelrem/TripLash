import React, { useEffect, useState } from 'react'
import apiClient from '../services/api-client';

interface User {
    email : string;
    password : string;
}

const useCheckUser = (User : User) => {
    const [checkUser, setCheckUser] = useState('');
    const [error , setError] =  useState('');
    useEffect(()=> {
        apiClient.post('login', {email: 'sameh13652@gmail.com',
            password :'sameh123'})
        .then(res => {setCheckUser(res.data); console.log(checkUser)})
        .catch(err => setError(err.message));
    }, []);
  return {checkUser , error};

}

export default useCheckUser