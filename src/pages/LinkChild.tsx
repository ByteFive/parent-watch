import {
  ArrowLeft,
  CheckCircle2,
  ClipboardPaste,
  Link2,
  MapPin,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CODE_LENGTH = 6;

const PHOTO =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfgf5mB-y52rO5z5-D4P9LkYNUgj9E5BhLnxcbDVUtIyRScOwSOENQ88&s=10";

type Child = {
  name: string;
  photo: string;
};

export default function LinkChild() {
  const navigate = useNavigate();

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [child, setChild] = useState<Child | null>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const isComplete = code.every((char) => char !== "");

  useEffect(() => {
    if (!isComplete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChild(null);
      return;
    }

    const timeout = setTimeout(() => {
      setChild({ name: "Sofia Oliveira", photo: PHOTO });
    }, 400);

    return () => clearTimeout(timeout);
  }, [isComplete]);

  function sanitize(value: string) {
    return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  }

  function fillFrom(startIndex: number, value: string) {
    const chars = sanitize(value).slice(0, CODE_LENGTH - startIndex).split("");
    if (chars.length === 0) return;

    setCode((prev) => {
      const next = [...prev];
      chars.forEach((char, i) => {
        next[startIndex + i] = char;
      });
      return next;
    });

    const nextFocus = Math.min(startIndex + chars.length, CODE_LENGTH - 1);
    inputsRef.current[nextFocus]?.focus();
  }

  function handleChange(index: number, value: string) {
    if (value === "") {
      setCode((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }
    fillFrom(index, value);
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Backspace" && code[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    fillFrom(index, event.clipboardData.getData("text"));
  }

  async function handlePasteButton() {
    try {
      const text = await navigator.clipboard.readText();
      fillFrom(0, text);
    } catch {
      inputsRef.current[0]?.focus();
    }
  }

  function handleLink() {
    if (!child) return;
    
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-secondary/5">
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Link to="/">
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-bold">Detalhes do membro</h2>
        </div>
        <img
          src={PHOTO}
          alt="Seu perfil"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-secondary text-sm font-medium uppercase">
              Novo dependente
            </span>
            <h1 className="text-2xl font-bold">Vincular conta do filho</h1>
          </div>
          <Link
            to="/"
            aria-label="Fechar"
            className="p-3 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
          >
            <X />
          </Link>
        </div>

       
        <div className="bg-secondary/10 rounded-xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-32 rounded-xl bg-slate-900 p-1.5 flex flex-col items-center">
                <div className="w-full flex-1 rounded-md bg-white flex items-center justify-center">
                  <img
                    src={PHOTO}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-900"
                  />
                </div>
                <div className="w-3 h-3 rounded-full bg-slate-700 mt-1"></div>
              </div>
              <span className="text-sm text-neutral text-center">
                Seu <br /> celular
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center px-2">
              <div className="flex-1 h-0.5 bg-secondary/30"></div>
              <div className="bg-white p-1.5 rounded-full shadow">
                <div className="bg-secondary text-white p-3 rounded-full">
                  <MapPin size={20} />
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-secondary/30"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-32 rounded-xl bg-white border border-neutral/30 p-1.5 flex flex-col items-center shadow">
                <img
                  src={PHOTO}
                  alt=""
                  className="w-full flex-1 min-h-0 rounded-md object-cover"
                />
                <div className="w-3 h-3 rounded-full bg-neutral/40 mt-1"></div>
              </div>
              <span className="text-sm text-neutral text-center">
                Aparelho <br /> filho
              </span>
            </div>
          </div>
        </div>

        
        <div className="space-y-3">
          <p className="font-medium">Código de pareamento</p>

          <div className="grid grid-cols-6 gap-2">
            {code.map((char, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={char}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                onFocus={(e) => e.target.select()}
                inputMode="text"
                autoComplete="off"
                maxLength={CODE_LENGTH}
                aria-label={`Caractere ${index + 1} do código`}
                className="w-full aspect-square bg-white rounded-md shadow text-center text-xl font-semibold uppercase outline-none focus:ring-2 focus:ring-secondary"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handlePasteButton}
            className="flex items-center gap-2 text-secondary text-sm font-medium"
          >
            <ClipboardPaste size={16} />
            Colar código
          </button>
        </div>

        
        {child && (
          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
            <div className="relative">
              <img
                src={child.photo}
                alt={child.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary border-2 border-white"></span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1 text-secondary text-sm font-medium">
                <CheckCircle2 size={16} />
                Código validado com sucesso
              </span>
              <span className="text-xl font-medium">{child.name}</span>
            </div>
          </div>
        )}

        
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleLink}
            disabled={!child}
            className="px-4 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed duration-300 flex items-center justify-center gap-2 rounded-md text-white font-semibold w-full"
          >
            <Link2 />
            Vincular conta
          </button>

          <Link
            to="/"
            className="px-4 py-3 bg-secondary/10 hover:bg-secondary/20 duration-300 flex items-center justify-center rounded-md font-semibold w-full"
          >
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}
