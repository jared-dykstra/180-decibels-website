import React, { Suspense } from 'react'

const Video = React.lazy(async () => import('./Video'))

const LogInModalLazy = ({ children, ...props }) => {
  const { poster, src } = props
  // Display the cover poster which can play video in new tab while loading
  return (
    <Suspense
      fallback={
        <div
          className="video-react video-react-fluid"
          style={{ paddingTop: '56.25%' }}
        >
          <a href={src} target="_blank" rel="noopener noreferrer">
            <div
              className="video-react video-react-poster"
              style={{
                backgroundImage: `url(${poster})`
              }}
            />
          </a>
        </div>
      }
    >
      <Video {...props} />
    </Suspense>
  )
}

// PropTypes on lazy are not supported
// Video.propTypes = {
//   poster: PropTypes.string.isRequired,
//   src: PropTypes.string.isRequired
// }

export default LogInModalLazy
