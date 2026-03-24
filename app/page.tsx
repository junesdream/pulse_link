"use client";
import MatrixRain from "@/app/components/MatrixRain";

export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, orderBy } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "links"), orderBy("createdAt", "desc"));

    const unsubDb = onSnapshot(q, (snap) => {
      setLinks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => {
      console.error("Firestore Admin Error:", error);
    });
    return () => unsubDb();
  }, [user]);

  const login = async () => {
    try { await signInWithPopup(auth, googleProvider); }
    catch (e: any) { alert("System Error: " + e.message); }
  };

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url && user) {
      await addDoc(collection(db, "links"), {
        title, url, userId: user.uid, createdAt: new Date()
      });
      setTitle(""); setUrl("");
    }
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-[#00ff41] font-mono animate-pulse">INITIALIZING_ADMIN_NODE...</div>;

  if (!user) return (
    <div className="h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#050505] border-2 border-[#00ff41]/30 p-10 rounded-xl text-center shadow-[0_0_50px_rgba(0,255,65,0.1)]">
        <h1 className="text-5xl font-black text-white mb-2 italic tracking-tighter">PULSE<span className="text-[#00ff41]">.</span></h1>
        <p className="text-[10px] text-[#00ff41]/50 tracking-[0.5em] uppercase mb-12">Architect_Access_Only</p>
        <button onClick={login} className="w-full py-4 border-2 border-[#00ff41] text-[#00ff41] font-bold uppercase tracking-widest hover:bg-[#00ff41] hover:text-black transition-all">Execute_Auth</button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-[#00ff41] p-6 font-mono">
      <MatrixRain />
      <div className="relative z-10">
      <div className="max-w-xl mx-auto pt-10">

        <div className="flex justify-between items-center mb-12 p-4 border border-[#00ff41]/20 bg-[#050505] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#00ff41] flex items-center justify-center text-[10px] font-bold">JS</div>
            <span className="text-[10px] uppercase tracking-widest text-[#00ff41]/60">Node: {user.displayName}</span>
          </div>
          <button onClick={() => signOut(auth)} className=" mt-6 border border-red-500/40 px-3 py-1.5 rounded text-[10px] text-red-500 uppercase font-bold hover:underline">Disconnect</button>
        </div>

        <form onSubmit={addLink} className="mb-16 space-y-4 bg-[#050505] p-8 border-2 border-[#00ff41]/20 rounded-xl">
          <input className="w-full bg-black border border-[#00ff41]/30 p-4 outline-none text-[#00ff41] focus:border-[#00ff41]" placeholder="> TARGET_TITLE" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="w-full bg-black border border-[#00ff41]/30 p-4 outline-none text-[#00ff41] focus:border-[#00ff41]" placeholder="> SOURCE_URL" value={url} onChange={e => setUrl(e.target.value)} />
          <button type="submit" className="w-full bg-[#00ff41] text-black py-4 font-black uppercase tracking-[0.3em] hover:bg-[#00cc33] transition-all">Upload_To_Matrix</button>
        </form>

        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#00ff41]/40 mb-6 ml-2">Active_Data_Streams</h3>
          {links.map(l => (
            <div key={l.id} className="group bg-[#050505] border border-[#00ff41]/20 p-6 rounded-lg flex justify-between items-center hover:border-[#00ff41]/60 transition-all">
              <div>
                <h4 className="font-bold text-white text-lg italic uppercase">{l.title}</h4>
                <p className="text-[10px] text-[#00ff41]/40 mt-1 truncate max-w-[250px]">{l.url}</p>
              </div>
              <button onClick={() => deleteDoc(doc(db, "links", l.id))} className="text-[#00ff41]/20 hover:text-red-500 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          ))}
        </div>

        <footer className="mt-20 pb-10 text-center space-y-4">
          <p className="text-[10px] tracking-[0.4em] text-[#00ff41]/20 uppercase">© 2026 RAINBOWDEV | CORE_ENGINE</p>
          <div className="text-[8px] text-[#00ff41]/10 uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse"></span> Matrix_Stable
          </div>
        </footer>
      </div>
      </div>
    </main>
  );
}
