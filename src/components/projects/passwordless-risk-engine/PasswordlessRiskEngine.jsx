export default function PasswordlessRiskEngine() {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 items-start group">
      <span className="text-xs font-mono text-neutral-400 mt-1">2026 FEB</span>

      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-lg group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1 transition-all cursor-pointer w-fit">
          Passwordless Risk Engine Auth Service
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="aspect-video rounded-sm overflow-hidden border border-neutral-200 bg-neutral-50 p-4 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              24-Hour Hackathon Build
            </span>
            <div className="text-sm text-neutral-700 leading-relaxed">
              Device fingerprint + risk scoring + passkey login with reusable SDK modules.
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Core Tech</span>
              <span className="text-neutral-700">Node.js + Express</span>
              <span className="text-neutral-700">WebAuthn / Passkeys (OS-Level Security)</span>
              <span className="text-neutral-700">Custom Browser + Backend npm SDKs</span>
              <span className="text-neutral-700">Device Fingerprinting + Risk Rules</span>
            </div>

            <div className="flex flex-col mt-auto">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Repository</span>
              <a
                href="https://github.com/karan-suthar03/password-less-authentication-gitIgnore"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-300 underline-offset-2 hover:decoration-black transition-all"
              >
                github.com/karan-suthar03/password-less-authentication-gitIgnore
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
          Built in a 24-hour hackathon, this service enables passwordless authentication with device-aware trust decisions.
          It includes two reusable npm modules (browser and backend SDKs), risk assessment endpoints, and approval-based new
          device enrollment using fingerprint context such as platform, timezone, language, and touch capability.
          Authentication is powered by WebAuthn, leveraging OS-level security and biometrics like Windows Hello, Touch ID,
          and Face ID.
        </p>
      </div>
    </div>
  );
}