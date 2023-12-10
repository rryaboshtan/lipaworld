import styles from "@styles/page.module.css";
import NavMobile from "@components/navMobile/NavMobile";

import {Montserrat} from 'next/font/google';
import Nav from "@components/nav/Nav";

const montserrat = Montserrat({subsets: ['latin']});

export default function PrivacyPolicy(): JSX.Element {
  
  const PRIVACYEMAIL = <a href="mailto: privacy@lipaworld.com" className={styles.actionLink}> privacy@lipaworld.com </a>
  const TELLFREENUMBER = <a href="tel: (555) 555-1234" className={styles.actionLink}> (555) 555-1234 </a>

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile/>

      <div className={styles.policyPage}>
        <h1 className={styles.policyPageHeading}>LIPAWORLD PRIVACY POLICY</h1>
        <div className={styles.policyContainer}>
          <p style={{textAlign: "center"}}>
            <b>Last updated: 11.17.2023</b>
          </p>
          <p>
            This Privacy Policy describes how we at Lipaworld collect, use, disclose, and otherwise process your
            information when you visit our website or mobile application or engage with our services. Please review this
            Privacy Policy carefully as it will help you make informed decisions regarding your information.
          </p>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>PERSONAL INFORMATION WE COLLECT</h2>
            <p>
              In this Privacy Policy, we use the term “Personal Information” to refer to information that we can use to
              identify you. Depending on how you interact with us, we may collect the following types of information
              from you or about you:
            </p>
            <ul className={styles.policyContentList}>
              <li><b>Identifiers,</b> such as your name, email address, phone number, IP address and other online
                identifiers.
              </li>
              <li><b>Information in our customer records,</b> such as your device’s IP address, browser type, operating
                system and platform.
              </li>
              <li><b>Internet and other electronic activity information,</b> such as information we automatically
                receive about the devices you use to access our website or mobile application, the type of Internet
                browser used to visit our website, the areas of our website you visited, and actions you performed on
                our website.
              </li>
            </ul>
            <p>We do not intend to collect information that could be considered sensitive under privacy laws.</p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>HOW WE COLLECT PERSONAL INFORMATION</h2>
            <p>
              Depending on how you use our services, we may collect Personal Information from you in the following ways:
            </p>
            <p>Depending on how you use our website and/or mobile application, we may collect the following categories
              of information from you:</p>
            <ul className={styles.policyContentList}>
              <li>Identity data that helps us identify you as the user of the website and/or mobile application, such as
                your name, email address, country, and zip code.
              </li>
              <li>Transaction data that you enter into the website or mobile application. While you may submit your
                payment information through the website or mobile application, we do not process your payment or other
                information ourselves. We have engaged a third party payment processor who processes your payments.
              </li>
              <li>Technical data about the device you use to access website and mobile application, such as your
                device’s IP address, browser type, operating system and platform.
              </li>
              <li>Usage data about how you use the website and mobile application, including the pages you visit and the
                last time you logged in.
              </li>
              <li>Other data that you may submit through contact forms or email.</li>
            </ul>
            <p>Generally, we collect your personal information directly from you. We may also collect your personal
              information automatically through the use of tracking technologies.</p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>HOW WE USE PERSONAL INFORMATION</h2>
            <p>We may use your Personal Information to:
            </p>
            <ul className={styles.policyContentList}>
              <li>Respond to your requests and questions;</li>
              <li>Market to you, including via email;</li>
              <li>Improve our services and technology;</li>
              <li>Protect the website and mobile application, including the content we display thereon; and</li>
              <li>Detect, investigate, and prevent fraud and other illegal activities, protect the integrity and safety
                of our technology and services, and/or enforce our Terms and Conditions and other terms and policies
                that apply to your use of our website, mobile application, and content.
              </li>
            </ul>
            <p><b>Aggregated Information.</b> We may aggregate Personal Information and use the aggregated information
              to analyze the effectiveness of our services, to improve and add features to our services, and for other
              similar purposes. In addition, from time to time, we may analyze the general behavior and characteristics
              of users of our services and share aggregated information with third parties.</p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>HOW WE DISCLOSE PERSONAL INFORMATION</h2>
            <p>We may disclose your Personal Information with the following categories of third parties:
            </p>
            <ul className={styles.policyContentList}>
              <li><b>Service providers:</b> To assist us in meeting business operations needs and to perform certain
                services and functions, we may share Personal Information with our service providers, including
                providers of hosting services, email communication software, payment processors, customer relationship
                management and customer support services, and analytics services. It is our policy to require these
                parties to only access, process, or store Personal Information in the course of performing their duties
                to us.
              </li>
              <li><b>Third parties involved in business transfers:</b> If we are involved in a merger, acquisition,
                financing due diligence, reorganization, bankruptcy, receivership, sale of all or a portion of our
                assets, transition of service to another providers, or other corporate transaction, your Personal
                Information may be shared in the diligence process with counterparties and others assisting with the
                transaction and transferred to a successor or affiliate as part of that transaction along with other
                assets.
              </li>
              <li><b>Third parties in response to legal requirements:</b> If required to do so by law or in good faith
                belief that such action is necessary to (i) comply with a legal obligation, including to meet national
                security or law enforcement requirements, (ii) protect and defend our rights or property, (iii) prevent
                fraud, (iv) act in urgent circumstances to protect the personal safety of users of the Service, or the
                public, or (v) protect against legal liability.
              </li>
            </ul>

          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>COOKIES AND OTHER DATA COLLECTION TECHNOLOGIES</h2>
            <p>Our website uses cookies. A “cookie” is a small text file that is placed on your computer or mobile
              device when you enter a website or a mobile app. It enables the website or mobile app to remember your
              actions and preferences over a period of time. While the cookies we may use change from time to time, they
              generally fall into one of the following categories:
            </p>
            <ul className={styles.policyContentList}>
              <li>
                <b>Strictly necessary cookies.</b> These cookies are strictly necessary in order for you to use the
                Services, load and view content, and access your account.
              </li>
              <li>
                <b>Functionality cookies.</b> These cookies help us remember you and personalize features and content
                for you on the Services.
              </li>
              <li>
                <b>Preference cookies.</b> These cookies allow us to capture and store your information privacy related
                preferences (e.g., your opt-in and opt-out), account settings, and certain login information.
              </li>
              <li>
                <b>Analytics cookies.</b> These cookies help us and our service providers compile statistics and
                analytics about platform users, including traffic, usage, demographic, and trend data. For example, we
                use Google Analytics to help us understand how users engage with the platform. Google Analytics uses
                cookies to track your interactions with the platform, then collects that information and reports it to
                us. This information helps us improve the Platform so that we can better serve you. If you wish, you can
                opt out of Google Analytics by installing the Google Analytics Opt-Out Browser Add-on.
              </li>
            </ul>
            <p>
              To learn more about cookies and similar technologies, please visit <span>
              <a href="www.allaboutcookies.org" target="_blank"
                 className={styles.actionLink}>www.allaboutcookies.org</a>.
              </span> Most web and mobile device browsers automatically accept cookies. If you prefer, you can change
              your browser to prevent that or to notify you each time a cookie is set.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>PRIVACY RIGHTS</h2>
            <p>
              All users of our services have the following privacy rights:
            </p>
            <ul className={styles.policyContentList}>
              <li>
                <b>Correcting your Information. </b>
                You may contact us to correct any Personal Information you provide to us. We may not accommodate a
                request to change information if we believe the change would violate any law or legal requirement or
                cause the information to be inaccurate.
              </li>
              <li>
                <b>Setting Your Cookie Preferences. </b>
                You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being
                sent. If you disable or refuse cookies, please note that some parts of this site may then be
                inaccessible or not function properly.
              </li>
              <li>
                <b>Promotional Offers from Us. </b>
                If you do not wish to have your contact information used by us to promote our own services, you can
                opt-out by clicking “unsubscribe” on the email you received. This opt-out does not apply to
                transactional or relationship messages we may send regarding your use of our services.
              </li>
            </ul>
            <p>
              The country or state where you are located or reside may grant you additional privacy rights with respect
              to the Personal Information we maintain about you. We included an explanation of these rights for some
              countries and states below.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>NOTICE TO EU/UK INDIVIDUALS</h2>
            <p>
              If you are located in the European Economic Area (EEA) or the United Kingdom (UK), we collect and process
              your Personal Information on the following legal bases:
            </p>
            <ul className={styles.policyContentList}>
              <li>
                <b>With your Consent: </b>
                We may rely on your consent when, for example, we need to collect it for marketing purposes. If our
                processing based on your consent, you may withdraw your consent for such processing at any time.
              </li>
              <li>
                <b>Pursuant to a Contract: </b>
                We may be required to process your Personal Information pursuant to a contract we have with you. For
                example, if you use our website, create a wallet, or purchase tokens, we may process your Personal
                Information pursuant to our Token Purchase Agreement or website Terms of Use.
              </li>
              <li>
                <b>On the Basis of our Legitimate Interests: </b>
                Our legitimate interests may include: improving our services and technology; detecting, investigating,
                and preventing fraud and other illegal activities; protecting the integrity and safety of our technology
                and services; protecting our legal rights and those of others; enforcing our Terms of Use and other
                terms and policies that apply to the use of our services; and pursuant or defending legal claims or for
                other use in legal proceedings.
              </li>
              <li>
                <b>On the Basis of a Legal Obligation: </b>
                We may process your Personal Information because we have a legal obligation to do so, such as to retain
                records and respond to lawful governmental requests.
              </li>
            </ul>
            <p>
              When are the data controller of your Personal Information and your Personal Information is regulated by
              the EU General Data Protection Regulation or the UK Data Protection Regulation, you may email us at
              {PRIVACYEMAIL} to request that we:
            </p>
            <ul className={styles.policyContentList}>
              <li>
                Provide you with access to your Personal Information.
              </li>
              <li>
                Correct inaccurate Personal Information we maintain about you.
              </li>
              <li>
                Delete your personal information.
              </li>
              <li>
                Transfer information to a third party.
              </li>
              <li>
                Restrict the processing of your Personal Information.
              </li>
              <li>
                Stop processing your Personal Information, including when you withdraw your consent (if we have used
                your Personal Information based on your consent).
              </li>
            </ul>
            <p>
              You also have the right to lodge a complaint with your national data protection authority.
              Contact information for EEA data protection authorities can be found on the{" "}
              <a
                href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                target="_blank"
                className={styles.actionLink}
              >
                European Data Protection Board
              </a>{" "}
              website. Contact information for the UK data protection authority can be found on the{" "}
              <a
                href="https://ico.org.uk/"
                target="_blank"
                className={styles.actionLink}
              >
                Information Commissioner’s Office
              </a> website.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>CALIFORNIA PRIVACY RIGHTS</h2>
            <p>
              This Privacy Policy describes our practices over the last 12 months with respect to categories of
              information we collect, the sources of that information, and how we have disclosed it. Specifically, in
              the last 12 months, we have disclosed each category of your Personal Information as follows:
            </p>
            <table className={styles.privacyTable}>
              <thead>
              <tr>
                <th>
                  Category of Personal Information
                </th>
                <th>
                  Recipients To Whom Data is Disclosed for a Business or Commercial Purpose
                </th>
                <th>
                  Recipients to Whom Data is Sold or Shared
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Identifiers</td>
                <td>Service providers; third parties in response to legal requirements</td>
                <td>Not sold or shared</td>
              </tr>
              <tr>
                <td>Information in our customer records</td>
                <td>Service providers; third parties in response to legal requirements</td>
                <td>Not sold or shared</td>
              </tr>
              <tr>
                <td>Internet and other electronic activity information</td>
                <td>Service providers; third parties in response to legal requirements</td>
                <td>Not sold or shared</td>
              </tr>
              </tbody>
            </table>
            <p>
              If you are a California resident, you may request certain information regarding our disclosure of certain
              categories of Personal Information to third parties for those third parties’ direct marketing purposes. To
              make such a request, please contact us at {PRIVACYEMAIL}. This request may be made no more than
              once per
              calendar year, and we reserve our right not to respond to requests submitted other than to the email
              address
              specified below. Note that we do not currently share Personal Information with third parties for those
              third
              parties’ direct marketing purposes.
            </p>
            <p>
              In addition, California residents may have the following additional rights under the California Consumer
              Privacy Act:
            </p>
            <ul className={styles.policyContentList}>
              <li>
                <b>The right to know: </b>
                You have the right to request to know the categories and specific pieces of Personal Information we have
                collected about you; the categories of sources from which that Personal Information was collected; and
                how we have sold, shared, or otherwise disclosed your Personal Information.
              </li>
              <li>
                <b>Right to correct. </b>
                You may have the right to request that we correct inaccurate Personal Information that we maintain about
                you.
              </li>
              <li>
                <b>The right to delete: </b>
                You have the right to request that we delete the Personal Information that we have collected or maintain
                about you. We may deny your request under certain circumstances, such as if we need to comply with our
                legal obligations or complete a transaction for which your Personal Information was collected. If we
                deny your request for deletion, we will let you know the reason why.
              </li>
              <li>
                <b>The right to opt out of sale/sharing: </b>
                You have the right to opt out of the sale or sharing of your Personal Information. We do not currently
                sell or share your Personal Information.
              </li>
            </ul>
            <p>
              You may use an authorized agent to submit a request. When we verify your agent’s request, we may verify
              your identity and request a signed document from your agent that authorizes your agent to make the request
              on your behalf. To protect your Personal Information, we reserve the right to deny a request from an agent
              that does not submit proof that they have been authorized by you to act on their behalf.
            </p>
            <p>
              To exercise your rights, contact us at {PRIVACYEMAIL} or {TELLFREENUMBER}
            </p>
            <p>
              We will take steps to verify your identity before processing your request. We will not fulfill your
              request unless you have provided sufficient information for us to reasonably verify you are the individual
              about whom we collected Personal Information. We will only use the Personal Information provided in the
              verification process to verify your identity or authority to make a request and to track and document
              request responses unless you initially provided the information for another purpose.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>NEVADA PRIVACY RIGHTS</h2>
            <p>
              Nevada law gives residents the right to opt out of the sale of their Personal Information. We are not
              considered a data broker under the Nevada law and do not sell your Personal Information.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>SECURITY OF PERSONAL INFORMATION</h2>
            <p>
              We maintain administrative, technical, and physical safeguards designed to protect against unauthorized
              access, use, modification, and disclosure of your information in our custody and control. No data, on the
              Internet or otherwise, can be guaranteed to be 100% secure. While we strive to protect your information
              from unauthorized access, use, or disclosure, we cannot and do not ensure or warrant the security of your
              information.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>OUR DATA RETENTION PRACTICES</h2>
            <p>
              We retain your Personal Information for only as long as we need it to provide our products and services,
              operate our business, and comply with our legal obligations. When we decide how long to keep your Personal
              Information, we keep in mind the nature and sensitivity of the information, the potential harm from
              unauthorized use, the reasons we collected the Personal Information, and our legal obligations.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>THIRD PARTY WEBSITES</h2>
            <p>
              Our Services may contain links to other websites not operated or controlled by us, including social media
              services. The information that you share with these sites will be governed by the specific privacy
              policies and terms of service of the sites and not by this Privacy Policy. Please contact these
              third-party sites directly for information on their privacy practices and policies.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>DO-NOT-TRACK</h2>
            <p>
              Some web browsers incorporate a “Do Not Track” (“DNT”) or similar feature that signals to websites that a
              user does not want to have his or her online activity and behavior tracked. Because DNT is not uniform
              across browsers, maybe website operators, like us, do not recognize or respond to browser initiated DNT
              signals.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>CHILDREN’S PRIVACY</h2>
            <p>
              We do not knowingly or intend to collect any information from children under 13 or equivalent minimum age
              as prescribed in the laws in relevant jurisdiction.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>INTERNATIONAL USERS</h2>
            <p>
              If you use our services from outside the United States, your Personal Information will be transferred to,
              stored and processed in the United States. The laws in the United States may be different than those in
              your country.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>TRANSFER OF PERSONAL INFORMATION TO OTHER COUNTRIES</h2>
            <p>
              We may transfer the personal information we collect about you to recipients in countries other than the
              country in which you originally provided it, including transferring it outside of the U.S. These countries
              may not have the same data protection laws as the country in which you provided the information. When we
              transfer your information to recipients in other countries, we will protect that information as described
              in this Privacy Notice and will comply with applicable legal requirements providing adequate protection
              for the transfer of personal information to recipients in countries other than the one in which you
              provided the information.
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>CHANGES TO THE PRIVACY POLICY</h2>
            <p>
              We may update our Privacy Policy. When we do so, we will post an updated version on this page, unless
              another type of notice is legally required. Unless you direct us otherwise, the updated Privacy Policy
              will apply to your Personal Information (including the Personal Information we already collected about
              you).
            </p>
          </div>
          <div className={styles.policyContentWrapper}>
            <h2 className={styles.policyContentWrapperTitle}>CONTACT US</h2>
            <p>
              Please feel free to contact us at any time if you have any questions or comments about this Privacy
              Policy. You can contact us or otherwise communicate your privacy concerns via email at
              {PRIVACYEMAIL}.
            </p>
          </div>

        </div>
      </div>

      <Nav/>
    </main>
  )
}