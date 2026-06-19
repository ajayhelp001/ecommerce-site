import React from 'react'

const SectionHeading = ({mianHeading, subHeading, headingClass}) => {
  return (
    <>
        <div className={`heading ${headingClass}`}>{mianHeading} <span>{subHeading}</span></div>
    </>
  )
}

export default SectionHeading