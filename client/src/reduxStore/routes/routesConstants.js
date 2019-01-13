// export const ROUTE_CONFIDENTIALITY = '/confidentiality'
// export const ROUTE_HELP_ME = '/help-me'
// export const ROUTE_HELP_ME_QUIZ = '/help-me/quiz'
// export const ROUTE_HELP_MY_TEAM = '/help-my-team'
// export const ROUTE_HELP_MY_TEAM_QUIZ = '/help-my-team/quiz'
// export const ROUTE_HOME = '/'
// export const ROUTE_HOW_WE_WORK = '/how-we-work'
// export const ROUTE_OUR_TEAM = '/our-team'
// export const ROUTE_PRIVACY = '/privacy'
// export const ROUTE_SERVICES = '/services'

const helpMe = '/help-me'
const helpMyTeam = '/help-my-team'
const quiz = '/quiz'
const result = '/result'

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
  ROUTE_SERVICES: '/services'
}
