import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminBaseURL } from '../../config/config';
import toast, { Toaster } from "react-hot-toast";
import { adminDataStore } from '../../reducers/adminSlice';
import { useDispatch } from 'react-redux';
export default function Login() {

    let dispatch=useDispatch()
    let [loginstatus,setLoginstatus]=useState(false)
    let handleLogin=(event)=>{
      
        event.preventDefault();
        let obj={
            uemail:event.target.uemail.value,
            upassword:event.target.upassword.value,
        }

        axios.post(AdminBaseURL+"/auth/login",obj)
        .then((res)=>{
            if(res.data.status){
                dispatch(adminDataStore(res.data.adminData))
                setLoginstatus(true)
            }
            else{
                
                toast.error(res.data.msg);
            }
        })

    }

    let navigator = useNavigate();
    useEffect(()=>{
        if(loginstatus){
            navigator("/Home");
        }
    },[loginstatus])
  return (
    <section className="bg-gray-50 font-urbanist">
        
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Frank and Oak     
      </a>
      <form onSubmit={handleLogin} className="w-[500px] bg-white rounded-lg shadow-2xl">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
              </h1>
         
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input type="email" name="uemail" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" name="upassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                  </div>
                
                  <button type="submit" className="w-full text-white  bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
          
          </div>
      </form>
  </div>
  <Toaster />
</section>
  )
}