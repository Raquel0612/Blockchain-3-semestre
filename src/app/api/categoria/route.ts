import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ GET - Lista todas as categorias
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { decks: true },
    });
    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar categorias", error: String(error) },
      { status: 500 }
    );
  }
}

// ✅ POST - Cria uma nova categoria
export async function POST(req: NextRequest) {
  try {
    const { tipo } = await req.json();

    if (!tipo) {
      return NextResponse.json(
        { message: "Campo 'tipo' é obrigatório" },
        { status: 400 }
      );
    }

    const categoria = await prisma.categoria.create({
      data: { tipo },
    });

    return NextResponse.json(categoria, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar categoria", error: String(error) },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID da categoria é obrigatório" },
        { status: 400 }
      );
    }

    await prisma.categoria.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar categoria", error: String(error) },
      { status: 500 }
    );
  }
}
