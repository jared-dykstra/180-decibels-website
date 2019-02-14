import uuid from 'uuid/v4'
import { deburr as _deburr } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import { NODE_TYPE_CLASS_MAP } from 'reduxStore/vast/vastConstants'

import {
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  MenuList,
  Popover,
  TextField
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/NoteAdd'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import { createView } from 'reduxStore/vast/vastActions'

const newMenuId = 'new-menu-popover'

const allSuggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' }
]

const renderInputComponent = inputProps => {
  const {
    classes,
    inputRef = () => {},
    ref,
    isEmpty,
    onClear,
    ...other
  } = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input
        },
        startAdornment: (
          /* isEmpty && */ <InputAdornment position="start">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
        endAdornment: !isEmpty && (
          <InputAdornment position="start">
            <IconButton onClick={onClear}>
              <CloseIcon color="disabled" />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...other}
    />
  )
}

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  )
}

const getSuggestions = value => {
  const inputValue = _deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : allSuggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

const getSuggestionValue = suggestion => suggestion.label

const styles = theme => ({
  search: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`
  },
  indented: {
    marginLeft: theme.spacing.unit * 2
  },
  container: {
    position: 'relative',
    marginTop: '1em'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  input: {},
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
})

class AddNewView extends PureComponent {
  static propTypes = {
    elevation: PropTypes.number,
    doCreateView: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    elevation: 2
  }

  constructor(props) {
    super(props)
    this.counter = 0
    this.state = {
      searchValue: '',
      suggestions: [],
      menuNewOpen: false
    }
  }

  // Begin NewMenu handlers
  handleMenuNewToggle = () => {
    this.setState(state => ({ menuNewOpen: !state.menuNewOpen }))
  }

  handleMenuNewClose = event => {
    if (this.newButtonAnchorEl.contains(event.target)) {
      return
    }
    this.setState({ menuNewOpen: false })
  }

  handleMenuNewSelect = (e, nodeTypes) => {
    const { doCreateView } = this.props
    const view = {
      id: uuid(),
      name: `View ${(this.counter += 1)}`,
      nodeTypes
    }
    doCreateView(view)
    this.setState(() => ({ menuNewOpen: false }))
  }
  // End NewMenu handlers

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      searchValue: newValue
    })
  }

  render() {
    const { classes, elevation } = this.props
    const { menuNewOpen, searchValue, suggestions } = this.state

    const renderStaticMenu = () => [
      <MenuItem
        key="all"
        onClick={e =>
          this.handleMenuNewSelect(e, Object.keys(NODE_TYPE_CLASS_MAP))
        }
      >
        All Types
      </MenuItem>,
      ...Object.entries(NODE_TYPE_CLASS_MAP).map(([nodeType, details]) => (
        <MenuItem
          key={nodeType}
          className={classes.indented}
          style={{ color: details.color }}
          onClick={e =>
            this.handleMenuNewSelect(e, [
              nodeType,
              ...details.secondaryDimension
            ])
          }
        >
          {nodeType}
        </MenuItem>
      )),
      <Divider key="divider" />
    ]

    return [
      <IconButton
        key="icon"
        color="secondary"
        aria-label="New Tab"
        buttonRef={node => {
          this.newButtonAnchorEl = node
        }}
        aria-owns={menuNewOpen ? newMenuId : undefined}
        aria-haspopup="true"
        onClick={this.handleMenuNewToggle}
      >
        <CreateIcon />
      </IconButton>,
      <Popover
        key="popover"
        id={newMenuId}
        elevation={elevation}
        open={menuNewOpen}
        onClose={this.handleMenuNewClose}
        anchorEl={this.newButtonAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <nav
          className={classes.root}
          // The Popover's height is calculated and positioned absolute...  Prevent it from jumping after initial render
          style={this.menuHeight ? { height: this.menuHeight } : undefined}
          ref={ref => {
            if (ref) {
              if (!this.menuHeight) {
                this.menuHeight = ref.clientHeight
              }
            }
          }}
        >
          <MenuList>
            {searchValue.length < 1 && renderStaticMenu()}

            <Autosuggest
              {...{
                renderInputComponent,
                suggestions,
                onSuggestionsFetchRequested: this
                  .handleSuggestionsFetchRequested,
                onSuggestionsClearRequested: this
                  .handleSuggestionsClearRequested,
                getSuggestionValue,
                renderSuggestion,
                inputProps: {
                  isEmpty: searchValue === '',
                  classes,
                  className: classes.search,
                  helperText: searchValue !== '' && 'Search For...',
                  placeholder: 'Name',
                  value: searchValue,
                  onChange: this.handleChange,
                  onClear: () => this.setState(() => ({ searchValue: '' }))
                },
                theme: {
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
                }
                // renderSuggestionsContainer: options => (
                //   <Paper {...options.containerProps} square>
                //     {options.children}
                //   </Paper>
                // )
              }}
            />
          </MenuList>
        </nav>
      </Popover>
    ]
  }
}

export const addNewViewButton = ({ onClick }) => (
  <IconButton
    color="secondary"
    aria-label="New Tab"
    aria-haspopup="true"
    onClick={onClick}
  >
    <CreateIcon />
  </IconButton>
)

addNewViewButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default connect(
  () => ({}),
  dispatch => ({
    doCreateView: args => dispatch(createView(args))
  })
)(withStyles(styles)(AddNewView))
