"use client";

import { useState } from "react";
import type { MessageSender } from "@/generated/prisma/client";

export type MessageView = {
  id: string;
  sender: MessageSender;
  text: string;
  time: string;
};

export type ConversationView = {
  id: string;
  patient: string;
  preview: string;
  time: string;
  unread: number;
  messages: MessageView[];
};

export function JuliaClient({ conversations }: { conversations: ConversationView[] }) {
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const stats = [
    { label: "Conversas hoje", value: "84", hint: "+12 nas últimas 2h" },
    { label: "Tempo médio de resposta", value: "11s", hint: "98% automatizado" },
    { label: "Agendamentos via Júlia", value: "47", hint: "este mês" },
  ];

  if (!active) {
    return (
      <div className="p-12 text-center text-ink-3">
        Nenhuma conversa ainda. Quando pacientes começarem a falar com a Júlia, elas aparecem aqui.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="relative p-5 rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
            <span aria-hidden className="absolute top-0 left-5 right-5 h-[2px] bg-accent opacity-60" />
            <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-2">
              {s.label}
            </div>
            <div className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-ink-0 tabular-nums">
              {s.value}
            </div>
            <div className="text-xs text-ink-2 mt-1">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 h-[640px]">
        <aside className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-paper-3">
            <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-1">
              Conversas
            </div>
            <div className="font-display text-xl font-semibold text-ink-0 tracking-[-0.02em]">
              <span className="italic-accent">{conversations.length}</span> pacientes ativos
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {conversations.map((c) => {
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`relative w-full text-left px-5 py-3.5 border-b border-paper-3 transition-colors ${
                      isActive ? "bg-paper-1" : "hover:bg-paper-1"
                    }`}
                  >
                    {isActive && (
                      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-semibold shrink-0 ${
                          isActive ? "bg-accent text-paper-0" : "bg-paper-2 text-ink-1"
                        }`}
                      >
                        {c.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium truncate text-ink-0">{c.patient}</span>
                          <span className="text-[10px] font-mono text-ink-3 shrink-0">{c.time}</span>
                        </div>
                        <div className="text-xs text-ink-2 truncate mt-0.5">{c.preview}</div>
                      </div>
                      {c.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-accent text-paper-0 text-[10px] font-mono font-medium flex items-center justify-center shrink-0">
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

        <section className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden flex flex-col">
          <div className="px-6 py-3.5 border-b border-paper-3 flex items-center justify-between bg-paper-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent text-paper-0 flex items-center justify-center text-sm font-display font-semibold">
                {active.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-ink-0 font-medium">{active.patient}</div>
                <div className="text-[11px] text-ink-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Júlia ativa nesta conversa
                </div>
              </div>
            </div>
            <button
              type="button"
              className="text-xs text-ink-1 px-3 py-1.5 rounded-md border border-paper-3 bg-paper-0 hover:bg-paper-2 hover:text-ink-0 transition-colors"
            >
              Assumir conversa
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-paper-1">
            {active.messages.map((m) => {
              const fromJulia = m.sender === "JULIA";
              const senderLabel = fromJulia
                ? "Júlia"
                : m.sender === "HUMAN"
                ? "Recepção"
                : active.patient.split(" ")[0];
              return (
                <div key={m.id} className={`flex ${fromJulia ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] flex flex-col gap-1 ${fromJulia ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        fromJulia
                          ? "bg-accent text-paper-0 rounded-br-sm"
                          : "bg-paper-0 text-ink-0 border border-paper-3 rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                    <div className="text-[10px] font-mono text-ink-3 px-1">
                      {senderLabel} · {m.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-3.5 border-t border-paper-3 bg-paper-0">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-md bg-paper-1 border border-paper-3">
              <span className="typing-dots" aria-hidden>
                <span /><span /><span />
              </span>
              <span className="text-xs text-ink-2 flex-1">Júlia está respondendo automaticamente…</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-ink-3">
                GPT-4 · pt-BR
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
