import React from 'react'
import { useAppContext } from '../context/AppContext'
import {Navigate ,Outlet} from 'react-router-dom'
function PriveRoute() {
    const {currentUser} = useAppContext()
   

    return currentUser ? <Outlet/> : <Navigate to="/login"/>
}
export default PriveRoute
