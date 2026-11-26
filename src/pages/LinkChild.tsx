import { useState } from "react";
import { ArrowLeft, CheckCircle2, Link2, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { linkChild } from "../services/family";
import { getApiErrorMessage } from "../services/api";

export default function LinkChild() {
  const [familyCode, setFamilyCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatCode = (value: string) => {
    const clean = value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8);
    return clean.length > 4 ? `${clean.slice(0, 4)}-${clean.slice(4)}` : clean;
  };

  async function handleLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    if (!/^[A-Z]{4}-[A-Z]{4}$/.test(familyCode)) { setError("Digite o código no formato ABCD-EFGH."); return; }
    setLoading(true);
    try {
      const result = await linkChild(familyCode);
      setMessage(`${result.child.firstName} ${result.child.lastName} foi vinculado(a) com sucesso.`);
      window.setTimeout(() => navigate("/", { replace: true }), 900);
    } catch (err) { setError(getApiErrorMessage(err, "Não foi possível vincular esta conta.")); }
    finally { setLoading(false); }
  }

  return <div className="min-h-screen bg-secondary/5 p-4"><header className="flex items-center gap-3 bg-white rounded-xl p-4"><Link to="/" aria-label="Voltar"><ArrowLeft/></Link><h1 className="font-bold text-lg">Vincular dependente</h1></header>
    <main className="max-w-lg mx-auto mt-6 bg-white rounded-2xl p-5 shadow-sm space-y-5"><div><p className="text-sm text-secondary font-semibold uppercase">Código de família</p><h2 className="text-2xl font-bold mt-1">Conecte a conta do filho</h2><p className="text-sm text-neutral mt-2">Peça o código exibido em Ajustes na conta da criança. O código tem o formato ABCD-EFGH.</p></div>
      <form onSubmit={handleLink} className="space-y-4"><label htmlFor="familyCode" className="block text-sm font-semibold">Código de pareamento</label><input id="familyCode" value={familyCode} onChange={(e) => setFamilyCode(formatCode(e.target.value))} placeholder="ABCD-EFGH" autoComplete="off" maxLength={9} className="w-full tracking-[0.25em] text-center text-2xl font-bold uppercase p-4 rounded-xl bg-secondary/10 outline-none focus:ring-2 focus:ring-secondary"/>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}{message && <p role="status" className="text-sm text-green-700 flex items-center gap-2"><CheckCircle2 size={17}/>{message}</p>}
        <button type="submit" disabled={loading || familyCode.length !== 9} className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl p-4 font-semibold disabled:opacity-50">{loading ? <><LoaderCircle className="animate-spin"/> Vinculando...</> : <><Link2/> Vincular conta</>}</button>
      </form><Link to="/" className="block text-center text-sm text-neutral">Cancelar</Link>
    </main>
  </div>;
}
