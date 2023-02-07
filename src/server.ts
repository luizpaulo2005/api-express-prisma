import express from 'express';
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const prisma = new PrismaClient({
  log: ["query"],
});

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

interface Produto {
  nome: String;
  preco: String;
  url_image: String;
}

app.get("/", async (req, res) => {
  res.json("Hello World!");
});

app.get("/produtos", async (req, res) => {
  try {
    var busca = await prisma.produto.findMany();
    res.json(busca);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/produto/:id", async (req, res) => {
  try {
    var busca = await prisma.produto.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(busca);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/produto", async (req, res) => {
  try {
    var adicionar = await prisma.produto.create({
      data: {
        nome: req.body.nome,
        preco: req.body.preco,
        url_image: req.body.url_image,
      }
    });
    res.json(adicionar);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/produto/:id", async (req, res) => {
  try {
    var alterar = await prisma.produto.update({
      where: {
        id: req.params.id,
      },
      data: {
        nome: req.body.nome,
        preco: req.body.preco,
        url_image: req.body.url_image,
      },
    });
    res.json(alterar);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/produto/:id", async (req, res) => {
  try {
    var apagar = await prisma.produto.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(apagar);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log("Servidor HTTP executando em http://localhost:3000");
});
