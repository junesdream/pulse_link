"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import MatrixRain from "@/app/components/MatrixRain";

export default function PublicProfile() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "links"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setLinks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#00ff41] p-6 flex flex-col items-center pt-20 font-mono">
      <MatrixRain />
      <div className="relative z-10">
      <div className="fixed inset-0 bg-[#00ff41]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 text-center">
        <div className="mb-16">
          <div className="w-20 h-20 border-2 border-[#00ff41] rounded-full mx-auto flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,255,65,0.2)]">
            <span className="text-2xl font-black italic text-white">JS</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic text-white uppercase">JOON SUK</h1>
          <p className="text-[11px] tracking-[0.5em] text-[#00ff41]/50 uppercase mt-4 font-bold">Fullstack Developer</p>
        </div>

        <div className="space-y-5">
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="block group relative">
              <div className="absolute -inset-[1px] bg-[#00ff41] rounded-lg opacity-0 group-hover:opacity-100 transition duration-500 blur-[4px]"></div>
              <div className="relative bg-[#050505] border-2 border-[#00ff41]/30 p-6 rounded-lg flex items-center justify-center transition-all group-hover:bg-black group-hover:border-[#00ff41]">
                <span className="font-bold text-[#00ff41] uppercase tracking-[0.2em] text-xs">{l.title}</span>
                </div>
            </a>
          ))}
        </div>

        <footer className="mt-32 pb-10 text-center opacity-30">
          <p className="text-[9px] tracking-[0.4em] uppercase">© 2026 RAINBOWDEV | CORE_ENGINE</p>
          <p className="text-[7px] mt-2 tracking-widest uppercase italic">Status: Operational</p>
        </footer>
      </div>
      </div>
    </main>
  );
}


