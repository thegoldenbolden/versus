import RootLayout from "@layouts/root";
import Head from "next/head";

const Terms = () => {
 return (
  <>
   <Head>
    <title>Terms & Services</title>
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
    <meta name="description" content="Terms and Services" />
   </Head>
   <div className="support">
    <h1>Terms & Services</h1>
    <ol>
     <li>
      <h2>Introduction</h2>
      <p>
       These terms of service (the "Terms") govern your use of Versus Zero's website and
       online services (the "Services"). By accessing or using the Services, you agree to
       be bound by these Terms. If you do not agree to these Terms, you may not use the
       Services.
      </p>
     </li>
     <li>
      <h2>Eligibility</h2>
      <p>
       You must be at least 18 years old to use the Services. If you are under 18, you may
       only use the Services with the involvement and consent of a parent or guardian.
      </p>
     </li>
     <li>
      <h2>Account Registration</h2>
      <p>
       To access certain features of the Services, you may need to create an account. You
       are responsible for maintaining the confidentiality of your account login
       information and for all activities that occur under your account. You agree to
       notify us immediately of any unauthorized use of your account.
      </p>
     </li>
     <li>
      <h2>Prohibited Conduct</h2>
      <p>
       You may not use the Services for any unlawful or prohibited purpose, or in any way
       that could damage, disable, overburden, or impair the Services or interfere with
       any other party's use of the Services. You may not attempt to gain unauthorized
       access to the Services or any systems or networks connected to the Services.
      </p>
     </li>
     <li>
      <h2>Intellectual Property</h2>
      <p>
       The Services and all content and materials included on the Services, including but
       not limited to text, graphics, logos, images, and software, are the property of
       Versus Zero or its licensors and are protected by copyright and trademark laws. You
       may not use any content or materials on the Services for any commercial purpose
       without the express written consent of Versus Zero.
      </p>
     </li>
     <li>
      <h2>Disclaimer of Warranties</h2>
      <p>
       The Services are provided on an "as is" and "as available" basis. Versus Zero makes
       no representations or warranties of any kind, express or implied, as to the
       operation of the Services or the information, content, materials, or products
       included on the Services.
      </p>
     </li>
     <li>
      <h2>Limitation of Liability</h2>
      <p>
       Versus Zero will not be liable for any damages of any kind arising from the use of
       the Services, including but not limited to direct, indirect, incidental, punitive,
       and consequential damages.
      </p>
     </li>
     <li>
      <h2>Indemnification</h2>
      <p>
       You agree to indemnify and hold Versus Zero and its affiliates, officers, agents,
       and employees harmless from any claim or demand, including reasonable attorneys'
       fees, made by any third party due to or arising out of your use of the Services,
       your violation of these Terms, or your violation of any rights of another.
      </p>
     </li>
     <li>
      <h2>Governing Law</h2>
      <p>
       These Terms and your use of the Services will be governed by and construed in
       accordance with the laws of the state of Tennessee, without giving effect to any
       principles of conflicts of law.
      </p>
     </li>
     <li>
      <h2>Dispute Resolution</h2>
      <p>
       Any dispute arising out of or relating to these Terms or the Services will be
       resolved through binding arbitration in accordance with the rules of the American
       Arbitration Association.
      </p>
     </li>
     <li>
      <h2>Changes to the Terms</h2>
      <p>
       Versus Zero reserves the right to change these Terms at any time. Any changes will
       be effective upon posting the revised Terms on the Services. We encourage you to
       review these Terms regularly to stay informed about our terms of service.
      </p>
     </li>
     <li>
      <h2>Contact Us</h2>
      <p>
       If you have any questions or concerns about these Terms or the Services, please
       contact us at&nbsp;
       <a target="_blank" rel="noreferrer noopenner" href="mailto:noodlexcvii@gmail.com">
        noodlexcvii@gmail.com
       </a>
      </p>
     </li>
    </ol>
   </div>
  </>
 );
};

Terms.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Terms;
