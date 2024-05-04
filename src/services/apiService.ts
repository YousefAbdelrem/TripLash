    import React, { useEffect, useState } from 'react'
    import apiClient from '../services/api-client';

    interface User {
        username : string;
        password : string;
    }

  
    export default function checkUser (user : User) { 
       
        }

   function addUser(user : User) {
        const [error , setError] =  useState('');
        apiClient.post('signup/', 
        user)
        .then(res => {})
        .catch(err => setError(err.message));


    }



