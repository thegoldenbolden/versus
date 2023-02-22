import QueryProvider from "@components/providers/react-query";
import Footer from "@components/ui/footer";
import Sidebar from "@components/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
 return (
  <QueryProvider>
   <div className="grid gap-2 grid-cols-1 place-content-center sm:grid-cols-[max-content_min(100%,540px)] lg:grid-cols-[1fr_540px_1fr]">
    {/* @ts-expect-error Server Component */}
    <Sidebar />
    <main className="min-h-screen">{children}</main>
    <aside className="hidden p-2 lg:block lg:max-w-96">
     {/* @ts-expect-error Server Component */}
     <Footer />
    </aside>
   </div>
  </QueryProvider>
 );
}
