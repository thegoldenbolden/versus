export default function Cookies() {
 return (
  <div className="flex flex-col max-w-2xl gap-2 py-4 mb-8 border-2 border-transparent border-solid divide-y dark:divide-lotion-translucent sm:mb-0 sm:border-smoky-black-translucent sm:dark:border-lotion-translucent border-t-transparent border-b-transparent">
   <section className="flex flex-col gap-2 px-2 py-8">
    <div>
     <h1 className="text-3xl font-display">Cookie Policy</h1>
     <div className="text-xs font-bold opacity-75">
      Last Updated: <time dateTime="2023-01-26">January 26, 2023</time>
     </div>
    </div>
    <p className="text-sm opacity-90">
     We use cookies on our website to improve your browsing experience and to personalize
     the content we show you. By continuing to use our website, you consent to our use of
     cookies.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className="text-2xl font-bold opacity-100 font-display">What are cookies?</h2>
    <p className="text-sm">
     Cookies are small text files that are stored on your device when you visit a website.
     They are widely used to make websites work, or work more efficiently, as well as to
     provide information to the owners of the site.
    </p>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className="text-2xl font-bold opacity-100 font-display">
     Types of cookies we use:
    </h2>
    <ol className="list-[square] px-4 text-sm">
     <li>
      <span className="underline">Session Cookies</span>: These are temporary cookies that
      expire when you close your browser. They are used to keep track of your preferences
      while you navigate through the website.
     </li>
     <li>
      <span className="underline">Persistent Cookies</span>: These cookies remain on your
      device until they expire or you delete them. They are used to remember your
      preferences and settings when you return to the website.
     </li>
    </ol>
   </section>
   <section className="px-2 py-8 opacity-90">
    <h2 className="text-2xl font-bold opacity-100 font-display">Manage Your Cookies</h2>
    <p className="text-sm">
     You can manage cookies by adjusting your browser settings. Most browsers allow you to
     block or delete cookies, but doing so may affect your ability to use some features of
     our website. If you have any questions or concerns about our use of cookies, please
     contact us.
    </p>
   </section>
  </div>
 );
}
