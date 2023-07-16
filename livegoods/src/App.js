import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router/index'

export default function App() {
  return (
    <>
      {useRoutes(routes)}
    </>
  )
}
