const styles = theme => ({
  paper: {
    minHeight: '100vh',
    padding: theme.spacing.unit,
    '& h2': {
      marginTop: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 5,
      paddingLeft: theme.spacing.unit * 5,
      '& h1': {
        paddingBottom: theme.spacing.unit
      },
      '& h2, h3, h4': {
        marginLeft: theme.spacing.unit
      },
      '& p': {
        marginLeft: theme.spacing.unit * 2
      }
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 6,
      paddingRight: theme.spacing.unit * 10,
      paddingLeft: theme.spacing.unit * 10,
      '& h1': {
        paddingBottom: theme.spacing.unit
      },
      '& h2, h3, h4': {
        marginTop: theme.spacing.unit * 5,
        marginLeft: theme.spacing.unit * 2
      },
      '& p': {
        marginLeft: theme.spacing.unit * 4
      }
    }
  },
  quote: {
    margin: theme.spacing.unit * 2,
    [theme.breakpoints.up('2m')]: {
      margin: theme.spacing.unit * 5
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing.unit * 10
    }
  },
  video: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 15,
    [theme.breakpoints.up('md')]: {
      width: '75%',
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  },
  center: {
    textAlign: 'center !important;'
  },
  muted: {
    color: theme.decibels.lightGrey
  }
})

export default styles
