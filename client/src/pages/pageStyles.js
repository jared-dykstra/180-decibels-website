const styles = ({ theme, fullWidth = false, pagePadding = true }) => {
  const pagePaddingUnit = pagePadding ? theme.spacing.unit : 0
  return {
    root: {
      minHeight: '100vh', // <== Ensures the footer is never on screen unless the user scrolls down
      width: 'auto',
      paddingBottom: fullWidth ? undefined : theme.spacing.unit * 15,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: fullWidth
        ? {}
        : {
            width: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto'
          },
      paddingTop: pagePaddingUnit,
      paddingRight: pagePaddingUnit,
      paddingLeft: pagePaddingUnit,
      '& h2': {
        marginTop: theme.spacing.unit * 2
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: pagePaddingUnit * 3,
        paddingRight: pagePaddingUnit * 5,
        paddingLeft: pagePaddingUnit * 5,
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
        paddingTop: pagePaddingUnit * 6,
        paddingRight: pagePaddingUnit * 10,
        paddingLeft: pagePaddingUnit * 10,
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
  }
}

export default styles
