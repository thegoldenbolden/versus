import Link from "next/link";

const AccountLayout = (props: React.PropsWithChildren) => {
 return (
  <div className="grid grid-cols-1 sm:grid-cols-[min-content_1fr]">
   <aside>
    <nav>
     <Link href="/account/versus">
      <span>Versus</span>
     </Link>
     <Link href="/account/likes">
      <span>Versus</span>
     </Link>
     <Link href="/account/versus">
      <span>Versus</span>
     </Link>
    </nav>
    <button>Delete Account</button>
   </aside>
   <main>{props.children}</main>
  </div>
 );
};

export default AccountLayout;
