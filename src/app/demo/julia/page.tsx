"use client";

import { useState } from "react";
import { conversations } from "../lib/mock-data";

export default function JuliaPage() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Conversas hoje", value: "84", hint: "+12 nas últimas 2h" },
          { label: "Tempo médio de resposta", value: "11s", hint: "98% automatizado" },
          { label: "Agendamentos via Júlia", value: "47", hint: "este mês" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-2xl bg-ivory/[0.03] border border-ivory/5">
            <div className="text-[10px] uppercase tracking-widest text-ivory/40 font-dm-mono mb-2">
              {s.label}
            </div>
            <div className="font-cormorant text-2xl md:text-3xl text-ivory">{s.value}</div>
            <div className="text-xs text-ivory/50 mt-1">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 h-[640px]">
        <aside className="rounded-2xl bg-ivory/[0.03] border border-ivory/5 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-ivory/5">
            <div className="text-xs uppercase tracking-widest text-ivory/40 font-dm-mono mb-1">
              Conversas ativas
            </div>
            <div className="font-cormorant text-lg text-ivory">{conversations.length} pacientes</div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {conversations.map((c) => {
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`w-full text-left px-5 py-4 border-b border-ivory/5 transition-colors ${
                      isActive ? "bg-champagne/[0.06]" : "hover:bg-ivory/[0.02]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-deep-teal/30 flex items-center justify-center text-xs text-ivory/80 shrink-0">
                        {c.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-sm truncate ${isActive ? "text-champagne" : "text-ivory"}`}>
                            {c.patient}
                          </span>
                          <span className="text-[10px] text-ivory/40 font-dm-mono shrink-0">{c.time}</span>
                        </div>
                        <div className="text-xs text-ivory/50 truncate mt-0.5">{c.preview}</div>
                      </div>
                      {c.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-champagne text-obsidian text-[10px] font-medium flex items-center justify-center shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="rounded-2xl bg-ivory/[0.03] border border-ivory/5 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-ivory/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-deep-teal/30 flex items-center justify-center text-sm text-ivory/80">
                {active.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-ivory">{active.patient}</div>
                <div className="text-[11px] text-ivory/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                  Júlia ativa nesta conversa
                </div>
              </div>
            </div>
            <button
              type="button"
              className="text-xs text-ivory/60 hover:text-champagne px-3 py-1.5 rounded-lg border border-ivory/10 hover:border-champagne/30 transition-colors"
            >
              Assumir conversa
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-obsidian/40">
            {active.messages.map((m) => {
              const fromJulia = m.from === "julia";
              return (
                <div key={m.id} className={`flex ${fromJulia ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] ${fromJulia ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        fromJulia
                          ? "bg-champagne/15 text-ivory rounded-br-sm border border-champagne/20"
                          : "bg-ivory/[0.06] text-ivory rounded-bl-sm border border-ivory/5"
                      }`}
                    >
                      {m.text}
                    </div>
                    <div className="text-[10px] text-ivory/30 font-dm-mono px-1">
                      {fromJulia ? "Júlia" : active.patient.split(" ")[0]} · {m.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-4 border-t border-ivory/5 bg-obsidian/60">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-ivory/[0.03] border border-ivory/5">
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span className="text-xs text-ivory/50 flex-1">Júlia está respondendo automaticamente…</span>
              <span className="text-[10px] text-ivory/30 font-dm-mono uppercase tracking-widest">GPT-4 · pt-BR</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
