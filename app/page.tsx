"use client";
import { useState, useEffect } from "react";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, where } from "firebase/firestore";

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
    const q = query(collection(db, "links"), where("userId", "==", user.uid));
    const unsubDb = onSnapshot(q, (snap) => {
      setLinks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubDb();
  }, [user]);

/**
 * AUTHENTICATION FLOW
 * Triggering Google OAuth Popup.
 * On success, user state is updated and Firestore stream begins.
 */
const login = async () => {
  try {
    console.log("Attempting Login..."); // Test-Log
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User logged in:", result.user.displayName);
    setUser(result.user);
  } catch (error: any) {
    console.error("Login Error Details:", error.code, error.message);
    // Falls hier "auth/operation-not-allowed" steht -> Google Login in Konsole aktivieren!
    alert("System Error: " + error.message);
  }
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

  if (loading) return <div className="h-screen bg-[#050505] flex items-center justify-center text-white/20 font-mono">LOADING_PULSE_OS...</div>;

  if (!user) return (
    <div className="h-screen bg-[#020202] flex items-center justify-center p-4 relative">
      {/* Zentraler Hintergrund-Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full"></div>

      {/* DIE HAUPT-BOX MIT NEON BORDER */}
      <div className="relative z-10 w-full max-w-[440px] bg-[#0c0c0c]/80 backdrop-blur-xl 
                      p-12 rounded-[3rem] text-center
                      border border-blue-500/40 
                      shadow-[0_0_40px_rgba(59,130,246,0.15)]">
        
        {/* Dekorative Neon-Ecken (optional für den Extra-Touch) */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/60 rounded-tl-[3rem]"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-400/60 rounded-br-[3rem]"></div>

        <div className="relative">
          <h1 className="text-6xl font-black mb-2 tracking-tighter bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent italic drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            PULSE<span className="text-blue-500 inline-block ml-1 shadow-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,1)]">.</span>
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-gray-500 uppercase mb-14">Universal Link Hub</p>
          
          {/* DER BUTTON MIT NEON BORDER */}
          <button 
            onClick={login} 
            className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px]
                       bg-black text-white 
                       border border-emerald-500/50 
                       shadow-[0_0_20px_rgba(16,185,129,0.2)]
                       hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]
                       transition-all duration-500 active:scale-95"
          >
            Access System
          </button>
        </div>
      </div>
    </div>
  );

return (
    <main className="min-h-screen bg-[#020202] text-white p-6 font-sans selection:bg-blue-500/30">
      {/* Subtiler Ambient Glow im Hintergrund */}
      <div className="fixed inset-0 bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto pt-12 relative z-10">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-16 px-6 py-4 bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <span className="text-[10px] font-black text-blue-400">P.OS</span>
            </div>
            <span className="text-xs font-bold tracking-widest text-gray-400 italic">ADMIN: {user.displayName?.toUpperCase()}</span>
          </div>
          <button onClick={() => signOut(auth)} className="text-[9px] uppercase tracking-[0.3em] text-gray-600 hover:text-red-500 transition-all font-bold">Terminate_Session</button>
        </div>

        {/* Action Box mit Neon Border */}
        <div className="relative mb-16 group">
            {/* Der Neon-Rand Effekt */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 via-transparent to-purple-600 rounded-[2.5rem] opacity-30 group-hover:opacity-100 transition duration-700 blur-[1px]"></div>
            
            <form onSubmit={addLink} className="relative bg-[#080808] p-10 rounded-[2.5rem] space-y-5 border border-white/5">
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      className="w-full bg-black/60 p-5 rounded-2xl outline-none border border-white/5 focus:border-blue-500/50 transition-all text-xs font-mono tracking-tighter" 
                      placeholder=">> TARGET_TITLE" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                    />
                  </div>
                  <input 
                    className="w-full bg-black/60 p-5 rounded-2xl outline-none border border-white/5 focus:border-blue-500/50 transition-all text-xs font-mono tracking-tighter" 
                    placeholder=">> SOURCE_URL" 
                    value={url} 
                    onChange={e => setUrl(e.target.value)} 
                  />
                </div>
                
                <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-2xl shadow-white/5 active:scale-[0.98]">
                  Execute_Push
                </button>
            </form>
        </div>

        {/* Live Feed */}
        <div className="space-y-4 px-2">
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-gray-700 mb-6 ml-4">Live_Pulse_Stream</h3>
          {links.map(l => (
            <div key={l.id} className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl hover:border-blue-500/30 transition-all duration-500 flex justify-between items-center overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none"></div>
              <div className="relative z-10">
                <h4 className="font-bold text-gray-200 uppercase tracking-tighter italic text-xl group-hover:text-blue-400 transition-colors">{l.title}</h4>
                <p className="text-[9px] text-gray-600 font-mono mt-1 tracking-widest truncate max-w-[250px] uppercase">{l.url}</p>
              </div>
              <button 
                onClick={() => deleteDoc(doc(db, "links", l.id))} 
                className="relative z-10 opacity-0 group-hover:opacity-100 p-3 text-gray-700 hover:text-red-500 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          ))}
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
  )};