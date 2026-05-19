export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col gap-4 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Jewelry Point of Sale © {new Date().getFullYear()}</p>
        <p>Diseñado para un MVP de frontend con Supabase.</p>
      </div>
    </footer>
  );
}
