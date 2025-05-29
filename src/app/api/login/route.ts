  import { NextRequest, NextResponse } from 'next/server';
  import { PrismaClient } from '@prisma/client';

  const prisma = new PrismaClient();

  // ✅ POST - LOGIN
  export async function POST(req: NextRequest) {
    try {
      const { email, senha } = await req.json();

      // Verifica se existe um usuário com esse email e senha
      const user = await prisma.users.findFirst({
        where: {
          email,
          senha,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: 'Email ou senha incorretos' },
          { status: 401 }
        );
      }

      // Se encontrou o usuário, pode definir um cookie ou apenas retornar sucesso
      const response = NextResponse.json(
        { message: 'Login realizado com sucesso', user },
        { status: 200 }
      );

      // (Opcional) Cria um cookie de sessão simples
      response.cookies.set('logado', 'true', {
        httpOnly: false, // ⚠️ Em produção, é recomendado usar httpOnly: true
        path: '/',
        maxAge: 60 * 60 * 24, // 1 dia
      });

      return response;
    } catch (err) {
      console.error('Erro no login:', err);
      return NextResponse.json(
        { message: 'Erro no login', error: String(err) },
        { status: 500 }
      );
    }
  }
