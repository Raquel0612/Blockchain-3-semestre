import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

// GET - Lista todas as transações
export async function GET() {
  try {
    const transacoes = await prisma.transacao.findMany({
      include: {
        remetente: true,
        destinatario: true,
        decks: true,
      },
    });
    return NextResponse.json(transacoes);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar transações", error: String(error) },
      { status: 500 }
    );
  }
}

// POST - Cria uma nova transação
export async function POST(req: NextRequest) {
  try {
    const {
      hash_transacao,
      hash_anterior,
      assinaturaEletronica,
      remetenteId,
      destinatarioId,
    } = await req.json();

    if (
      !hash_transacao ||
      !hash_anterior ||
      !assinaturaEletronica ||
      !remetenteId ||
      !destinatarioId
    ) {
      return NextResponse.json(
        { message: "Preencha todos os campos obrigatórios" },
        { status: 400 }
      );
    }

    const transacao = await prisma.transacao.create({
      data: {
        hash_transacao,
        hash_anterior,
        assinaturaEletronica,
        remetenteId,
        destinatarioId,
      },
    });

    return NextResponse.json(transacao, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar transação", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE 
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID da transação é obrigatório" },
        { status: 400 }
      );
    }

    await prisma.transacao.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Transação deletada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar transação", error: String(error) },
      { status: 500 }
    );
  }
}
