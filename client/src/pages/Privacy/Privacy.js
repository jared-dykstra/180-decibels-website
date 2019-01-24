import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Template } from 'components'
import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles(theme),
  root: {
    [theme.breakpoints.up('md')]: {
      '& ul': {
        marginLeft: theme.spacing.unit * 6
      }
    }
  }
})
const PrivacyPolicy = ({ location, classes }) => (
  <Template
    {...{
      title: '180 Decibels - Privacy',
      location
    }}
  >
    <Paper className={`${classes.paper} ${classes.root}`}>
      <h1>Privacy Policy</h1>

      <Typography variant="body1" paragraph>
        <em>Effective date: December 10, 2018</em>
      </Typography>

      <Typography variant="body1" paragraph>
        180 Decibels (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;)
        operates the{' '}
        <a href="https://www.180decibels.com">https://www.180decibels.com</a>{' '}
        website (the &quot;Service&quot;).
      </Typography>

      <Typography variant="body1" paragraph>
        This page informs you of our policies regarding the collection, use, and
        disclosure of personal data when you use our Service and the choices you
        have associated with that data.
      </Typography>

      <Typography variant="body1" paragraph>
        We use your data to provide and improve the Service. By using the
        Service, you agree to the collection and use of information in
        accordance with this policy. Unless otherwise defined in this Privacy
        Policy, terms used in this Privacy Policy have the same meanings as in
        our Terms and Conditions, accessible from{' '}
        <a href="https://www.180decibels.com">https://www.180decibels.com</a>
      </Typography>

      <h2>Information Collection And Use</h2>

      <Typography variant="body1" paragraph>
        We collect several different types of information for various purposes
        to provide and improve our Service to you.
      </Typography>

      <h3>Types of Data Collected</h3>

      <h4>Personal Data</h4>

      <Typography variant="body1" paragraph>
        While using our Service, we may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you (&quot;Personal Data&quot;). Personally identifiable
        information may include, but is not limited to:
      </Typography>

      <ul>
        <li>Email address</li>
        <li>First name and last name</li>
        <li>Phone number</li>
        <li>Cookies and Usage Data</li>
      </ul>

      <h4>Usage Data</h4>

      <Typography variant="body1" paragraph>
        We may also collect information how the Service is accessed and used
        (&quot;Usage Data&quot;). This Usage Data may include information such
        as your computer&aps;s Internet Protocol address (e.g. IP address),
        browser type, browser version, the pages of our Service that you visit,
        the time and date of your visit, the time spent on those pages, unique
        device identifiers and other diagnostic data.
      </Typography>

      <h4>Tracking &amp; Cookies Data</h4>
      <Typography variant="body1" paragraph>
        We use cookies and similar tracking technologies to track the activity
        on our Service and hold certain information.
      </Typography>
      <Typography variant="body1" paragraph>
        Cookies are files with small amount of data which may include an
        anonymous unique identifier. Cookies are sent to your browser from a
        website and stored on your device. Tracking technologies also used are
        beacons, tags, and scripts to collect and track information and to
        improve and analyze our Service.
      </Typography>
      <Typography variant="body1" paragraph>
        You can instruct your browser to refuse all cookies or to indicate when
        a cookie is being sent. However, if you do not accept cookies, you may
        not be able to use some portions of our Service.
      </Typography>
      <Typography variant="body1" paragraph>
        Examples of Cookies we use:
      </Typography>
      <ul>
        <li>
          <strong>Session Cookies.</strong> We use Session Cookies to operate
          our Service.
        </li>
        <li>
          <strong>Preference Cookies.</strong> We use Preference Cookies to
          remember your preferences and various settings.
        </li>
        <li>
          <strong>Security Cookies.</strong> We use Security Cookies for
          security purposes.
        </li>
      </ul>

      <h2>Use of Data</h2>

      <Typography variant="body1" paragraph>
        180 Decibels uses the collected data for various purposes:
      </Typography>
      <ul>
        <li>To provide and maintain the Service</li>
        <li>To notify you about changes to our Service</li>
        <li>
          To allow you to participate in interactive features of our Service
          when you choose to do so
        </li>
        <li>To provide customer care and support</li>
        <li>
          To provide analysis or valuable information so that we can improve the
          Service
        </li>
        <li>To monitor the usage of the Service</li>
        <li>To detect, prevent and address technical issues</li>
      </ul>

      <h2>Transfer Of Data</h2>
      <Typography variant="body1" paragraph>
        Your information, including Personal Data, may be transferred to — and
        maintained on — computers located outside of your state, province,
        country or other governmental jurisdiction where the data protection
        laws may differ than those from your jurisdiction.
      </Typography>
      <Typography variant="body1" paragraph>
        If you are located outside Canada and choose to provide information to
        us, please note that we transfer the data, including Personal Data, to
        Canada and process it there.
      </Typography>
      <Typography variant="body1" paragraph>
        Your consent to this Privacy Policy followed by your submission of such
        information represents your agreement to that transfer.
      </Typography>
      <Typography variant="body1" paragraph>
        180 Decibels will take all steps reasonably necessary to ensure that
        your data is treated securely and in accordance with this Privacy Policy
        and no transfer of your Personal Data will take place to an organization
        or a country unless there are adequate controls in place including the
        security of your data and other personal information.
      </Typography>

      <h2>Disclosure Of Data</h2>

      <h3>Legal Requirements</h3>
      <Typography variant="body1" paragraph>
        180 Decibels may disclose your Personal Data in the good faith belief
        that such action is necessary to:
      </Typography>
      <ul>
        <li>To comply with a legal obligation</li>
        <li>To protect and defend the rights or property of 180 Decibels</li>
        <li>
          To prevent or investigate possible wrongdoing in connection with the
          Service
        </li>
        <li>
          To protect the personal safety of users of the Service or the public
        </li>
        <li>To protect against legal liability</li>
      </ul>

      <h2>Security Of Data</h2>
      <Typography variant="body1" paragraph>
        The security of your data is important to us, but remember that no
        method of transmission over the Internet, or method of electronic
        storage is 100% secure. While we strive to use commercially acceptable
        means to protect your Personal Data, we cannot guarantee its absolute
        security.
      </Typography>

      <h2>Service Providers</h2>
      <Typography variant="body1" paragraph>
        We may employ third party companies and individuals to facilitate our
        Service (&quot;Service Providers&quot;), to provide the Service on our
        behalf, to perform Service-related services or to assist us in analyzing
        how our Service is used.
      </Typography>
      <Typography variant="body1" paragraph>
        These third parties have access to your Personal Data only to perform
        these tasks on our behalf and are obligated not to disclose or use it
        for any other purpose.
      </Typography>

      <h3>Analytics</h3>
      <Typography variant="body1" paragraph>
        We may use third-party Service Providers to monitor and analyze the use
        of our Service.
      </Typography>
      <h4>Google Analytics</h4>
      <Typography variant="body1" paragraph>
        Google Analytics is a web analytics service offered by Google that
        tracks and reports website traffic. Google uses the data collected to
        track and monitor the use of our Service. This data is shared with other
        Google services. Google may use the collected data to contextualize and
        personalize the ads of its own advertising network.
      </Typography>
      <Typography variant="body1" paragraph>
        You can opt-out of having made your activity on the Service available to
        Google Analytics by installing the Google Analytics opt-out browser
        add-on. The add-on prevents the Google Analytics JavaScript (ga.js,
        analytics.js, and dc.js) from sharing information with Google Analytics
        about visits activity.
      </Typography>
      <Typography variant="body1" paragraph>
        For more information on the privacy practices of Google, please visit
        the Google Privacy &amp; Terms web page:{' '}
        <a href="https://policies.google.com/privacy?hl=en">
          https://policies.google.com/privacy?hl=en
        </a>
      </Typography>

      <h2>Links To Other Sites</h2>
      <Typography variant="body1" paragraph>
        Our Service may contain links to other sites that are not operated by
        us. If you click on a third party link, you will be directed to that
        third party&apos;s site. We strongly advise you to review the Privacy
        Policy of every site you visit.
      </Typography>
      <Typography variant="body1" paragraph>
        We have no control over and assume no responsibility for the content,
        privacy policies or practices of any third party sites or services.
      </Typography>

      <h2>Children&apos;s Privacy</h2>
      <Typography variant="body1" paragraph>
        Our Service does not address anyone under the age of 18
        (&quot;Children&quot;).
      </Typography>
      <Typography variant="body1" paragraph>
        We do not knowingly collect personally identifiable information from
        anyone under the age of 18. If you are a parent or guardian and you are
        aware that your Children has provided us with Personal Data, please
        contact us. If we become aware that we have collected Personal Data from
        children without verification of parental consent, we take steps to
        remove that information from our servers.
      </Typography>

      <h2>Changes To This Privacy Policy</h2>
      <Typography variant="body1" paragraph>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </Typography>
      <Typography variant="body1" paragraph>
        We will let you know via email and/or a prominent notice on our Service,
        prior to the change becoming effective and update the &quot;effective
        date&quot; at the top of this Privacy Policy.
      </Typography>
      <Typography variant="body1" paragraph>
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </Typography>

      <h2>Contact Us</h2>
      <Typography variant="body1" paragraph>
        If you have any questions about this Privacy Policy, please contact us:
      </Typography>
      <ul>
        <li>
          By email:&nbsp;
          <a href="mailto:info@180decibels.com" className="text-nowrap">
            info@180decibels.com
          </a>
        </li>
        <li>
          By phone:&nbsp;
          <a href="tel:+18883214531" className="text-nowrap">
            1-888-321-4531
          </a>
        </li>
      </ul>
    </Paper>
  </Template>
)

PrivacyPolicy.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(PrivacyPolicy)
