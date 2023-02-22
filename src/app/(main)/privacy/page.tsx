import { bebas } from "@lib/fonts";

export const metadata = {
 title: "Privacy Policy",
 description: "Versus Zero privacy policy",
};

export default function Privacy() {
 return (
  <div className="flex flex-col max-w-2xl gap-2 py-4 mb-8 border-2 border-transparent border-solid divide-y dark:divide-lotion-translucent sm:mb-0 sm:border-smoky-black-translucent sm:dark:border-lotion-translucent border-t-transparent border-b-transparent">
   <section className="flex flex-col gap-2 px-2 py-8">
    <div>
     <h1 className={`${bebas.className} text-3xl`}>Privacy Policy</h1>
     <div className="text-xs font-bold opacity-75">
      Last Updated: <time dateTime="2023-01-18">January 18, 2023</time>
     </div>
    </div>
    <p className="text-sm opacity-90">
     We at Versus Zero value your privacy and take great care in protecting it. This
     privacy policy explains how we collect, use, and share personal information about you
     when you use our website and online services. Please read this policy carefully to
     understand how we handle your personal information.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Information We Collect</h2>
    <p className="text-sm">
     We collect personal information about you when you provide it to us directly, such as
     when you create an account. The personal information we collect may include your
     name, or email address. We may also collect information about your use of our website
     and services, such as your search queries, and the pages you view. This information
     may be collected through the use of cookies and other tracking technologies.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>
     How We Use Your Information
    </h2>
    <div className="flex flex-col gap-2">
     <p className="text-sm">
      We use the personal information we collect about you for various purposes,
      including:
     </p>
     <ol className="list-[square] px-4 text-sm">
      <li>To provide user support and assistance</li>
      <li>To personalize your experience on our website</li>
      <li>To improve the quality of our website and services</li>
     </ol>
     <p className="text-sm">
      To access certain features of the Services, you may need to create an account. You
      are responsible for maintaining the confidentiality of your account login
      information and for all activities that occur under your account. You agree to
      notify us immediately of any unauthorized use of your account.
     </p>
    </div>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>
     Sharing Your Information
    </h2>
    <div className="flex flex-col gap-2">
     <p className="text-sm">
      We may share your personal information with third parties in certain circumstances,
      such as:
     </p>
     <ol className="list-[square] px-4 text-sm">
      <li>
       With service providers who perform services on our behalf, such as payment
       processors and fulfillment centers
      </li>
      <li>
       With business partners and affiliates who offer products or services that may be of
       interest to you
      </li>
      <li>In the event that we are acquired by or merged with another company</li>
     </ol>
     <p className="text-sm">
      We will not sell your personal information to third parties for their own marketing
      purposes.
     </p>
    </div>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Data Security</h2>
    <p className="text-sm">
     We take steps to protect your personal information from unauthorized access, use, or
     disclosure. We use secure servers, encryption, and other security measures to protect
     your personal information.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Your Rights and Choices</h2>
    <p className="text-sm">
     You have the right to access, correct, or delete your personal information at any
     time. You can also opt out of receiving promotional materials from us by following
     the unsubscribe instructions in the emails we send you.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>
     Changes to this Privacy Policy
    </h2>
    <p className="text-sm">
     We may update this privacy policy from time to time. If we make any changes, we will
     post the updated policy on this page and update the effective date. We encourage you
     to review this policy regularly to stay informed about our privacy practices.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Contact Us</h2>
    <p className="text-sm">
     If you have any questions or concerns about our privacy policy or the handling of
     your personal information, please contact&nbsp;
     <a
      className="font-bold text-red-500 underline opacity-100 dark:text-sky-300"
      target="_blank"
      rel="noreferrer noopenner"
      href="mailto:jlbolden.pro@gmail.com"
     >
      jlbolden.pro@gmail.com
     </a>
    </p>
   </section>
  </div>
 );
}
