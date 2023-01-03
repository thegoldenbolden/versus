import RootLayout from "@layouts/root";
import Head from "next/head";

const Privacy = () => {
 return (
  <>
   <Head>
    <title>Privacy Policy</title>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8d07a" />
    <meta name="msapplication-TileColor" content="#f8d07a" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="description" content="Privacy Policy" />
   </Head>
   <div className="support">
    <h1>Privacy Policy</h1>
    <ol>
     <li>
      <h2>Introduction</h2>
      <p>
       We at Versus Zero value your privacy and take great care in protecting it. This
       privacy policy explains how we collect, use, and share personal information about
       you when you use our website and online services. Please read this policy carefully
       to understand how we handle your personal information.
      </p>
     </li>
     <li>
      <h2>Information We Collect</h2>
      <p>
       We collect personal information about you when you provide it to us directly, such
       as when you create an account. The personal information we collect may include your
       name, or email address. We may also collect information about your use of our
       website and services, such as your search queries, and the pages you view. This
       information may be collected through the use of cookies and other tracking
       technologies.
      </p>
     </li>
     <li>
      <h2>How We Use Your Information</h2>
      <div className="flex flex-col gap-2">
       <p>
        We use the personal information we collect about you for various purposes,
        including:
       </p>
       <ol className="opacity-80">
        <li>To provide user support and assistance</li>
        <li>To personalize your experience on our website</li>
        <li>To improve the quality of our website and services</li>
       </ol>
       <p>
        To access certain features of the Services, you may need to create an account. You
        are responsible for maintaining the confidentiality of your account login
        information and for all activities that occur under your account. You agree to
        notify us immediately of any unauthorized use of your account.
       </p>
      </div>
     </li>
     <li>
      <h2>Sharing Your Information</h2>
      <div className="flex flex-col gap-2">
       <p>
        We may share your personal information with third parties in certain
        circumstances, such as:
       </p>
       <ol className="opacity-80">
        <li>
         With service providers who perform services on our behalf, such as payment
         processors and fulfillment centers
        </li>
        <li>
         With business partners and affiliates who offer products or services that may be
         of interest to you
        </li>
        <li>In the event that we are acquired by or merged with another company</li>
       </ol>
       <p>
        We will not sell your personal information to third parties for their own
        marketing purposes.
       </p>
      </div>
     </li>
     <li>
      <h2>Data Security</h2>
      <p>
       We take steps to protect your personal information from unauthorized access, use,
       or disclosure. We use secure servers, encryption, and other security measures to
       protect your personal information.
      </p>
     </li>
     <li>
      <h2>Your Rights and Choices</h2>
      <p>
       You have the right to access, correct, or delete your personal information at any
       time. You can also opt out of receiving promotional materials from us by following
       the unsubscribe instructions in the emails we send you.
      </p>
     </li>
     <li>
      <h2>Changes to this Privacy Policy</h2>
      <p>
       We may update this privacy policy from time to time. If we make any changes, we
       will post the updated policy on this page and update the effective date. We
       encourage you to review this policy regularly to stay informed about our privacy
       practices.
      </p>
     </li>
     <li>
      <h2>Contact Us</h2>
      <p>
       If you have any questions or concerns about our privacy policy or the handling of
       your personal information, please contact us at&nbsp;
       <a
        className="opacity-100"
        target="_blank"
        rel="noreferrer noopenner"
        href="mailto:noodlexcvii@gmail.com"
       >
        noodlexcvii@gmail.com
       </a>
      </p>
     </li>
    </ol>
   </div>
  </>
 );
};

Privacy.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Privacy;
