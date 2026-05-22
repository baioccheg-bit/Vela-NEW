import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // /demo virou /painel (mini-fase 1.5). Mantém links antigos funcionando.
      { source: "/demo", destination: "/painel", permanent: true },
      { source: "/demo/:path*", destination: "/painel/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
