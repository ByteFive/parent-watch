import {
    ChevronLeft,
  CircleCheck,
  IdCard,
  LockKeyhole,
  Shield,
  ShieldUser,
  SquareUser,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const [role, setRole] = useState<"responsavel" | "filho">("responsavel");

  return (
    <div className="p-4 space-y-4">
        <Link to="/login" className=" flex w-12 h-12 shadow  rounded-full items-center justify-center"> <ChevronLeft/> </Link>
      <h1 className="text-2xl font-extrabold ">Criar Conta</h1>
      <div className="flex items-center justify-between">
        <h2>Selecione o Perfil de Uso</h2>
        <span className="text-secondary text-xs">*Obrigatório</span>
      </div>


      <div className="flex flex-col gap-4">
        <button
          onClick={() => setRole("responsavel")}
          className="flex gap-4 shadow p-4 rounded-md"
        >
          <div className="flex  bg-primary h-12 w-12 justify-center items-center rounded-md">
            <ShieldUser className="text-white" />
          </div>
          <div className="flex w-3/4 justify-between">
            <span>Responsável</span>
            {role === "responsavel" && <CircleCheck className="text-secondary"/>}
          </div>{" "}
        </button>

        <button
          onClick={() => setRole("filho")}
          className="flex gap-4 shadow p-4 rounded-md"
        >
          <div className="flex  bg-primary h-12 w-12 justify-center items-center rounded-md">
            <SquareUser className="text-white" />
          </div>
          <div className="flex w-3/4 justify-between">
            <span>Filho</span>
            {role === "filho" && <CircleCheck  className="text-secondary"/>}
          </div>
        </button>
      </div>
      <form action="" className="space-y-4">
        <div className="">
          <label htmlFor="name" className="font-semibold">
            Nome completo:
          </label>
          <div className="relative bg-neutral/10 rounded-md py-2">
            {" "}
            <User className="absolute top-2 left-3" />
            <input
              id="name"
              type="text"
              placeholder="Ex: Maria Oliveira"
              className="pl-12 w-full"
            />
          </div>
        </div>

        <div className="">
          <label htmlFor="name" className="font-semibold">
            CPF:
          </label>
          <div className="relative bg-neutral/10 rounded-md py-2">
            {" "}
            <IdCard className="absolute top-2 left-3" />
            <input
              id="name"
              type="text"
              placeholder="Ex: 000.000.000-00"
              className="pl-12 w-full"
            />
          </div>
        </div>

        <div className="">
          <label htmlFor="name" className="font-semibold">
            Senha:
          </label>
          <div className="relative bg-neutral/10 rounded-md py-2">
            {" "}
            <LockKeyhole className="absolute top-2 left-3" />
            <input
              id="name"
              type="text"
              placeholder="Ex: Senha"
              className="pl-12 w-full"
            />
          </div>
        </div>

        <div className="">
          <label htmlFor="name" className="font-semibold">
            Confirmar da senha
          </label>
          <div className="relative bg-neutral/10 rounded-md py-2">
            {" "}
            <LockKeyhole className="absolute top-2 left-3" />
            <input
              id="name"
              type="text"
              placeholder="Ex: Senha "
              className="pl-12 w-full"
            />
          </div>
        </div>
      </form>

      <button className="bg-primary text-white w-full rounded-md py-2">Cadastrar</button>
    
    <p className="text-center">Já tem uma conta? <Link to="/login" className="text-secondary">Fazer Login.</Link></p>

    </div>
  );
}
