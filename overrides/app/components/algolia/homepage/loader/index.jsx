import React from 'react'

const AlgoliaHeaderFadingLoader = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    animation: 'fadeInOut 3s ease-in-out infinite'
                }}
            />
            <style>
                {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 1; }
            25% { opacity: 0.8; }
            50% { opacity: 0.6; }
            75% { opacity: 0.3; }
          }
        `}
            </style>
        </div>
    )
}

export default AlgoliaHeaderFadingLoader
