import React, { useEffect } from 'react'
import { apiEndpoints, httpMethods } from '../../constant/API_ENUM'
import apiConnection from '../../apiConnection'

export default function Dashboard() {

  useEffect(()=>{
    apiConnection(apiEndpoints.GET_USER_ENDPOINT,httpMethods.GET)
  },[])
  return (
    <div>
      Dashboard
    </div>
  )
}
