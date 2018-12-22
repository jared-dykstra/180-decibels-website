import React, { Suspense } from 'react'
import { Paper } from '@material-ui/core'

import Intro from './Intro'
import styles from './SelfAssessment.module.scss'

const SelfAssessment = React.lazy(async () => import('./SelfAssessment'))

const SelfAssessmentLazy = ({ children, ...props }) => (
  <Paper elevation={6}>
    <Suspense
      fallback={
        // Setup divs & class names as this were a carousel slide
        <div className={`${styles.carousel} carousel slide`}>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Intro />
            </div>
          </div>
        </div>
      }
    >
      <SelfAssessment {...props} />
    </Suspense>
  </Paper>
)

export default SelfAssessmentLazy
