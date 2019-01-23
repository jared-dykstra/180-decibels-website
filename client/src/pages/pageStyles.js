const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 5,
      paddingLeft: theme.spacing.unit * 5,
      '& h1': {
        paddingBottom: theme.spacing.unit
      },
      '& h2': {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit
      },
      '& p': {
        marginLeft: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit
      }
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 6,
      paddingRight: theme.spacing.unit * 10,
      paddingLeft: theme.spacing.unit * 10,
      '& h1': {
        paddingBottom: theme.spacing.unit
      },
      '& h2': {
        marginTop: theme.spacing.unit * 5,
        marginLeft: theme.spacing.unit * 2
      },
      '& p': {
        marginLeft: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit
      }
    }
  }
})

export default styles
