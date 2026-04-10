FROM node:20

WORKDIR /app

# copia dependências
COPY package*.json ./

RUN npm install

# copia projeto
COPY . .

# ajusta permissões
RUN chown -R node:node /app

# usa usuário node
USER node

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
