const svg = document.getElementById("carrera-visual");
const desc = document.getElementById("descricao");
const timerDisplay = document.getElementById("timer");

let countdownInterval;

function limparCarrera() {
  svg.innerHTML = '';
  desc.innerHTML = '';
  clearInterval(countdownInterval);
  timerDisplay.textContent = '';
}

function iniciarCronometroCarrera(segundos) {
  let tempo = segundos;
  const atualizar = () => {
    timerDisplay.textContent = `Tempo restante: ${Math.floor(tempo / 60)}:${('0' + (tempo % 60)).slice(-2)}`;
  };
  atualizar();
  countdownInterval = setInterval(() => {
    tempo--;
    atualizar();
    if (tempo <= 0) {
      clearInterval(countdownInterval);
      timerDisplay.textContent = '⏰ Tempo esgotado';
    }
  }, 1000);
}

function mostrarEtapaCarrera(etapa) {
  limparCarrera();
  iniciarCronometroCarrera(60);

  switch (etapa) {
    case 1:
      svg.innerHTML += `
        <g class="bloco">
          <rect x="80" y="60" width="100" height="100" fill="#22d3ee" rx="10"/>
          <text x="130" y="105" text-anchor="middle" font-weight="bold">🚗</text>
          <text x="130" y="135" text-anchor="middle" font-weight="bold">Compra</text>
        </g>
      `;
      desc.innerHTML = `<p><strong>🚗 Compra:</strong> Rodolfo compra um carro seminovo na Carrera e já encontra o histórico completo do veículo via blockchain.</p>`;

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="210" y="60" width="100" height="100" fill="#a3e635" rx="10"/>
            <text x="260" y="105" text-anchor="middle" font-weight="bold">🛠</text>
            <text x="260" y="135" text-anchor="middle" font-weight="bold">Revisão 1</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🛠 Revisão 1:</strong> A primeira revisão é registrada em blockchain, criando confiança e transparência no histórico.</p>`;
      }, 10000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="340" y="60" width="100" height="100" fill="#facc15" rx="10"/>
            <text x="390" y="105" text-anchor="middle" font-weight="bold">🔧</text>
            <text x="390" y="135" text-anchor="middle" font-weight="bold">Troca de Peça</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🔧 Troca de Peça:</strong> Uma peça do freio é trocada, e sua autenticidade registrada com hash único na blockchain.</p>`;
      }, 20000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="470" y="60" width="100" height="100" fill="#38bdf8" rx="10"/>
            <text x="520" y="105" text-anchor="middle" font-weight="bold">🛠</text>
            <text x="520" y="135" text-anchor="middle" font-weight="bold">Revisão 2</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🛠 Revisão 2:</strong> Nova manutenção é feita e registrada automaticamente na rede.</p>`;
      }, 30000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="600" y="60" width="100" height="100" fill="#10b981" rx="10"/>
            <text x="650" y="105" text-anchor="middle" font-weight="bold">🔚</text>
            <text x="650" y="135" text-anchor="middle" font-weight="bold">Revenda</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🔚 Revenda:</strong> Quando Rodolfo vender o carro, o novo dono receberá todo o histórico com um clique.</p>`;
      }, 40000);

      setTimeout(() => {
  desc.innerHTML += `
    <p>🔎 Rastreabilidade total: cada etapa da fábrica, a entrega fica registrada de forma imutável na blockchain, evitando fraudes e inconsistências fiscais.</p>
  `;
}, 45000);
      break;

        case 2:
      svg.innerHTML += `
        <g class="bloco">
          <rect x="170" y="70" width="120" height="80" fill="#eab308" rx="10"/>
          <text x="230" y="100" text-anchor="middle">📄</text>
          <text x="230" y="120" text-anchor="middle">Contrato</text>
        </g>
      `;
      desc.innerHTML = `<p><strong>📄 Contrato:</strong> Jhony compra um carro novo e recebe uma garantia digital automática registrada em blockchain, no caso a transferência dos dados do carro já vão automaticas.</p>`;

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="335" y="70" width="120" height="80" fill="#38bdf8" rx="10"/>
            <text x="395" y="100" text-anchor="middle">🛠</text>
            <text x="395" y="120" text-anchor="middle">Revisão</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🛠 Revisão:</strong> A cada revisão feita no prazo, a blockchain valida automaticamente a garantia, sem burocracia.</p>`;
      }, 10000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="500" y="70" width="120" height="80" fill="#22c55e" rx="10"/>
            <text x="560" y="100" text-anchor="middle">✅</text>
            <text x="560" y="120" text-anchor="middle">Validação</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>✅ Validação:</strong> Caso haja um problema, a cobertura é liberada automaticamente com base nos dados validados.</p>`;
      }, 20000);
      setTimeout(() => {
  desc.innerHTML += `
    <p>📜 Smart Contracts:</em> as garantias e revisões são gerenciadas automaticamente, valorizando o veículo com um histórico à prova de fraudes.</p>
  `;
}, 30000);
      break;

    case 3:
      svg.innerHTML += `
        <g class="bloco">
          <rect x="170" y="70" width="120" height="80" fill="#f87171" rx="10"/>
          <text x="230" y="100" text-anchor="middle">📦</text>
          <text x="230" y="120" text-anchor="middle">Peça</text>
        </g>
      `;
      desc.innerHTML = `<p><strong>📦 Peça Original:</strong> O cliente precisa trocar o freio. A peça instalada tem um código único registrado em blockchain.</p>`;

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="335" y="70" width="120" height="80" fill="#fbbf24" rx="10"/>
            <text x="395" y="100" text-anchor="middle">🔧</text>
            <text x="395" y="120" text-anchor="middle">Instalada</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🔧 Instalada:</strong> A peça é associada ao chassi do carro, garantindo rastreabilidade completa.</p>`;
      }, 10000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="500" y="70" width="120" height="80" fill="#22c55e" rx="10"/>
            <text x="560" y="100" text-anchor="middle">✅</text>
            <text x="560" y="120" text-anchor="middle">Validada</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>✅ Validação:</strong> No futuro, qualquer pessoa pode verificar a autenticidade da peça digitalmente.</p>`;
      }, 20000);
      setTimeout(() => {
  desc.innerHTML += `
    <p>📦 Gestão de peças: blockchain conecta estoque entre montadoras, fornecedores e lojas, evitando falhas de inventário.</p>
  `;
}, 30000);
      break;

    case 4:
      svg.innerHTML += `
        <g class="bloco">
          <rect x="100" y="70" width="120" height="80" fill="#f472b6" rx="10"/>
          <text x="160" y="100" text-anchor="middle">👤</text>
          <text x="160" y="130" text-anchor="middle">Cliente</text>
        </g>
      `;
      desc.innerHTML = `<p><strong>👤 Cliente:</strong> Rodolfo realiza uma troca de óleo no Grupo Carrera.</p>`;

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="250" y="70" width="120" height="80" fill="#fb923c" rx="10"/>
            <text x="310" y="100" text-anchor="middle">🎁</text>
            <text x="310" y="130" text-anchor="middle">Tokens</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🎁 Tokens:</strong> Ele ganha tokens digitais, que são armazenados com segurança na blockchain.</p>`;
      }, 10000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="400" y="70" width="120" height="80" fill="#22d3ee" rx="10"/>
            <text x="460" y="100" text-anchor="middle">🏪</text>
            <text x="460" y="130" text-anchor="middle">Loja</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🏪 Loja:</strong> Rodolfo pode consultar seu saldo em qualquer loja e usar como forma de pagamento.</p>`;
      }, 20000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="550" y="70" width="120" height="80" fill="#4ade80" rx="10"/>
            <text x="610" y="100" text-anchor="middle">🎉</text>
            <text x="610" y="130" text-anchor="middle">Resgate</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🎉 Resgate:</strong> Ele troca os tokens por brindes, descontos e serviços exclusivos.</p>`;
      }, 30000);
      setTimeout(() => {
  desc.innerHTML += `
    <p>💡 Novos modelos:</em> os tokens podem representar benefícios fracionados, brindes exclusivos ou acesso a serviços personalizados.</p>
  `;
}, 40000);
      break;

    case 5:
      svg.innerHTML += `
        <g class="bloco">
          <rect x="100" y="70" width="120" height="80" fill="#c084fc" rx="10"/>
          <text x="160" y="100" text-anchor="middle">🚘</text>
          <text x="160" y="130" text-anchor="middle">NFT Criado</text>
        </g>
      `;
      desc.innerHTML = `<p><strong>🚘 NFT Criado:</strong> Um carro de luxo vendido pela Carrera recebe um NFT com identidade digital única.</p>`;

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="250" y="70" width="120" height="80" fill="#a78bfa" rx="10"/>
            <text x="310" y="100" text-anchor="middle">📜</text>
            <text x="310" y="130" text-anchor="middle">Registro</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>📜 Registro:</strong> O NFT armazena o histórico do veículo, revisões e informações técnicas.</p>`;
      }, 10000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="400" y="70" width="120" height="80" fill="#7c3aed" rx="10"/>
            <text x="460" y="100" text-anchor="middle">🔄</text>
            <text x="460" y="130" text-anchor="middle">Transferência</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🔄 Transferência:</strong> Quando o veículo for vendido, o NFT é transferido ao novo dono digitalmente.</p>`;
      }, 20000);

      setTimeout(() => {
        svg.innerHTML += `
          <g class="bloco">
            <rect x="550" y="70" width="120" height="80" fill="#6d28d9" rx="10"/>
            <text x="610" y="100" text-anchor="middle">🔍</text>
            <text x="610" y="130" text-anchor="middle">Consulta</text>
          </g>
        `;
        desc.innerHTML += `<p><strong>🔍 Consulta:</strong> Qualquer pessoa pode verificar a autenticidade e o histórico completo do carro.</p>`;
      }, 30000);
      setTimeout(() => {
  desc.innerHTML += `
    <p>🚘 Tokenização:</em> veículos podem ser vendidos em cotas ou com NFTs de blindagem, revisão vitalícia ou acesso exclusivo a serviços premium.</p>
  `;
}, 40000);
      break;
        break;

    default:
      desc.innerHTML = `
        <h3>🔍 Como tudo isso funciona?</h3>
        <p>Todas as etapas mostradas nesta página — como revisões, garantias, trocas de peças ou NFTs — são registradas em uma <strong>cadeia de blocos</strong>.</p>
        <p>Cada bloco possui um <strong>hash criptográfico</strong>, que garante que os dados não foram alterados. Se algo mudar, toda a cadeia se quebra — como demonstrado na <a href="index.html" target="_blank">Página 1</a>.</p>
        <p>Isso significa que as informações do seu carro são <strong>imutáveis, rastreáveis e confiáveis</strong>, sem depender de terceiros.</p>
        <p><em>✅ Blockchain na prática, com segurança e transparência para todos.</em></p>
      `;
      break;
  }
}
