import { createSelector } from 'reselect'

import { ROUTE_HOME } from './routesConstants'

const routerSelector = state => state.router

export const locationSelector = createSelector(
  routerSelector,
  router => router.location
)

export const isHomePageSelector = createSelector(
  locationSelector,
  location => location.pathname === ROUTE_HOME
)
