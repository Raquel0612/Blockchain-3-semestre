'use client';

import Image from "next/image";

import React, { useState } from 'react';
import { Limelight } from 'next/font/google';

import Falha from '../img/header/falhacadastro.png';

const limelight = Limelight({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      function error() {
          const FALHA = document.getElementById('falha');
          if (FALHA) {
          FALHA.style.display = 'block';
          }

         setTimeout(() => {
          const FALHA = document.getElementById('falha');
          if (FALHA) {
          FALHA.style.display = 'none';
          }
        }, 6000);
        }

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        window.location.href = '/home';
      } else {
        error();
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro no login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={limelight.className}>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">EMAIL</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="senha">SENHA</label>
        <input
          type="password"
          id="senha"
          name="senha"
          required
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <div className="bord">
          <button type="submit" disabled={loading}>
            {loading ? '...' : 'Start'}
          </button>
        </div>

        <p>
          Ainda não tem cadastro?{' '}
          <a href="/cadastro">Cadastre-se aqui!</a>
        </p>
      </form>

      <Image id="falha" src={Falha} width={400} alt="" />
    </div>
  );
}
