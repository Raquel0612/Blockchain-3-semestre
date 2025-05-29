"use client";

import { Limelight } from 'next/font/google';
import { useState } from 'react';

const limelight = Limelight({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

// Dados fixos das cartas
const cartasComId = [
  { nome: "bronze-1", id: "0001" },
  { nome: "bronze-2", id: "0002" },
  { nome: "bronze-3", id: "0003" },
  { nome: "bronze-4", id: "0004" },
  { nome: "bronze-5", id: "0005" },
  { nome: "prata-1", id: "0006" },
  { nome: "prata-2", id: "0007" },
  { nome: "prata-3", id: "0008" },
  { nome: "prata-4", id: "0009" },
  { nome: "prata-5", id: "0010" },
  { nome: "ouro-1", id: "0011" },
  { nome: "ouro-2", id: "0012" },
  { nome: "ouro-3", id: "0013" },
  { nome: "ouro-4", id: "0014" },
  { nome: "ouro-5", id: "0015" },
  { nome: "diamante-1", id: "0016" },
  { nome: "diamante-2", id: "0017" },
  { nome: "diamante-3", id: "0018" },
  { nome: "diamante-4", id: "0019" },
  { nome: "diamante-5", id: "0020" },
];

// Função que simula dados do deck (blockchain ou BD)
function getDeckData() {
  return {
    transacaoId: "6837d0361258b07e32764628",
    categoriaId: "6837c637f8d0f2b5304aa944",
    hash_transacao: "hash_6837d0364",
    hash_anterior: "hash_6837d0353",
    assinaturaEletronica: "hash_6837d0364_hash_6837d0353",
  };
}

export default function Random() {
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [cartaSrc, setCartaSrc] = useState('/img/random/rara.png');
  const [nomeCarta, setNomeCarta] = useState('');
  const [idCarta, setIdCarta] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [deckData, setDeckData] = useState<ReturnType<typeof getDeckData> | null>(null);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const isRara = cartaSrc.endsWith('/rara.png');

  // ▶️ Função principal
  const invocarCarta = () => {
    setButtonClicked(true);
    setCarregando(true);
    setMostrarResultado(false);
    setImagemCarregada(false);

    const tipos = ['bronze', 'prata', 'ouro', 'diamante'];
    let contador = 0;

    const animacao = setInterval(() => {
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];
      const numero = Math.floor(Math.random() * 2) + 1;
      const nomeChave = `${tipo}-${numero}`;
      const nomeImagem = `${nomeChave}.png`;

      const carta = cartasComId.find(c => c.nome === nomeChave);
      const nomeFinal = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${numero}`;

      setCartaSrc(`/img/random/${nomeImagem}`);
      setNomeCarta(nomeFinal);
      setIdCarta(carta ? carta.id : '0000');

      setImagemCarregada(false);

      contador++;

      if (contador >= 5) {
        clearInterval(animacao);

        // Simula "carregar os dados" após a animação
        setTimeout(() => {
          const dados = getDeckData();
          setDeckData(dados);
          setCarregando(false);
          setMostrarResultado(true);
        }, 500); // Pequeno delay para parecer mais natural
      }
    }, 1200);
  };

  return (
    <div id='container' className={limelight.className}>
      <img className='shine' src='/img/random/shine.png' height={600} alt='Efeito de Fundo' />

      <img
        className='rara'
        src={cartaSrc}
        width={350}
        height={500}
        onLoad={() => setImagemCarregada(true)}
        style={{
          objectFit: 'contain',
          transform: imagemCarregada && !isRara ? 'scale(4.8)' : 'none',
          transition: 'transform 0.2s ease-in-out',
        }}
        alt='Carta Invocada'
      />

      <div className='invoc-guard'>
        {!mostrarResultado && !carregando && (
          <p >Das sombras do desconhecido, um novo destino é revelado....</p>
        )}

        {(carregando || mostrarResultado) && (
          <>
            <p id='card'>
              Você invocou... <span id='carta-invocada'>{nomeCarta}</span>
            </p>
            <p id='num'>
              Deck: <span id='num-carta'>{idCarta}</span>
            </p>

            {deckData && mostrarResultado && (
              <div id="dados">
                <p>hash_transacao: {deckData.hash_transacao}</p>
                <p>hash_anterior: {deckData.hash_anterior}</p>
                <p>assinaturaEletronica: {deckData.assinaturaEletronica}</p>
              </div>
            )}
          </>
        )}

        {!mostrarResultado && !carregando && !buttonClicked && (
          <input
            id='botao'
            type='button'
            value='&#8594;'
            onClick={invocarCarta}
          />
        )}
      </div>
    </div>
  );
}
