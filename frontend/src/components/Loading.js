import React from 'react'

import Loader from "react-loader-spinner"

export default function Loading() {
    return (
        <div className="loader">
        <Loader
            type="Grid"
            color="#4B0082"
            secondaryColor="primary"
            height={100}
            width={100}
            timeout={2500}
        />
    </div>
    )
}
