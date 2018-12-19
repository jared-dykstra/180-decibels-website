import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class FormComponent extends PureComponent {
  static propTypes = {
    active: PropTypes.string,
    id: PropTypes.string.isRequired
  }

  // TODO: Update/Fix this logic...active is the DOM id of the active element, I think?
  static defaultProps = {
    active: ''
  }

  componentDidUpdate(oldProps) {
    const { active, id } = this.props
    if (!oldProps.active && active) {
      const domElement = document.getElementById(id)
      if (domElement) {
        domElement.scrollIntoView()
      }
    }
  }
}
