"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LinkButton } from "@/components";

function FlameIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c0 0-2 2-2 5 0 1.5 1 2.5 1 4 0 0-2-1-3-3 0 0-1 2 0 5 1 3 4 4 4 7 0 0 3-2 3-6 0-1.5-.5-2.5-.5-3.5 0 0 1.5 2 1.5 4.5 0 0 2-2 2-5 0-4-3-8-6-8z" />
    </svg>
  );
}

function EyeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function EntrarPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for auth logic
    console.log("Login attempt:", email);
  };

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Left side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne/10 via-transparent to-deep-teal/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-deep-teal/10 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-champagne flex items-center justify-center text-obsidian">
              <FlameIcon className="w-7 h-7" />
            </div>
            <span className="font-cormorant text-3xl font-bold text-ivory">VELA</span>
          </div>

          <h1 className="font-cormorant text-5xl text-ivory mb-6 leading-tight">
            Sua clínica no<br />
            <span className="text-champagne">piloto inteligente</span>.
          </h1>

          <p className="text-ivory/60 text-lg max-w-md">
            Acesse a plataforma que já automatizou mais de 8 milhões de tarefas
            para clínicas em todo o Brasil.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            {[
              { value: "200+", label: "Clínicas" },
              { value: "8.6M", label: "Tarefas" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-cormorant text-champagne">{stat.value}</div>
                <div className="text-ivory/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-champagne flex items-center justify-center text-obsidian">
              <FlameIcon className="w-6 h-6" />
            </div>
            <span className="font-cormorant text-2xl font-bold text-obsidian">VELA</span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="font-cormorant text-3xl text-obsidian mb-2">Bem-vindo de volta</h2>
            <p className="text-obsidian/60">
              Acesse sua conta para gerenciar sua clínica.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-obsidian mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-obsidian mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian/40 hover:text-obsidian/60 transition-colors"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-obsidian/20 text-champagne focus:ring-champagne/20" />
                <span className="text-sm text-obsidian/60">Lembrar de mim</span>
              </label>
              <a href="#" className="text-sm text-champagne hover:text-amber-gold transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            <LinkButton
              href="/plataforma"
              variant="primary"
              className="w-full"
              size="lg"
            >
              Entrar
            </LinkButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-obsidian/60 text-sm">
              Ainda não tem uma conta?{" "}
              <a href="/solicitar-acesso" className="text-champagne font-medium hover:text-amber-gold transition-colors">
                Solicitar acesso
              </a>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-obsidian/5">
            <div className="flex items-center justify-center gap-4 text-xs text-obsidian/40">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                LGPD Compliant
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Conexão Segura
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
