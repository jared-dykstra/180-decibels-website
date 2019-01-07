import React from 'react'
import PropTypes from 'prop-types'

import Chart from '@material-ui/icons/InsertChartOutlined'
import People from '@material-ui/icons/PeopleOutlined'
import Directions from '@material-ui/icons/DirectionsOutlined'

import { ID_ACCOUNTABILITY, ID_PEOPLE, ID_STRATEGY } from './constants'

const CompetencyIcon = ({ competencyId, ...props }) => {
  switch (competencyId) {
    case ID_ACCOUNTABILITY:
      return <Chart {...props} />
    case ID_PEOPLE:
      return <People {...props} />
    case ID_STRATEGY:
      return <Directions {...props} />
    default:
      return null
  }
}

CompetencyIcon.propTypes = {
  competencyId: PropTypes.string.isRequired,
  className: PropTypes.string
}

CompetencyIcon.defaultProps = {
  className: undefined
}

export default CompetencyIcon
