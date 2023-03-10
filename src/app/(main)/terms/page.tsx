import type { Metadata } from "next";
import { bebas } from "@lib/fonts";

export const metadata: Metadata = {
 title: "Terms & Services",
 description: "Versus Zero terms and services",
};

export default function Terms() {
 return (
  <div className="flex flex-col max-w-2xl gap-2 py-4 mb-8 border-2 border-transparent border-solid divide-y dark:divide-lotion-translucent sm:mb-0 sm:border-smoky-black-translucent sm:dark:border-lotion-translucent border-t-transparent border-b-transparent">
   <section className="flex flex-col gap-2 px-2 py-8">
    <div>
     <h1 className={`${bebas.className} text-3xl`}>Terms and Services</h1>
     <div className="text-xs font-bold opacity-75">
      Last Updated: <time dateTime="2023-01-18">January 18, 2023</time>
     </div>
    </div>
    <p className="text-sm opacity-90">
     {`These terms of service (the "Terms") govern your use of Versus Zero's website and
       online services (the "Services"). By accessing or using the Services, you agree to
       be bound by these Terms. If you do not agree to these Terms, you may not use the
       Services.`}
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Eligibility</h2>
    <p className="text-sm opacity-90">
     You must be at least 18 years old to use the Services. If you are under 18, you may
     only use the Services with the involvement and consent of a parent or guardian.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Account Registration</h2>
    <p className="text-sm opacity-90">
     To access certain features of the Services, you may need to create an account. You
     are responsible for maintaining the confidentiality of your account login information
     and for all activities that occur under your account. You agree to notify us
     immediately of any unauthorized use of your account.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Prohibited Conduct</h2>
    <p className="text-sm opacity-90">
     You may not use the Services for any unlawful or prohibited purpose, or in any way
     that could damage, disable, overburden, or impair the Services or interfere with any
     other party&apos;s use of the Services. You may not attempt to gain unauthorized
     access to the Services or any systems or networks connected to the Services.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Intellectual Property</h2>
    <p className="text-sm opacity-90">
     The Services and all content and materials included on the Services, including but
     not limited to text, graphics, logos, images, and software, are the property of
     Versus Zero or its licensors and are protected by copyright and trademark laws. You
     may not use any content or materials on the Services for any commercial purpose
     without the express written consent of Versus Zero.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>
     Disclaimer of Warranties
    </h2>
    <p className="text-sm opacity-90">
     {`The Services are provided on an "as is" and "as available" basis. Versus Zero makes
       no representations or warranties of any kind, express or implied, as to the
       operation of the Services or the information, content, materials, or products
       included on the Services.`}
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Limitation of Liability</h2>
    <p className="text-sm opacity-90">
     Versus Zero will not be liable for any damages of any kind arising from the use of
     the Services, including but not limited to direct, indirect, incidental, punitive,
     and consequential damages.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Indemnification</h2>
    <p className="text-sm opacity-90">
     You agree to indemnify and hold Versus Zero and its affiliates, officers, agents, and
     employees harmless from any claim or demand, including reasonable attorneys&apos;
     fees, made by any third party due to or arising out of your use of the Services, your
     violation of these Terms, or your violation of any rights of another.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Governing Law</h2>
    <p className="text-sm opacity-90">
     These Terms and your use of the Services will be governed by and construed in
     accordance with the laws of the state of Tennessee, without giving effect to any
     principles of conflicts of law.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Dispute Resolution</h2>
    <p className="text-sm opacity-90">
     Any dispute arising out of or relating to these Terms or the Services will be
     resolved through binding arbitration in accordance with the rules of the American
     Arbitration Association.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Changes to the Terms</h2>
    <p className="text-sm opacity-90">
     Versus Zero reserves the right to change these Terms at any time. Any changes will be
     effective upon posting the revised Terms on the Services. We encourage you to review
     these Terms regularly to stay informed about our terms of service.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className={`${bebas.className} text-2xl opacity-100`}>Contact Us</h2>
    <p className="text-sm opacity-90">
     If you have any questions or concerns about these Terms or the Services, please
     contact&nbsp;
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
