# ParentWatch — integração frontend/backend

## O que foi conectado

- Autenticação: `POST /auth/register`, `POST /auth/login`, `POST /auth/logout` e `GET /auth/me`.
- Sessão: cookie JWT HttpOnly enviado pelo Axios com `withCredentials: true`; o frontend consulta `/auth/me` ao iniciar para recuperar a sessão após atualizar/reabrir a página.
- Rotas protegidas por autenticação e perfil (`parent`/`child`).
- Família: `GET /family/children` e `POST /family/children`.
- Localização: `GET /locations/:userId`.
- Socket.IO: `location:watch`, `location:unwatch`, `location:current`, `location:changed`, `location:offline`, `location:update` e `location:stop`.

## Como executar

1. Mantenha o backend como está e inicie-o conforme o README dele. O backend usa por padrão `http://localhost:8080`.
2. No diretório do frontend, instale as dependências: `npm install`.
3. Confira o `.env` do frontend:

   ```env
   VITE_API_URL=http://localhost:8080
   VITE_SOCKET_URL=http://localhost:8080
   ```

4. No backend, `CLIENT_ORIGIN` precisa corresponder exatamente à origem do Vite. O valor do backend enviado foi `http://localhost:5173`, que é a porta padrão do Vite.
5. Inicie o frontend com `npm run dev`.

## Observações importantes

- O backend recebido expõe `/auth`, `/family` e `/locations` na raiz; não existe prefixo `/api`. Por isso a URL antiga `http://localhost:3000/api` estava incorreta para esse backend.
- O frontend não grava JWT em `localStorage` ou `sessionStorage`. A persistência é feita pelo cookie HttpOnly emitido pelo backend; o estado React é reidratado por `/auth/me`.
- O backend não oferece endpoints para editar perfil, consultar detalhes de um filho antes de vincular, ou buscar localização de todos de uma vez. A interface não inventa essas operações.
- O código de família do backend tem formato `AAAA-BBBB` (quatro letras, hífen, quatro letras), não seis caracteres.
- O backend guarda histórico em até três pontos e conforme as regras de precisão/intervalo implementadas nele.
- O compartilhamento de localização no frontend web depende de permissão de geolocalização e da tela de Ajustes da conta filho permanecer aberta. Navegadores móveis podem suspender a página em segundo plano; compartilhamento contínuo confiável exige app nativo.
- O backend configura CORS com uma única origem (`CLIENT_ORIGIN`) e cookies. Em produção, frontend e backend devem ser implantados com configuração HTTPS, domínio/origem alinhados e política de cookie compatível. Não altere `secure`/`sameSite` sem avaliar a arquitetura de domínio.

## Limites respeitados

Somente o frontend foi alterado. Nenhum arquivo do backend foi incluído ou modificado neste pacote.
