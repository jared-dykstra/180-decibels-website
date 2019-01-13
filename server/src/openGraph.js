import url from 'url'

import {
  ROUTE_HELP_ME,
  ROUTE_HELP_ME_QUIZ,
  ROUTE_HELP_ME_RESULT,
  ROUTE_HELP_MY_TEAM,
  ROUTE_HELP_MY_TEAM_QUIZ,
  ROUTE_HELP_MY_TEAM_RESULT,
  ROUTE_CONFIDENTIALITY,
  ROUTE_HOW_WE_WORK,
  ROUTE_OUR_TEAM,
  ROUTE_SERVICES
} from '../../client/src/reduxStore/routes/routesConstants'

const OG_TITLE = '__DECIBELS_OG_TITLE__'
const OG_URL = '__DECIBELS_OG_URL__'
const OG_DESCRIPTION = '__DECIBELS_OG_DESCRIPTION__'
const OG_IMAGE = '__DECIBELS_OG_IMAGE__'

const getRootUrl = req => {
  const { protocol } = req
  const host = req.get('host')
  return url.format({ protocol, host })
}

/**
 * Default OpenGraph replacement values for a given URL
 */
export const getOgDefaults = req => {
  const { originalUrl } = req
  const rootUrl = getRootUrl(req)
  return {
    [OG_TITLE]: '180 Decibels',
    [OG_URL]: originalUrl,
    [OG_DESCRIPTION]:
      'Removing the Complexity from Managing your Team.  Our mission is to measurably improve team productivity with tactical operational tools and processes.',
    [OG_IMAGE]: `${rootUrl}/180-Decibels.png`
  }
}

/**
 * Customized OpenGraph values for specific URLs
 */
// NOTE: Duplication between this and client/src/pages/Template/Helmet.  React Helmet can be used for <title>, but won't work for meta tags unless SSR or pre-rendering
// The `opengraph` branch has code for pre-rendering via `react-snap`, but it increases the Heroku slug size substantially, as well as requiring a mode
// complex build configuration
// NOTE: Also keep in sync with Sitemap.xml
export const getOgValuesForRoute = req => {
  const { path } = req
  const rootUrl = getRootUrl(req)

  switch (path) {
    // Static Routes
    case ROUTE_CONFIDENTIALITY:
      return {
        [OG_TITLE]: '180 Decibels - Confidentiality',
        [OG_DESCRIPTION]: `Your business is Your business`
      }

    case ROUTE_HOW_WE_WORK:
      return {
        [OG_TITLE]: '180 Decibels - How We Work',
        [OG_DESCRIPTION]: `Do you want more respect? less conflict? Get results without changing who you are as a person`
      }

    case ROUTE_OUR_TEAM:
      return {
        [OG_TITLE]: '180 Decibels - Our Team',
        [OG_DESCRIPTION]: `Our Founders: Dayton Foster, Kerri McGovern, Jared Dykstra`
      }

    case ROUTE_SERVICES:
      return {
        [OG_TITLE]: '180 Decibels - Services',
        [OG_DESCRIPTION]: `Operations, Organization and Team Health, Enterprise Performance Management, and People Advisory Services`
      }

    case ROUTE_HELP_ME_QUIZ:
    case ROUTE_HELP_ME:
      return {
        [OG_TITLE]: '180 Decibels - Help Me',
        [OG_URL]: `${rootUrl}${ROUTE_HELP_ME_QUIZ}`,
        [OG_DESCRIPTION]: `We re-focus managers: driving to outcomes and creating urgency`
      }
    case ROUTE_HELP_MY_TEAM_QUIZ:
    case ROUTE_HELP_MY_TEAM:
      return {
        [OG_TITLE]: '180 Decibels - Help Me',
        [OG_URL]: `${rootUrl}${ROUTE_HELP_MY_TEAM_QUIZ}`,
        [OG_DESCRIPTION]: `We generate real ROI and substantially grow confidence team's ability to execute`
      }
    default: {
      // Dynamic Route Matching

      // Is this a survey result?
      const assessmentResult = path.match(
        new RegExp(
          `(${ROUTE_HELP_ME_RESULT}|${ROUTE_HELP_MY_TEAM_RESULT})/.+`,
          'i'
        )
      )
      if (assessmentResult && assessmentResult[1]) {
        // const route = assessmentResult[1]
        return {
          [OG_TITLE]: '180 Decibels - Assessment Results',
          [OG_DESCRIPTION]: `Congratulations! You're on your way towards improving productivity and reducing costs.`
        }
      }

      // Nothing matched--just use the defaults
      return {}
    }
  }
}
