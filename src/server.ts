import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient({
  log: ["query"],
});

const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Produto {
  nome: String;
  preco: String;
  url_image: String;
}

app.get("/", async (req: Request, res: Response) => {
  res.json("Hello World!");
});

app.get("/produtos", async (req: Request ,res: Response) => {
  try {
    var busca = await prisma.produto.findMany();
    res.json(busca);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/produto/:id", async (req: Request, res: Response) => {
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

app.post("/produto", async (req: Request, res: Response) => {
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

app.put("/produto/:id", async (req: Request, res: Response) => {
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

app.delete("/produto/:id", async (req: Request, res: Response) => {
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
