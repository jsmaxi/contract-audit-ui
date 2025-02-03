import Logo from "@/components/Logo";

const APP_NAME = "SmartGuard AI";

export default function Index() {
  return (
    <div className="min-h-screen bg-hero-pattern">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-3xl font-orbitron font-bold text-white">
              {APP_NAME}
            </h1>
          </div>
        </header>

        <main className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
              AI-Powered Smart Contract Auditing
            </h2>
            <p className="text-lg font-orbitron text-white/80 mb-2">
              Let our AI agents analyze your smart contracts for vulnerabilities
            </p>
            <p className="text-sm text-accent font-orbitron">Free to Use</p>
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8"></div>
            <footer className="text-center text-sm text-white/60 font-orbitron">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
