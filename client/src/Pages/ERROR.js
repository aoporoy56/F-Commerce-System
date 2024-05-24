import React from 'react'
import { Link } from 'react-router-dom'

export default function ERROR() {
  return (
    <div>
      <h1>404</h1>
        <h2>Page Not Found</h2>
        Return to <Link to="/">Home</Link>
    </div>
  )
}
