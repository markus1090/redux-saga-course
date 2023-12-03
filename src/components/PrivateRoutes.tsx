import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { currentUserSelector } from '../features/currentUserSlice'
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const { currentUser } = useSelector(currentUserSelector);

  const isLogged = currentUser?.id

  return (
    isLogged ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default PrivateRoutes