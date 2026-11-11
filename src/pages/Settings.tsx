import {
  CircleCheck,
  Copy,
  KeyRound,
  LockKeyhole,
  LogOut,
  Shield,
  ShieldCheck,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="p-4 space-y-4 bg-secondary/5">
      <h1 className="font-bold text-3xl">Olá, Lucas!</h1>
      <div className="bg bg-secondary/10 flex gap-4 p-4 items-center rounded-2xl">
        <div className="bg-secondary p-4 rounded-2xl">
          <ShieldCheck className="text-white" />
        </div>
        <p className="font-semibold">Compartilhamento Ativo</p>
      </div>

      <div className="flex flex-col bg-white rounded-2xl p-4 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="bg-secondary/30 p-2 rounded-2xl">
            <KeyRound size={16} />
          </div>
          <p>Seu ID de Verificação</p>
        </div>
        <div className="bg-secondary/10 flex flex-col items-center rounded-2xl gap-4 p-2">
          <p className="text-gray-500">codigo do dispositivo</p>
          <p className="text-3xl text-primary font-bold">LUCAS-8462</p>
          <p className="flex items-center text-gray-700 gap-2">
            {" "}
            <LockKeyhole className="text-secondary" size={16} />
            Protegido com criptografia familiar
          </p>
        </div>
        <button className="bg-secondary flex justify-center gap-2 p-4 rounded-2xl text-white">
          {" "}
          <Copy /> Copiar Código ID{" "}
        </button>
      </div>
      <h2 className="font-semibold text-lg">Responsável Vinculado</h2>
      <div className="flex items-center p-4 gap-4 bg-white rounded-2xl">
        <div className="w-1/4">
          <img
            className="w-16 h-16 rounded-4xl"
            src="https://imgs.search.brave.com/FlJxnHfLYsQXMMcjUG1LfTfCtxNi7RhsuIOBoOa0RrI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/d2h5LWlzLW1hZ25h/LWEtYmxhY2stYnVs/bC12MC1od2h3cTFj/a3Jza2IxLmpwZz93/aWR0aD02NDAmY3Jv/cD1zbWFydCZhdXRv/PXdlYnAmcz03NTUz/Y2YxZjBiNmJhNThh/MzcxODU1YzAwMTFi/NmE4MzVkOTU5MGYw"
            alt=""
          />
        </div>

        <div className="flex justify-between w-3/4">
          <p className="font-black">Maria Oliveira (Mãe)</p>
          <CircleCheck className="text-secondary" />
        </div>
      </div>

      <div className="bg-secondary/10 flex items-center rounded-2xl  p-4 gap-4">
        <div className="bg-secondary/20 p-2 rounded-3xl">
          <Shield className="text-primary" />
        </div>
        <div>
          <p className="text-sm">
            <span className="font-semibold">Privacidade e Foco: </span>Este
            aplicativo é exclusivamente para manter você protegido. Seu perfil
            não acessa o painel de outros usuários.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center p-4">
        <button className="flex items-center gap-4">
          <LogOut className="text-red-500" />
          Sair da conta neste aparelho
        </button>
      </div>
    </div>
  );
}
