"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function SolicitarAcessoPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    clinica: "",
    cargo: "",
    tamanho: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-6"
          >
            <div className="w-20 h-20 rounded-full bg-champagne flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
              Solicitação recebida!
            </h1>
            <p className="text-obsidian/60 max-w-md mx-auto mb-8">
              Nosso time de sucesso do cliente entrará em contato em até 24 horas úteis para agendar sua demonstração.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3.5 bg-champagne text-obsidian font-medium rounded-full hover:bg-amber-gold transition-colors"
            >
              Voltar ao início
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 border border-champagne/20 mb-6 w-fit">
                  <span className="text-sm text-obsidian/80 font-medium">Teste 30 dias grátis</span>
                </div>

                <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-obsidian mb-6 leading-[1.1]">
                  Leve sua clínica para o próximo nível.
                </h1>

                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Preencha o formulário e nosso time entrará em contato para uma demonstração personalizada da plataforma VELA.
                </p>

                {/* Benefits */}
                <div className="space-y-4">
                  {[
                    "Setup em menos de 30 minutos",
                    "Migração gratuita dos seus dados",
                    "Treinamento completo da equipe",
                    "Suporte dedicado via WhatsApp",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-champagne" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-obsidian/70">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Social proof */}
                <div className="mt-12 pt-8 border-t border-obsidian/5">
                  <p className="text-sm text-obsidian/50 mb-4">Juntando-se a mais de</p>
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-2xl font-cormorant text-champagne">200+</div>
                      <div className="text-xs text-obsidian/50">Clínicas</div>
                    </div>
                    <div className="w-px h-10 bg-obsidian/10" />
                    <div>
                      <div className="text-2xl font-cormorant text-champagne">8.6M+</div>
                      <div className="text-xs text-obsidian/50">Tarefas automatizadas</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right - Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-obsidian/5 border border-obsidian/5">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-obsidian mb-2">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-ivory border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40"
                          placeholder="Seu nome"
                        />
                      </div>

                      <div>
                        <label htmlFor="cargo" className="block text-sm font-medium text-obsidian mb-2">
                          Cargo *
                        </label>
                        <input
                          type="text"
                          id="cargo"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-ivory border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40"
                          placeholder="Ex: Diretor(a) Clínico(a)"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-obsidian mb-2">
                        E-mail corporativo *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40"
                        placeholder="voce@clinica.com.br"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-obsidian mb-2">
                          Telefone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-ivory border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40"
                          placeholder="(11) 99999-9999"
                        />
                      </div>

                      <div>
                        <label htmlFor="tamanho" className="block text-sm font-medium text-obsidian mb-2">
                          Tamanho da operação *
                        </label>
                        <select
                          id="tamanho"
                          name="tamanho"
                          value={formData.tamanho}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-ivory border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian appearance-none cursor-pointer"
                        >
                          <option value="">Selecione</option>
                          <option value="1">Profissional autônomo</option>
                          <option value="2-5">2-5 profissionais</option>
                          <option value="6-10">6-10 profissionais</option>
                          <option value="11+">11+ profissionais</option>
                          <option value="rede">Rede de clínicas</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="clinica" className="block text-sm font-medium text-obsidian mb-2">
                        Nome da clínica *
                      </label>
                      <input
                        type="text"
                        id="clinica"
                        name="clinica"
                        value={formData.clinica}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40"
                        placeholder="Nome da sua clínica"
                      />
                    </div>

                    <div>
                      <label htmlFor="mensagem" className="block text-sm font-medium text-obsidian mb-2">
                        Como podemos ajudar?
                      </label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-obsidian/10 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-obsidian placeholder-obsidian/40 resize-none"
                        placeholder="Conte um pouco sobre suas necessidades..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-champagne text-obsidian text-base font-medium rounded-full hover:bg-amber-gold transition-all duration-300 shadow-lg shadow-champagne/20 hover:shadow-xl hover:shadow-champagne/30"
                    >
                      Solicitar demonstração
                    </button>

                    <p className="text-xs text-obsidian/50 text-center">
                      Ao enviar, você concorda com nossa{" "}
                      <a href="/privacidade" className="text-champagne hover:underline">
                        Política de Privacidade
                      </a>
                      .
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
