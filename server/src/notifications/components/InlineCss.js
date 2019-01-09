import fs from 'fs'
import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable react/no-danger */

const InlineCss = ({ file }) => {
  const css = fs.readFileSync(file)

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: css
      }}
    />
  )
}

InlineCss.propTypes = {
  file: PropTypes.string.isRequired
}

export default InlineCss
