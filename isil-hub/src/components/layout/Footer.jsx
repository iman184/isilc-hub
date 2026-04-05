export function Footer() {
  return (
    <footer className="
      flex items-center justify-between flex-wrap gap-3
      px-5 py-4 mt-12
      border-t border-border
      text-text-faint text-xs font-mono
    ">
      <div className="flex items-center gap-2.5">
        <span className="text-base">🎓</span>
        <div>
          <div className="font-bold text-[13px] text-text-muted">ISIL-C Hub</div>
          <div>Pour les étudiants L2 ISIL-C</div>
        </div>
      </div>
      <div>
        Fait avec <span className="text-brand">💙</span> pour la promo ISIL-C · 2025/2026
      </div>
    </footer>
  )
}
