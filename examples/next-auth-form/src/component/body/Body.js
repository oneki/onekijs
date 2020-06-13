import React from 'react'

export default ({children}) => {
  return <div className="mt-6 sm:mt-0">
    <div className="mt-8 max-w-3xl mx-auto px-8">
      {children}
    </div>
  </div>
}