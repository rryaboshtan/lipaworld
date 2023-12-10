import styles from "@styles/page.module.css";
import NavMobile from "@components/navMobile/NavMobile";

import {Montserrat} from 'next/font/google';
import Nav from "@components/nav/Nav";

const montserrat = Montserrat({subsets: ['latin']});

export default function TermsConditions(): JSX.Element {

  const URL = <a href="https://lipaworld.com/" className={styles.actionLink}> lipaworld.com </a>
  const LINK = <a href="https://lipaworld.com/" className={styles.actionLink}>https://lipaworld.com/</a>
  const SUPPORTEMAIL = <a href="mailto: support@lipaworld.com" className={styles.actionLink}>support@lipaworld.com</a>

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile/>
      <div className={styles.policyPage}>
        <div style={{padding: "16px 0"}}>
          <b>
            THIS PARAGRAPH CONTAINS AN IMPORTANT NOTICE. PLEASE READ IT CAREFULLY. SECTION 14 OF THIS DOCUMENT REQUIRES
            ARBITRATION ON AN INDIVIDUAL BASIS, AND SECTION 15 LIMITS THE TIME PERIOD WITHIN WHICH YOU MAY BRING A CLAIM
            AGAINST US.
          </b>
        </div>
        <h1 className={styles.policyPageHeading}>TERMS OF USE</h1>
        <div className={styles.policyContainer}>
          <p>
            Last Modified: 11.17.2023
          </p>
          <div className={styles.policyContentWrapper}>
            <ol className={styles.policyContentList}>
              <li><b>Acceptance. </b>
                These Terms of Use are entered into by and between you (acting in your personal
                capacity) (“<b>you</b>”) and [Lipaworld Corp], a Delaware limited liability company
                (&ldquo;<b>Company</b>&rdquo;, &ldquo;<b>we</b>&rdquo; or &ldquo;<b>us</b>&rdquo;).
                The following terms and conditions, together with any documents they expressly incorporate by reference
                (collectively, this “<b>Agreement</b>”), govern your access to and use of our website and mobile
                application
                including any content, functionality, and services offered on, through, or in connection with our
                website or mobile application, available at {URL} (such services, the “<b>Services,</b>” and
                collectively
                (including the Services), the &ldquo;<b>Website</b>&rdquo;). Please read this Agreement carefully before
                you
                start to use
                the Website. By using the Website or by clicking to accept or agree to this Agreement, you accept and
                agree to be bound by this Agreement. If you do not want to agree to this Agreement, you must not access
                or use the Website. <b>You acknowledge that this Agreement contains legally binding terms and conditions
                  that affect your legal rights and remedies.</b>
              </li>
              <li><b>Changes to These Terms. </b>
                We reserve the right to change this Agreement at any time upon notice.
                We may give notice by posting the updated Agreement on the Website, by providing notice to the contact
                information you have provided to us, or by any other reasonable means. You can review the most current
                version of this Agreement at any time at {LINK} The version of the Agreement in effect at the time of
                your use of the Website applies. The updated Agreement is binding on you with respect to your use of the
                Website on or after the date indicated in the updated Agreement. If you do not agree to the updated
                Agreement, you must stop using the Website. Your continued use of the Website after the date of the
                updated Agreement will constitute your acceptance of the updated Agreement.
              </li>
              <li><b>Service Fees. </b>
                During the course of accessing the Website, you may incur various fees including but not limited to
                banking fees, custody fees, Automated Clearing House (ACH) fees, wire payment fees, and third-party
                partner fees. You are solely responsible for paying any and all of these fees that may arise. We reserve
                the right to charge service fees for providing our services to you. The service fees may be a flat fee
                or a percentage of your transaction amount. The services fees we charge, if any, will be displayed prior
                to you making any transaction. If any commissions, fees, or costs are not clear to you, you must request
                clarification of what fees will be applicable before entering into any transaction by sending an email
                to {SUPPORTEMAIL}. By entering into any transaction on the Website, you hereby accept any such
                commissions, fees, or costs.
              </li>
              <li><b>Accessing the Website. </b>
                We reserve the right to withdraw or amend the Website in our sole discretion without notice. We will not
                be liable if for any reason all or any part of the Website is unavailable at any time. From time to
                time, we may restrict access to the Website to certain users. To access the Website, you may be asked to
                provide certain registration details or other information. It is a condition of your use of the Website
                that all the information you provide on or in connection with the Website is correct, current, and
                complete. You hereby consent to all actions we take, consistent with our Privacy Policy and this
                Agreement, with respect to all information you provide to or in connection with the Website, including
                through the use of any interactive features on the Website (collectively, “<b>User Submissions</b>”). We
                may
                disable any username, password, or other identifier at any time, in our sole discretion for any or no
                reason, including if, in our opinion, you have violated any provision of this Agreement. By accessing or
                using the Website, you confirm that you have received notice of the Privacy Policy and that you
                understand and acknowledge that your personal information may be collected, shared, and otherwise
                processed in accordance with the Privacy Policy.
              </li>
              <li><b>Use of Information Provided by You. </b>
                You acknowledge, represent and agree that, except as required by applicable law or as set forth in our
                Privacy Policy, any User Submission is submitted voluntarily and is not confidential or proprietary, and
                that your User Submission does not establish a relationship between you and us. You hereby grant the
                Company and its sublicensees a worldwide, royalty-free, non-exclusive, transferable, sub-licensable,
                perpetual and irrevocable license to use, distribute, transmit, reproduce, modify, publish, translate,
                publicly perform and display and create derivative works of your User Submissions, except as otherwise
                prohibited by applicable law, our Privacy Policy, or this Agreement. You waive any right to compensation
                of any type for your User Submissions. You represent and warrant that you either own all User
                Submissions or otherwise have all rights necessary to grant the rights in this Agreement and that use of
                User Submissions by us does not violate any law. In connection with the Website, you may not upload,
                distribute, or otherwise publish any content that is libelous, defamatory, obscene, threatening,
                invasive of privacy or publicity rights, abusive, illegal, or otherwise objectionable, or that may
                constitute or encourage a criminal offense, violate the rights of any party or that may otherwise give
                rise to liability or violate any law.
              </li>
              <li><b>Consent to Electronic Communications. </b>
                You agree that any notices, agreements, disclosures, or other communications that we send to you
                electronically will satisfy any legal communication requirements, including, but not limited to, that
                such communications be in writing. You should maintain copies of electronic communications from us by
                printing a paper copy or saving an electronic copy. We may also send you promotional communications via
                email, including, but not limited to, newsletters, special offers, surveys, and other news and
                information we think will be of interest to you. You may opt out of receiving these promotional emails
                at any time by following the unsubscribe instructions provided therein.
              </li>
              <li><b>Mobile Service Charges. </b>
                If you use the Services on a mobile device, or if you send or receive electronic communications to or
                from us on a mobile device, your wireless carrier may impose data and/or other charges, and you
                understand and agree that you will be solely responsible for any and all such charges from your wireless
                carrier.
              </li>
              <li><b>Reservation of Rights. </b>
                We reserve the right to modify or discontinue all or any part of the Services at any time in our sole
                discretion, with or without notice. We will not be liable to you or to any other user, if for any reason
                all or any part of the Website becomes unavailable at any time or in any location. We also reserve the
                right to suspend or terminate your use of the Services, if we determine (in our sole judgment) that you
                are in violation of these Terms or any applicable law or that your use of the Services may expose us or
                any of our suppliers or partners to liability of any kind, or may adversely affect the brand or
                reputation of the Company.
              </li>
              <li><b>Intellectual Property Rights. </b>
                The Website (including all information, software, text, displays, images, video, and audio, and the
                design, selection, and arrangement of those things), and associated know-how, are owned by Company, its
                licensors, or other providers and are protected by United States and international copyright, trademark,
                patent, trade secret, and other intellectual property or proprietary rights laws (“<b>Website IP</b>”).
                The
                Company retains all right, title, and interest in and to the Website IP. This Agreement contains no
                implied licenses. You will not reproduce, distribute, modify, create derivative works of, publicly
                display, publicly perform, republish, download, store, or transmit any part of our Website without our
                prior written consent.
              </li>
              <li><b>Permitted Uses. </b>
                You represent and warrant that (1) you are at least 18 years of age; (2) you have full power and
                authority to enter into this Agreement; (3) you are not located in, under the control of, or a national
                or resident of any country subject to sanctions by the United States; (4) you have not been placed on
                the U.S. Department of Commerce’s Denied Persons List; (5) you are not identified as a “Specially
                Designated National” by the United States government; (6) you are not subject to any trade embargoes or
                economic sanctions lists, such as the United Nations Security Council Sanctions List, or the list of
                specifically designated nationals maintained by the Office of Foreign Assets Control; and (7) you will
                not access the Website if you have previously been prohibited from doing so or if any laws prohibit you
                from doing so. We do not intend for the Website to be used by persons or entities in countries or
                jurisdictions that require us to obtain any additional registration or license. If you are in such a
                country or jurisdiction, you are not authorized to and agree that you will not use the Website. You may
                use the Website only for lawful purposes and in accordance with this Agreement. You understand and
                accept that we are not liable for any losses or liability relating to your eligibility or ineligibility
                to access or use our Website.
              </li>
              <li><b>Prohibited Uses. </b>
                You agree not to (a) use the Website in any way that violates any applicable federal, state, local, or
                international law or regulation, (b) use the Website for any unauthorized, fraudulent, or malicious
                purpose, (c) engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of
                the
                Website, or which, as determined by us, may harm the Company or users of the Website or expose them to
                liability, (d) use the Website in any manner that could disable, overburden, damage, or impair the
                Website, (e) use any robot, spider, or other automatic device, process, or means to access the Website
                for any purpose, including monitoring or copying any of the material on the Website, (f) access systems,
                data or information not intended by us to be made accessible to a user, (g) obtain or attempt to obtain
                any materials or information through any means not intentionally made available by us; or (f) use the
                Website for any use other than the purpose for which it was intended. For example, you will not use the
                Website in connection with money laundering or the financing of terrorism. You further understand and
                agree that we strictly prohibit unfair trading practices. We reserve the right to restrict your access
                to our Website if you perform or we suspect you are in beach of this Agreement, including if you are
                performing any of the following actions (1) price manipulation or any other market manipulation; (2)
                harming the Website or other users of the Website; or (3) violating or attempt to violate another user’s
                legal rights. We reserve the right to contact and cooperate with relevant legal or regulatory
                authorities regarding your behavior if we deem that to be necessary in our sole discretion.
                Additionally, we reserve the right to block certain parties that we determine to be associated with
                illegal activity or activity that otherwise violates this Agreement (“<b>Blocked Parties</b>”). We may
                freeze
                vouchers in the event we receive a legal order from a valid government authority requiring the Company
                to do so. You understand and agree that we shall not be liable for any losses that you may incur as a
                result of any of the aforementioned.
              </li>
              <li><b>Reliance on Information Posted. </b>
                We do not warrant the accuracy, completeness, or usefulness of any information presented on or through
                the Website. Any reliance you place on such information is strictly at your own risk. We disclaim all
                liability and responsibility arising from any reliance placed on such materials by you or any other
                visitor to the Website, or by anyone who may be informed of any of its contents.
              </li>
              <li><b>Links from the Website. </b>
                If the Website contains links to other sites or resources provided by third parties, or otherwise
                contains or integrates information, content, or materials provided by third parties (collectively,
                “<b>Third Party Materials</b>”), these Third Party Materials are provided for your convenience only. We
                have no
                control over the Third Party Materials, and accept no responsibility for them or for any loss or damage
                that may arise from your use of them. If you access any such Third Party Materials, you do so entirely
                at your own risk and subject to any applicable terms and conditions for such Third Party Materials.
              </li>
              <li><b>Agent of Payee Appointment. </b>
                By agreeing to this Agreement, you hereby agree to appoint us as an Agent of Payee or other similar
                designation pursuant to the laws of your state, country, or jurisdiction, where applicable.
              </li>
              <li><b>Disclaimer of Warranties. </b>
                YOUR USE OF THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE IS PROVIDED ON AN &ldquo;AS
                IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
                BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON
                ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
                SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE. WITHOUT LIMITING THE
                FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE
                WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT
                OUR WEBSITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR
                THAT THE WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS. TO THE FULLEST EXTENT PROVIDED BY LAW,
                THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR
                OTHERWISE, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR
                PURPOSE.
              </li>
              <li><b>Limitation of Liability. </b>
                TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS,
                SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS (COLLECTIVELY, “<b>LIPAWORLD PARTIES</b>”)
                BE
                LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RELATED TO THIS
                AGREEMENT OR YOUR USE OF, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, OR ANY CONTENT ON
                THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS,
                LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF
                GOODWILL, OR LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR
                OTHERWISE, EVEN IF FORESEEABLE. THE AGGREGATE LIABILITY OF THE LIPAWORLD PARTIES TO YOU FOR ALL CLAIMS
                AND DAMAGES RELATED TO THIS AGREEMENT OR YOUR USE OR INABILITY TO USE THE WEBSITE, ANY WEBSITES LINKED
                TO IT, ANY CONTENT OR SERVICES ON OR PROVIDED IN CONNECTION WITH THE WEBSITE OR SUCH OTHER WEBSITES WILL
                NOT EXCEED THE GREATER OF (A) $100 U.S. DOLLARS, AND (B) ALL AMOUNTS ACTUALLY PAID BY YOU TO US UNDER
                THIS AGREEMENT IN THE 6 MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
                <br/><br/>
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF SUCH DAMAGES OR LIABILITY. NOTHING IN
                THIS SECTION 12 WILL BE INTERPRETED AS EXCLUDING LIABILITY THAT CANNOT UNDER APPLICABLE LAW BE EXCLUDED.
                <br/><br/>
                If you are a California resident, you hereby waive California Civil Code §1542, which states: “A general
                release does not extend to claims that the creditor or releasing party does not know or suspect to exist
                in his or her favor at the time of executing the release, and that if known by him or her would have
                materially affected his settlement with the debtor or released party.” This release includes the
                criminal acts of others. If you are not a California resident, you waive your rights under any statute
                or common law principle similar to §1542 that governs your rights in the jurisdiction of your residence.
              </li>
              <li><b>Indemnification. </b>
                You will defend, indemnify, and hold harmless the Lipaworld Parties from and against any third party
                claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable
                attorneys&apos; fees) arising out of or relating to (a) your violation or breach of this Agreement, (b)
                your
                use of the Website, (c) any User Submission made by you, including with respect to violations of any
                other party’s rights, such as intellectual property or other proprietary rights, and laws related to
                privacy or information security; or (d) your violation of any other party’s rights or applicable law.
              </li>
              <li><b>Arbitration and Governing Law. </b>
                YOU WILL SUBMIT ANY DISPUTES ARISING FROM THIS AGREEMENT OR THE WEBSITE, INCLUDING DISPUTES ARISING FROM
                OR CONCERNING THEIR INTERPRETATION, VIOLATION, INVALIDITY, NON-PERFORMANCE, OR TERMINATION, TO FINAL AND
                BINDING ARBITRATION UNDER THE COMMERCIAL ARBITRATION RULES AND MEDIATION PROCEDURES OF THE AMERICAN
                ARBITRATION ASSOCIATION APPLYING NEW YORK LAW. THE SEAT OR LEGAL PLACE OF ARBITRATION WILL BE IN NEW
                YORK COUNTY, NEW YORK. YOU AGREE TO ARBITRATE IN YOUR INDIVIDUAL CAPACITY ONLY – NOT AS A REPRESENTATIVE
                OR MEMBER OF A CLASS – AND YOU EXPRESSLY WAIVE ANY RIGHT TO FILE A CLASS ACTION OR SEEK RELIEF ON A
                CLASS ACTION BASIS. FURTHERMORE, UNLESS YOU AND COMPANY AGREE IN WRITING, THE ARBITRATOR MAY NOT
                CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS, AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A
                REPRESENTATIVE OF CLASS PROCEEDING. ALL ARBITRATION PROCEEDINGS ARE CONFIDENTIAL. ARBITRATION ORDERS AND
                AWARDS REQUIRED TO BE FILED WITH APPLICABLE COURTS OF COMPETENT JURISDICTION ARE NOT CONFIDENTIAL AND
                MAY BE DISCLOSED BY THE PARTIES TO SUCH COURTS. A PARTY WHO IMPROPERLY DISCLOSES CONFIDENTIAL
                INFORMATION WILL BE SUBJECT TO SANCTIONS. THE ARBITRATOR AND FORUM MAY DISCLOSE CASE FILINGS, CASE
                DISPOSITIONS, AND OTHER CASE INFORMATION AS REQUIRED BY A COURT ORDER OF PROPER JURISDICTION. This
                Agreement will be governed by and construed in accordance with the laws of the State of New York,
                without giving effect to its conflict of laws provisions.
              </li>
              <li><b>Limitation on Time to File Claims. </b>
                ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE WEBSITE
                MUST BE COMMENCED WITHIN ONE YEAR AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION OR
                CLAIM IS PERMANENTLY BARRED.
              </li>
              <li><b>General. </b>
                If any provision of this Agreement is held by a court of competent jurisdiction or arbitrator to be
                illegal, invalid, or unenforceable, the remaining provisions will remain in full force and effect. You
                and the Company intend that the provisions of this Agreement be enforced to the fullest extent permitted
                by applicable law. Accordingly, you and the Company agree that if any provision is deemed unenforceable,
                where possible, it will be modified to the extent necessary to make it enforceable, which may include
                its deletion. The Company may assign this Agreement, in whole or in part, at any time with or without
                notice to you. You may not assign this Agreement or assign, transfer, or sublicense your rights, if any,
                to access or use the Website or its content, and any attempt by you to do so is void. The Company’s
                failure to act with respect to a breach by you or others does not waive its right to act with respect to
                subsequent or similar breaches. A waiver will only be binding on the Company if it is in a written
                document signed by the Company. This Agreement (including any incorporated terms) constitutes the entire
                agreement between you and the Company with respect to the Website and its contents. Both you and the
                Company warrant to each other that, in entering into this Agreement, neither the Company nor you have
                relied on or will have any right or remedy based upon any statement, representation, warranty, or
                assurance other than those expressly stated in this Agreement. The preceding sentence will not limit or
                exclude any liability that cannot be limited or excluded under applicable law. No one other than you and
                the Company, or the Company’s successors and assigns, will have any right to enforce any of this
                Agreement. Neither this Agreement nor the Website create a partnership, joint venture, employment, or
                other agency relationship between us. You may not enter into any contract on our behalf or bind us in
                any way.
              </li>
            </ol>

          </div>


        </div>
      </div>
      <Nav/>
    </main>
  )
}