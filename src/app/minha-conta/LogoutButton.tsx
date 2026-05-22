"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      className="btn btn--ghost"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await signOut({ callbackUrl: "/" });
      }}
    >
      {loading ? "Saindo…" : "Sair"}
    </button>
  );
}
