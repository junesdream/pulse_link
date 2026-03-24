"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

interface PulseLink {
  id: string;
  url: string;
  title?: string;
}

export default function PublicProfile() {
  const [links, setLinks] = useState<PulseLink[]>([]);

  useEffect(() => {
    const q = query(collection(db, "links"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setLinks(snap.docs.map(d => ({ id: d.id, ...d.data() } as PulseLink)));
    }, (error) => {
      console.error("Firestore Stream Error:", error);
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-[#020202] text-white p-6 flex flex-col items-center pt-20">
      <div className="fixed inset-0 bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 text-center">
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto p-[1px] mb-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center overflow-hidden font-black text-2xl italic">
              P.
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent uppercase">
            Aria Aora Profile
          </h1>
          <p className="text-[12px] tracking-[0.4em] text-gray-600 uppercase mt-3">Verified Developer Node</p>
        </div>

        <div className="space-y-4">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-[2px]"></div>

              <div className="relative bg-[#0a0a0a] border-4 border-sky-500 p-6 rounded-2xl flex items-center justify-center transition-all group-hover:bg-black">
                <span className="font-bold text-gray-400 group-hover:text-white uppercase tracking-[0.2em] text-xs">
                  {l.title}
                </span>

                <svg className="absolute right-6 w-4 h-4 text-gray-800 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          ))}

          {links.length === 0 && (
            <p className="text-gray-700 text-[10px] font-mono tracking-widest uppercase py-10 italic">Initialising Data Stream...</p>
          )}
        </div>
       <footer className="mt-24 pb-10 flex flex-col items-center gap-4">
  <div className="h-[1px] w-full max-w-[100px] bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-30"></div>

  <p className="text-sm font-bold tracking-[0.3em] bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent uppercase italic">
    Pulse Link Engine
  </p>

  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono tracking-widest uppercase opacity-60">
    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
    System Status: Operational
  </div>
</footer>
      </div>
    </main>
  );
}
