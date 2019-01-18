const helpMe = '/help-me'
const helpMyTeam = '/help-my-team'
const quiz = '/quiz'
const result = '/result'
const video = '/video'

module.exports = {
  ROUTE_CONFIDENTIALITY: '/confidentiality',
  ROUTE_HELP_ME: helpMe,
  ROUTE_HELP_ME_QUIZ: `${helpMe}${quiz}`,
  ROUTE_HELP_ME_RESULT: `${helpMe}${result}`,
  ROUTE_HELP_MY_TEAM: helpMyTeam,
  ROUTE_HELP_MY_TEAM_QUIZ: `${helpMyTeam}${quiz}`,
  ROUTE_HELP_MY_TEAM_RESULT: `${helpMyTeam}${result}`,
  ROUTE_HOME: '/',
  ROUTE_HOW_WE_WORK: '/how-we-work',
  ROUTE_OUR_TEAM: '/our-team',
  ROUTE_PRIVACY: '/privacy',
  ROUTE_SERVICES: '/services',
  ROUTE_VIDEO_INTRO: `${video}/intro`,
  ROUTE_VIDEO_SUN: `${video}/sun`,
  ROUTE_VAST: '/vast'
}
