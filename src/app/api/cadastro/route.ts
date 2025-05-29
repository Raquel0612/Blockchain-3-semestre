import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ GET - Listar todos os usuários
export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(
      { message: 'Lista de usuários', users },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    return NextResponse.json(
      { message: 'Erro ao buscar usuários', error: String(err) },
      { status: 500 }
    );
  }
}

// ✅ POST - Cadastrar novo usuário
export async function POST(req: NextRequest) {
  try {
    const { nome, email, senha } = await req.json();

    // Validação simples
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { message: 'nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const user = await prisma.users.create({
      data: { nome, email, senha },
    });

    return NextResponse.json(
      { message: 'Usuário criado com sucesso!', user },
      { status: 201 }
    );
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    return NextResponse.json(
      { message: 'Erro ao criar usuário', error: String(err) },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Deletar usuário por ID
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: 'ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    await prisma.users.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Usuário deletado com sucesso' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    return NextResponse.json(
      { message: 'Erro ao deletar usuário', error: String(err) },
      { status: 500 }
    );
  }
}
