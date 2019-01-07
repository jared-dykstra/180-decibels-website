import React from 'react'
import PropTypes from 'prop-types'

import { ID_ACCOUNTABILITY, ID_PEOPLE, ID_STRATEGY } from './constants'

import Accountability from './Accountability'
import People from './People'
import StrategicThinking from './StrategicThinking'

const CompetencyDetail = ({ competencyId, ...props }) => {
  switch (competencyId) {
    case ID_ACCOUNTABILITY:
      return <Accountability {...props} />
    case ID_PEOPLE:
      return <People {...props} />
    case ID_STRATEGY:
      return <StrategicThinking {...props} />
    default:
      return null
  }
}

CompetencyDetail.propTypes = {
  competencyId: PropTypes.string.isRequired
}

export default CompetencyDetail
