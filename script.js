const svg = document.getElementById("blockchain-visual");
const desc = document.getElementById("descricao");
const timerDisplay = document.getElementById("timer");

let countdownInterval;
let hashTransacaoGerado = "";
let hash1Minerado = "";
let hash2Minerado = "";
let hash3Minerado = "";
let hash4Minerado = "";

function gerarHashBruto() {
  const caracteres = "ABCDEF0123456789";
  let hash = "";
  for (let i = 0; i < 64; i++) {
    hash += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return hash.substring(0, 7) + "...";
}

function gerarHashValido(base = "") {
  let nonce = 0;
  let hash = "";

  while (true) {
    hash = CryptoJS.SHA256(base + nonce).toString();
    if (hash.startsWith("000")) {
      return hash.substring(0, 7) + "...";
    }
    nonce++;
    if (nonce > 200000) 
      break;
  }
  return "ErroHash";
}

function limparSVG() {
  svg.innerHTML = '';
  clearInterval(countdownInterval);
  timerDisplay.textContent = '';
  desc.innerHTML = '';
}

function iniciarCronometro(segundos) {
  let tempoRestante = segundos;

  const atualizarDisplay = () => {
    const minutos = Math.floor(tempoRestante / 60);
    const segundosRest = tempoRestante % 60;
    timerDisplay.textContent = `Tempo restante: ${minutos}:${segundosRest < 10 ? '0' : ''}${segundosRest}`;
  };

  atualizarDisplay();

  countdownInterval = setInterval(() => {
    tempoRestante--;
    atualizarDisplay();

    if (tempoRestante <= 0) {
      clearInterval(countdownInterval);
      timerDisplay.textContent = '⏰ Tempo esgotado para este passo!';
    }
  }, 1000);
}

function mostrarEtapa(etapa) {
  limparSVG();

  switch (etapa) {
    case 1:
      hashTransacaoGerado = gerarHashBruto();

      svg.innerHTML = `
        <circle cx="100" cy="100" r="30" fill="#22d3ee" />
        <text x="100" y="92" font-size="12" fill="black" text-anchor="middle">Carteira</text>
        <text x="100" y="108" font-size="11" fill="black" text-anchor="middle">Rodolfo</text>

        <rect x="230" y="70" width="100" height="60" rx="10" fill="#a3e635" />
        <text x="280" y="90" font-size="12" fill="black" text-anchor="middle">Carteira</text>
        <text x="280" y="110" font-size="11" fill="black" text-anchor="middle">Jhony </text>

        <line id="linha-envio" x1="130" y1="100" x2="130" y2="100" stroke="#fbbf24" stroke-width="3">
          <animate attributeName="x2" values="130;230" dur="2s" fill="freeze" />
        </line>
      `;

      desc.innerHTML = `
        <p><strong>Rodolfo</strong> está enviando <strong>1 BTC</strong> para <strong>Jhony</strong>.</p>
        <p>Essa operação é registrada como uma <strong>transação digital</strong>.</p>
        <p>Ao ser criada, a transação recebe um identificador único chamado <strong>HASH</strong>, que funciona como uma impressão digital da operação.</p>
        <p>Essa <strong>HASH</strong> é armazenada dentro de um <strong>bloco</strong> no qual existem outras hashes.</p>

      `;

      iniciarCronometro(60);

      setTimeout(() => {
        svg.innerHTML += `
          <g opacity="0">
            <rect x="400" y="70" width="170" height="60" rx="10" fill="#facc15" />
            <text x="470" y="100" font-size="12" fill="black" text-anchor="middle" dominant-baseline="middle">
              Hash: ${hashTransacaoGerado}
            </text>
            <animate attributeName="opacity" from="0" to="1" dur="4.5s" fill="freeze" />
          </g>
        `;
      }, 2000);
      break;

    case 2:
      const hash1Bruto = hashTransacaoGerado || gerarHashBruto();
            hash1Minerado = gerarHashValido(hash1Bruto);
      const hash2Bruto = gerarHashBruto();
            hash2Minerado = gerarHashValido("BlocoB" + hash1Minerado);
      const hash3Bruto = gerarHashBruto();
            hash3Minerado = gerarHashValido("BlocoC" + hash2Minerado);
      const hash4Bruto = gerarHashBruto();
            hash4Minerado = gerarHashValido("BlocoD" + hash3Minerado);

      svg.innerHTML = `
        <g class="bloco" id="blocoA">
          <rect id="retA" x="50" y="60" width="120" height="100" rx="10" fill="#38bdf8" />
          <text x="110" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco A</text>
          <text x="110" y="100" font-size="12" fill="black" text-anchor="middle">1 Transação</text>
          <text id="hashA" x="110" y="115" font-size="12" fill="black" text-anchor="middle">Hash: ${hash1Bruto}</text>
          <text x="110" y="130" font-size="11" fill="black" text-anchor="middle">Hash Ant.: GENESIS</text>
        </g>
      `;

      desc.innerHTML = `
        <p>As transações são agrupadas em estruturas chamadas <strong>blocos</strong>.</p>
        <p>Cada bloco contém:</p>
          <ul style="text-align: left; max-width: 500px; margin: 0 auto;">
            <li>Várias transações</li>
            <li>Um <strong>hash próprio</strong></li>
            <li>O <strong>hash do bloco anterior</strong></li>
          </ul>
        <p>Isso cria uma conexão entre os blocos, formando uma cadeia segura.</p>
        <p>Essa conexão é o que chamamos de <strong>blockchain</strong>.</p>
      `;

      iniciarCronometro(60);

      // B
      setTimeout(() => {
        document.getElementById("retA").setAttribute("fill", "#22c55e");
        document.getElementById("hashA").textContent = `Hash: ${hash1Minerado}`;
        svg.innerHTML += `
          <line x1="170" y1="110" x2="200" y2="110" stroke="black" stroke-width="2">
            <animate attributeName="x2" values="200;210;200" dur="1.5s" repeatCount="indefinite" />
          </line>
          <polygon points="200,105 210,110 200,115" fill="black">
            <animateTransform attributeName="transform" type="translate" values="0,0;10,0;0,0" dur="1.5s" repeatCount="indefinite" />
          </polygon>

          <g class="bloco" id="blocoB">
            <rect id="retB" x="220" y="60" width="120" height="100" rx="10" fill="#38bdf8" />
            <text x="280" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco B</text>
            <text x="280" y="100" font-size="12" fill="black" text-anchor="middle">1 Transação</text>
            <text id="hashB" x="280" y="115" font-size="12" fill="black" text-anchor="middle">Hash: ${hash2Bruto}</text>
            <text x="280" y="130" font-size="11" fill="black" text-anchor="middle">Hash Ant.: ${hash1Minerado}</text>
          </g>
        `;
      }, 10000);

      // C
      setTimeout(() => {
        document.getElementById("retB").setAttribute("fill", "#22c55e");
        document.getElementById("hashB").textContent = `Hash: ${hash2Minerado}`;
        svg.innerHTML += `
          <line x1="340" y1="110" x2="370" y2="110" stroke="black" stroke-width="2">
            <animate attributeName="x2" values="370;380;370" dur="1.5s" repeatCount="indefinite" />
          </line>
          <polygon points="370,105 380,110 370,115" fill="black">
            <animateTransform attributeName="transform" type="translate" values="0,0;10,0;0,0" dur="1.5s" repeatCount="indefinite" />
          </polygon>

          <g class="bloco" id="blocoC">
            <rect id="retC" x="390" y="60" width="120" height="100" rx="10" fill="#38bdf8" />
            <text x="450" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco C</text>
            <text x="450" y="100" font-size="12" fill="black" text-anchor="middle">1 Transação</text>
            <text id="hashC" x="450" y="115" font-size="12" fill="black" text-anchor="middle">Hash: ${hash3Bruto}</text>
            <text x="450" y="130" font-size="11" fill="black" text-anchor="middle">Hash Ant.: ${hash2Minerado}</text>
          </g>
        `;
      }, 20000);

      // D
      setTimeout(() => {
        document.getElementById("retC").setAttribute("fill", "#22c55e");
        document.getElementById("hashC").textContent = `Hash: ${hash3Minerado}`;
        svg.innerHTML += `
          <line x1="510" y1="110" x2="540" y2="110" stroke="black" stroke-width="2">
            <animate attributeName="x2" values="540;550;540" dur="1.5s" repeatCount="indefinite" />
          </line>
          <polygon points="540,105 550,110 540,115" fill="black">
            <animateTransform attributeName="transform" type="translate" values="0,0;10,0;0,0" dur="1.5s" repeatCount="indefinite" />
          </polygon>

          <g class="bloco" id="blocoD">
            <rect id="retD" x="560" y="60" width="120" height="100" rx="10" fill="#38bdf8" />
            <text x="620" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco D</text>
            <text x="620" y="100" font-size="12" fill="black" text-anchor="middle">1 Transação</text>
            <text id="hashD" x="620" y="115" font-size="12" fill="black" text-anchor="middle">Hash: ${hash4Bruto}</text>
            <text x="620" y="130" font-size="11" fill="black" text-anchor="middle">Hash Ant.: ${hash3Minerado}</text>
          </g>
        `;

        setTimeout(() => {
          document.getElementById("retD").setAttribute("fill", "#22c55e");
          document.getElementById("hashD").textContent = `Hash: ${hash4Minerado}`;

          // Integra visual final (como case 3)
          setTimeout(() => {
            svg.innerHTML = `
              <g class="bloco"><rect x="50" y="60" width="120" height="100" rx="10" fill="#22c55e" />
              <text x="110" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco A</text>
              <text x="110" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: GENESIS</text>
              <text x="110" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash1Minerado}</text></g>

              <g class="bloco"><rect x="220" y="60" width="120" height="100" rx="10" fill="#22c55e" />
              <text x="280" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco B</text>
              <text x="280" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash1Minerado}</text>
              <text x="280" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash2Minerado}</text></g>

              <g class="bloco"><rect x="390" y="60" width="120" height="100" rx="10" fill="#22c55e" />
              <text x="450" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco C</text>
              <text x="450" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash2Minerado}</text>
              <text x="450" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash3Minerado}</text></g>

              <g class="bloco"><rect x="560" y="60" width="120" height="100" rx="10" fill="#22c55e" />
              <text x="620" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco D</text>
              <text x="620" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash3Minerado}</text>
              <text x="620" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash4Minerado}</text></g>
            `;
            desc.innerHTML = `
              <p><strong>Cadeia de Blocos Validada!</strong></p>
              <p>Todos os blocos foram minerados com sucesso e estão conectados.</p>
            `;
          }, 1000);
        }, 10000);
      }, 30000);

      break;

    case 3:
  if (!hash1Minerado || !hash2Minerado || !hash3Minerado || !hash4Minerado) {
    desc.innerHTML = "<p>⚠️ Execute o case 2 antes para gerar os hashes.</p>";
    return;
  }

  svg.innerHTML = `
    <g class="bloco">
      <rect x="50" y="60" width="120" height="100" rx="10" fill="#22c55e" />
      <text x="110" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco A</text>
      <text x="110" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: GENESIS</text>
      <text x="110" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash1Minerado}</text>
    </g>

    <g class="bloco">
      <rect x="220" y="60" width="120" height="100" rx="10" fill="#22c55e" />
      <text x="280" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco B</text>
      <text x="280" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash1Minerado}</text>
      <text x="280" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash2Minerado}</text>
    </g>

    <g class="bloco">
      <rect x="390" y="60" width="120" height="100" rx="10" fill="#22c55e" />
      <text x="450" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco C</text>
      <text x="450" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash2Minerado}</text>
      <text x="450" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash3Minerado}</text>
    </g>

    <g class="bloco">
      <rect x="560" y="60" width="120" height="100" rx="10" fill="#22c55e" />
      <text x="620" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco D</text>
      <text x="620" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash3Minerado}</text>
      <text x="620" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash4Minerado}</text>
    </g>
  `;

  desc.innerHTML = `
    <p><strong>Mineração e Formação da Cadeia de Blocos:</strong></p>
    <p>Cada bloco da blockchain precisa ser <strong>minerado</strong> para ser validado e adicionado à cadeia.</p>
    <p>Para isso, o sistema procura um número especial, chamado <strong>nonce</strong>, que ao ser combinado com os dados do bloco, gera um hash que começa com "000".</p>
    <p>Esse processo, chamado de <strong>Proof of Work</strong>, pode exigir milhares de tentativas até encontrar o valor correto.</p>
    <p>Isso garante que ninguém consiga alterar os dados facilmente, pois seria necessário refazer todo esse trabalho.</p>
    <p>Ao final, temos uma <strong>cadeia imutável de blocos conectados</strong>, cada um contendo o hash do anterior, formando a <strong>blockchain</strong>.</p>
    <p>Tempo e esforço computacional são o que garantem a <strong>segurança</strong> da rede.</p>

`;

  iniciarCronometro(60);
  break;

    case 4:
      if (!hash1Minerado || !hash2Minerado || !hash3Minerado || !hash4Minerado) {
        desc.innerHTML = "<p>⚠️ Execute os cases 1 e 2 antes para gerar os hashes.</p>";
        return;
      }

      svg.innerHTML = `
        <g class="bloco">
          <rect x="50" y="60" width="120" height="100" rx="10" fill="#22c55e" />
          <text x="110" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco A</text>
          <text x="110" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: GENESIS</text>
          <text x="110" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash1Minerado}</text>
        </g>

        <g class="bloco">
          <rect x="220" y="60" width="120" height="100" rx="10" fill="#22c55e" />
          <text x="280" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco B</text>
          <text x="280" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash1Minerado}</text>
          <text x="280" y="120" font-size="11" fill="black" text-anchor="middle">Hash: ${hash2Minerado}</text>
        </g>

        <g class="bloco">
          <rect x="390" y="60" width="120" height="100" rx="10" fill="#f87171" />
          <text x="450" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco C</text>
          <text x="450" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: ${hash2Minerado}</text>
          <text x="450" y="120" font-size="11" fill="black" text-anchor="middle">Hash: modificado...</text>
        </g>

        <g class="bloco">
          <rect x="560" y="60" width="120" height="100" rx="10" fill="#f87171" />
          <text x="620" y="80" font-size="14" fill="black" text-anchor="middle" font-weight="bold">Bloco D</text>
          <text x="620" y="100" font-size="12" fill="black" text-anchor="middle">Hash Ant.: modificado...</text>
          <text x="620" y="120" font-size="11" fill="black" text-anchor="middle">Hash: inválido</text>
        </g>
      `;

      desc.innerHTML = `
    <p><strong>Integridade Quebrada!</strong></p>
    <p>Alguém tentou alterar o <strong>Bloco C</strong>.</p>
    <p>Como cada bloco depende do hash do anterior, essa alteração invalidou também o <strong>Bloco D</strong>.</p>
    <p>Em uma blockchain real, essa mudança seria detectada imediatamente e rejeitada pelos demais nós.</p>
    <p>Isso mostra como a <strong>blockchain é segura contra fraudes</strong>.</p>
      `;

      iniciarCronometro(60);
      break;

case 5:
  limparSVG();
  svg.innerHTML = `
    <g class="no" id="no1">
      <circle cx="200" cy="100" r="30" fill="#22c55e" />
      <text x="200" y="100" font-size="10" fill="black" text-anchor="middle" dominant-baseline="middle">Nó 1</text>
      <rect x="180" y="120" width="40" height="10" fill="#38bdf8" rx="2" />
    </g>

    <g class="no" id="no2">
      <circle cx="400" cy="30" r="30" fill="#22c55e" />
      <text x="400" y="30" font-size="10" fill="black" text-anchor="middle" dominant-baseline="middle">Nó 2</text>
      <rect x="380" y="50" width="40" height="10" fill="#38bdf8" rx="2" />
    </g>

    <g class="no" id="no3">
      <circle cx="400" cy="170" r="30" fill="#22c55e" />
      <text x="400" y="170" font-size="10" fill="black" text-anchor="middle" dominant-baseline="middle">Nó 3</text>
      <rect x="380" y="190" width="40" height="10" fill="#38bdf8" rx="2" />
    </g>

    <g class="no" id="no4">
      <circle cx="600" cy="100" r="30" fill="#22c55e" />
      <text x="600" y="100" font-size="10" fill="black" text-anchor="middle" dominant-baseline="middle">Nó 4</text>
      <rect x="580" y="120" width="40" height="10" fill="#38bdf8" rx="2" />
    </g>

    <line x1="200" y1="100" x2="400" y2="30" stroke="#4ade80" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </line>
    <line x1="200" y1="100" x2="400" y2="170" stroke="#4ade80" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </line>
    <line x1="200" y1="100" x2="600" y2="100" stroke="#4ade80" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </line>
    <line x1="400" y1="30" x2="600" y2="100" stroke="#4ade80" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </line>
    <line x1="400" y1="170" x2="600" y2="100" stroke="#4ade80" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </line>
  `;

desc.innerHTML = `
  <p><strong>Rede Descentralizada</strong></p>
  <p>Cada nó representa um <strong>computador conectado</strong> à blockchain.</p>
  <p>Todos os nós possuem <strong>cópias idênticas</strong> da cadeia de blocos.</p>
  <p>Esses nós estão conectados entre si, trocando informações e mantendo a rede atualizada em tempo real.</p>
  <p>Se um nó cair ou for comprometido, os demais continuam funcionando normalmente, garantindo <strong>resiliência e segurança</strong>.</p>
  <div style="margin-top: 2rem;">
    <button id="btn-carrerablock"
      style="padding: 0.6rem 1.2rem; font-weight: bold; border: none; border-radius: 8px; background: #10b981; color: white; cursor: pointer;"
      onclick="window.location.href='carrerablock.html'">
      Como o blockchain poderia ser integrado ao grupo Carrera?
    </button>
  </div>
`;

  iniciarCronometro(60);
  break;
  }
}
