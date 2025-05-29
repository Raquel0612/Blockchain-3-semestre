import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
   
      hash_transacao,
      hash_anterior,
      assinaturaEletronica,
      transacaoId,
      categoriaId,
    } = await req.json();

    // Validação mínima dos campos obrigatórios
    if (!categoriaId) {
      return NextResponse.json(
        { message: "O campo'categoriaId' é obrigatório" },
        { status: 400 }
      );
    }

    const deck = await prisma.deck.create({
      data: {
       
        hash_transacao: hash_transacao || "",
        hash_anterior: hash_anterior || "",
        assinaturaEletronica: assinaturaEletronica || "",
        transacaoId: transacaoId || "",
        categoriaId: categoriaId,
      },
    });

    return NextResponse.json(deck, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar deck", error: String(error) },
      { status: 500 }
    );
  }
}
