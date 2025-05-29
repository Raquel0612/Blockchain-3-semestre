'use client';

import Image from "next/image";

import Sucesso from '../img/header/sucessocadastro.png';
import Falha from '../img/header/falhacadastro.png';

import React, { useState } from 'react';
import { Limelight } from 'next/font/google';

const limelight = Limelight({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCadastro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

   

    setLoading(true);

    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      function redirect() {
          const SUCESSO = document.getElementById('sucesso');
          const FORM = document.getElementById('form');
          const TEXTO = document.getElementById('texto');
          if (SUCESSO && FORM && TEXTO) {
          SUCESSO.style.display = 'block';
          FORM.style.display = 'none';
          TEXTO.style.display = 'none';
          }
          document.cookie = "logado=true; path=/; max-age=3600";

         setTimeout(() => {
          window.location.href = '../home';
        }, 3000);
        }

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

      if (res.ok) {
        redirect();
      } else {
        error();
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro no cadastro');
    } finally {
      setLoading(false);
    }
  }
  
 

  return (
    <div id='cadastroal' className={limelight.className}>
      <Image id="sucesso" src={Sucesso} width={900} alt="" />
      <form id="form" onSubmit={handleCadastro}>
          <label htmlFor="nome">NOME</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password">SENHA</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

          <label htmlFor="passwordconf">CONFIRMAR SENHA</label>
          <input
            type="password"
            id="passwordconf"
            name="passwordconf"
            required
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
          />
          <div className='olho'>
            <span id="toogle" className="olho-css"></span>
          </div>

          <div className='bord' >
          <button type="submit" disabled={loading}>  {loading ? '...' : 'Start'}
          </button>
          </div>
     
      </form>
      <Image id="falha" src={Falha} width={400} alt="" />
           
      <p id="texto">
        Já tem cadastro? <a href='/login'>Entre aqui!</a>
      </p>
    </div>
  );
}