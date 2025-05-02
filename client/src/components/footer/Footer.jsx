import React from 'react'

const Footer = () => {
  return (
    <div className="bg-white">
      <div className="fLists flex flex-wrap justify-between gap-y-6 px-4 sm:px-8 md:px-16 lg:px-32 mt-20 text-blue-900 max-w-screen-xl mx-auto">
        {[...Array(5)].map((_, idx) => (
          <ul key={idx} className="fList min-w-[120px]">
            <li className="fListItem mb-1">Countries</li>
            <li className="fListItem mb-1">Regions</li>
            <li className="fListItem mb-1">Cities</li>
            <li className="fListItem mb-1">Districts</li>
            <li className="fListItem mb-1">Airports</li>
            <li className="fListItem">Hotels</li>
          </ul>
        ))}
      </div>
      <div className="fText text-center mt-10 mb-6 text-sm text-gray-600">
        © 2023 Chayan Booking. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
