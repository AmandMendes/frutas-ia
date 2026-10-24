// Perfis editoriais predefinidos, compartilhados pelas duas opções do painel.
// O sotaque é escolhido separadamente: nenhuma região representa um caráter.
export const CHARACTER_PROFILES = Object.freeze([
  {
    id:'alegre', labels:['Alegre','Alegre'],
    story:'Encontra motivos para se animar até nas tarefas mais comuns e costuma puxar conversa para incluir quem está por perto. Gosta de organizar pequenos encontros e transforma contratempos em oportunidades de fazer uma brincadeira. Sua alegria vem da vontade de criar vínculos, por isso percebe quando alguém fica de fora e tenta aproximar essa pessoa do grupo. Quando recebe uma notícia ruim, procura uma solução antes de reclamar, mas pode esconder a própria tristeza para não desanimar os outros. Seu desafio é aprender que também pode pedir acolhimento e admitir um dia difícil.',
    acting:'Olhar atento, sorriso espontâneo e gestos abertos; a energia diminui quando percebe que alguém precisa ser ouvido.',
    timbre:'médio, luminoso e acolhedor', intonation:'animada, com variações ascendentes e sorriso audível', rhythm:'moderado a ágil, com pausas para ouvir'
  },
  {
    id:'fofoqueiro', labels:['Fofoqueiro','Fofoqueira'],
    story:'Presta atenção em quem chega, em quem sai e nos pequenos detalhes das conversas. Sente prazer em ser a primeira pessoa a descobrir uma novidade e acredita que compartilhar informações garante seu lugar no grupo. Aproxima-se com perguntas aparentemente inocentes e guarda mentalmente cada resposta para relacioná-la a outra história. Ao contar um caso, aumenta o suspense e espera uma reação antes de revelar o detalhe principal. Nem sempre percebe quando ultrapassa um limite: mistura cuidado com curiosidade e precisa aprender a distinguir uma confidência de uma notícia que pode espalhar.',
    acting:'Inclina-se para contar um segredo, acompanha a reação do interlocutor e faz pausas antes das revelações.',
    timbre:'médio, próximo e levemente soproso', intonation:'cúmplice e curiosa, destacando palavras de surpresa', rhythm:'ágil, com pausas de suspense e breves reduções de volume'
  },
  {
    id:'invejoso', labels:['Invejoso','Invejosa'],
    story:'Observa as conquistas alheias como se fossem uma medida do próprio valor. Deseja reconhecimento, mas tem dificuldade de admitir que sente que ficou para trás e costuma disfarçar a comparação com comentários aparentemente úteis. Quando alguém recebe um elogio, procura uma falha ou lembra uma ocasião em que merecia a mesma atenção. Ainda assim, dedica esforço aos próprios projetos e pode ser persistente quando encontra uma meta concreta. Por trás da crítica existe medo de não ser suficiente; sua evolução começa quando consegue transformar comparação em iniciativa e reconhecer o mérito de outra pessoa.',
    acting:'Sorriso contido diante de elogios alheios, pequenas hesitações e atenção especial a quem recebe destaque.',
    timbre:'médio, contido e ligeiramente tenso', intonation:'polida na superfície, com ironia discreta e ênfase em comparações', rhythm:'moderado, com pequenas pausas antes de elogios ambíguos'
  },
  {
    id:'machao', labels:['Machão','Valentona'],
    story:'Faz questão de parecer forte e capaz de resolver qualquer problema sem ajuda. Assume a liderança rapidamente, transforma pequenas discordâncias em disputas e reage com bravatas quando sente sua autoridade ameaçada. Essa postura esconde o receio de demonstrar medo ou depender de alguém. Quando uma pessoa próxima enfrenta uma dificuldade real, porém, mostra lealdade por meio de ações práticas e se dispõe a protegê-la. Sua trajetória pode revelar a diferença entre coragem e necessidade de impressionar: aprender a ouvir, reconhecer um erro e aceitar apoio exige mais firmeza do que vencer uma discussão.',
    acting:'Postura firme e gestos econômicos; a autoconfiança vacila brevemente quando precisa admitir vulnerabilidade.',
    timbre:'médio-grave, encorpado e firme', intonation:'assertiva, com ataques marcados e finais de frase descendentes', rhythm:'cadenciado e direto, sem gritos ou agressividade constante'
  },
  {
    id:'metido', labels:['Metido','Metida'],
    story:'Entra nas situações esperando ser notado e costuma apresentar suas opiniões como se fossem a referência para todos. Conta vantagens, menciona experiências impressionantes e dá conselhos mesmo quando ninguém pediu. Quer ocupar o centro da conversa porque associa atenção a importância, mas se desconcerta quando encontra alguém que não se impressiona. Pode demonstrar generosidade quando recebe reconhecimento, embora tenha dificuldade de dividir os créditos. Sua contradição aparece nos momentos em que precisa de ajuda: tenta manter a pose, mas aos poucos descobre que escutar e valorizar os outros pode criar uma conexão maior com o grupo.',
    acting:'Ergue discretamente o queixo, ocupa o espaço da conversa e busca confirmação após destacar as próprias qualidades.',
    timbre:'médio, claro e bem projetado', intonation:'autoconfiante e levemente superior, valorizando referências a si', rhythm:'fluido, com pausas calculadas para receber atenção'
  },
  {
    id:'esnobe', labels:['Esnobe','Esnobe'],
    story:'Avalia lugares, objetos e pessoas pelo prestígio que acredita que representam. Faz questão de demonstrar refinamento, cita referências sofisticadas e prefere uma crítica elegante a uma reclamação direta. Seu medo é receber o rótulo daquilo que considera comum, por isso mantém certa distância e raramente admite desconhecer alguma coisa. Quando encontra uma experiência simples que realmente desperta emoção, entra em conflito com a imagem que construiu. Pode revelar sensibilidade e curiosidade se deixar de tratar gosto pessoal como hierarquia e descobrir que afeto e pertencimento não dependem de aprovação social.',
    acting:'Gestos contidos, olhar avaliador e mudanças sutis de expressão quando suas referências são questionadas.',
    timbre:'médio, polido e de articulação nítida', intonation:'reservada e avaliadora, com ironia marcada e ênfases teatrais', rhythm:'pausado, com finais precisos e silêncios breves'
  },
  {
    id:'gentil', labels:['Gentil','Gentil'],
    story:'Percebe necessidades pequenas que costumam passar despercebidas e oferece ajuda sem transformar o gesto em espetáculo. Procura compreender o que levou alguém a agir antes de julgar e tenta criar espaço para conversas difíceis. Sua gentileza não vem de ingenuidade: reconhece conflitos, mas prefere resolvê-los com firmeza respeitosa. O problema surge quando aceita responsabilidades demais para não decepcionar ninguém e acaba negligenciando o próprio descanso. Sua história pode mostrar o aprendizado de estabelecer limites, dizer não com clareza e continuar oferecendo acolhimento sem assumir a obrigação de resolver a vida de todos.',
    acting:'Escuta com atenção, dá espaço ao interlocutor e demonstra firmeza tranquila quando estabelece um limite.',
    timbre:'médio, macio e acolhedor', intonation:'calorosa e atenta, com firmeza serena nos limites', rhythm:'moderado e natural, dando espaço para respostas'
  },
  {
    id:'timido', labels:['Tímido','Tímida'],
    story:'Observa bastante antes de participar e ensaia mentalmente o que gostaria de dizer. Tem ideias próprias e percebe nuances nas relações, mas teme ocupar espaço demais ou se tornar alvo de julgamento. Em grupos grandes, fala pouco; quando encontra alguém em quem confia, revela humor, interesses e uma imaginação surpreendente. Pode perder oportunidades por esperar o momento perfeito de se manifestar, embora demonstre coragem em situações que envolvem alguém de quem gosta. Sua evolução acontece em pequenos passos: fazer uma pergunta, discordar com delicadeza e descobrir que pode ter espaço sem precisar se transformar em outra pessoa.',
    acting:'Gestos discretos e contato visual que cresce com a confiança; evita reduzir toda a atuação a gagueira ou hesitação.',
    timbre:'médio, suave e de projeção discreta', intonation:'reservada no início, ganhando segurança em assuntos familiares', rhythm:'calmo, com hesitações breves e pausas naturais, sem gagueira forçada'
  },
  {
    id:'extrovertido', labels:['Extrovertido','Extrovertida'],
    story:'Busca energia no contato com outras pessoas e costuma iniciar conversas onde quer que esteja. Faz conexões rapidamente, apresenta desconhecidos uns aos outros e se oferece para organizar atividades do grupo. Seu entusiasmo abre portas, mas às vezes fala antes de perceber que alguém ainda não terminou uma ideia. Tem dificuldade com períodos longos de silêncio e pode interpretar distância como rejeição. Por trás da facilidade social existe o desejo de manter todos por perto; seu aprendizado consiste em respeitar diferentes ritmos, apreciar a escuta e descobrir que intimidade também se constrói sem preencher cada pausa.',
    acting:'Gestos espontâneos e atenção circulando pelo grupo; a escuta deve aparecer tanto quanto a energia social.',
    timbre:'médio, aberto e vibrante', intonation:'expressiva e espontânea, variando com as reações do interlocutor', rhythm:'ágil e conversacional, sem atropelar as respostas'
  },
  {
    id:'rabugento', labels:['Rabugento','Rabugenta'],
    story:'Prefere rotinas conhecidas e reage a mudanças com resmungos, observações secas e previsões de que algo vai dar errado. A reclamação funciona como defesa contra frustrações que não gosta de admitir. Apesar da aparência impaciente, conhece bem os hábitos das pessoas próximas e costuma ajudá-las discretamente, fingindo que fez apenas o necessário. Incomoda-se com desperdício, barulho e promessas vazias, mas pode revelar humor afiado quando baixa a guarda. Sua história ganha força quando precisa escolher entre manter distância para evitar decepções ou aceitar uma convivência imperfeita que também oferece afeto.',
    acting:'Pequenos suspiros, olhar crítico e gestos práticos de cuidado que contradizem as reclamações.',
    timbre:'médio-grave, seco e levemente áspero', intonation:'resmungada e impaciente, com humor contido e contraste afetivo sutil', rhythm:'cadenciado, com frases curtas e suspiros discretos'
  },
  {
    id:'barraqueiro', labels:['Barraqueiro','Barraqueira'],
    story:'Reage rapidamente quando acredita que foi desrespeitado e prefere tornar o conflito visível a guardar ressentimento em silêncio. Argumenta com intensidade, recupera detalhes antigos e tenta convencer quem está por perto de que sua indignação é justa. Seu impulso nasce da necessidade de ser levado a sério, mas pode transformar um mal-entendido pequeno em uma disputa pública. Também é capaz de defender outra pessoa com a mesma energia e de demonstrar arrependimento depois que se acalma. Seu desafio é aprender a separar firmeza de escalada, ouvir uma explicação e pedir reparação sem transformar toda conversa em confronto.',
    acting:'Gestos enfáticos e reações imediatas; alterna intensidade e escuta, evitando gritaria uniforme ou violência automática.',
    timbre:'médio, forte e de projeção presente', intonation:'enfática e indignada, com contrastes claros de intensidade', rhythm:'rápido nas réplicas e pontuado por pausas assertivas, sem gritar o tempo todo'
  },
  {
    id:'lunatico', labels:['Lunático','Lunática'],
    story:'Enxerga graça nas situações mais improváveis e solta risadas quando ninguém ainda entendeu a piada. Faz associações bizarras, inventa teorias absurdas sobre assuntos banais e muda de assunto para contar uma ideia que acabou de surgir. Fala besteira com enorme convicção, faz perguntas inconvenientes e frequentemente percebe tarde demais que deixou o grupo constrangido. Busca diversão e surpresa, mas sua falta de filtro pode transformar uma conversa tranquila em uma sequência imprevisível de situações embaraçosas. Por trás da irreverência existe uma vontade intensa de quebrar a monotonia; seu desafio é continuar inventivo sem ignorar os limites e os sentimentos de quem está por perto.',
    acting:'Risadas espontâneas, reações inesperadas e mudanças súbitas de foco; percebe o constrangimento alheio com atraso e tenta remendar a situação com outra ideia absurda.',
    timbre:'médio, flexível e de brilho espontâneo', intonation:'imprevisível e divertida, com surpresa em detalhes banais e risadas breves fora de hora', rhythm:'ágil, com mudanças de assunto e pausas inesperadas, mantendo as palavras compreensíveis'
  },
  {
    id:'antissocial', labels:['Antissocial / Cara fechada','Antissocial / Cara fechada'],
    story:'Prefere ficar no próprio canto e costuma responder com poucas palavras quando alguém tenta puxar conversa. Mantém a expressão fechada, evita encontros cheios e protege seu tempo como se cada interrupção precisasse de uma boa justificativa. Nem sempre está com raiva: muitas vezes quer apenas silêncio e distância, mas seu jeito seco leva os outros a interpretar desinteresse ou desprezo. Observa mais do que revela e demonstra consideração por meio de ações discretas, sem discursos afetuosos. Quando alguém respeita seu espaço, pode permitir uma aproximação lenta; seu conflito é preservar a autonomia sem afastar justamente as pessoas com quem gostaria de criar confiança.',
    acting:'Expressão fechada, gestos econômicos e respostas curtas; pequenos sinais de atenção revelam interesse sem transformar a reserva em hostilidade constante.',
    timbre:'médio-grave, seco e de projeção contida', intonation:'reservada e pouco expansiva, com finais de frase firmes e afeto muito discreto', rhythm:'lento a moderado, com frases curtas e silêncios confortáveis, sem agressividade automática'
  },
  {
    id:'misterioso', labels:['Misterioso','Misteriosa'],
    story:'Parece saber mais do que conta e escolhe cuidadosamente o que revela em cada conversa. Responde a perguntas diretas com uma observação precisa, muda de assunto ao ouvir certos nomes e às vezes demonstra familiaridade com situações que afirma desconhecer. Esses detalhes fazem o grupo se perguntar o que está escondendo: uma promessa antiga, um passado inesperado ou um plano que ainda não pode explicar. Não mente o tempo todo; prefere oferecer uma parte verdadeira da história e deixar o restante em aberto. Sua tensão nasce do desejo de se aproximar sem perder o controle sobre o próprio segredo, permitindo que a confiança seja construída por pistas e pequenas revelações.',
    acting:'Olhar atento, pausas antes de respostas importantes e reações sutis a certas perguntas; sugere segredos sem recorrer a ameaças ou gestos sinistros constantes.',
    timbre:'médio-grave, aveludado e de ressonância discreta', intonation:'controlada e sugestiva, com ênfase sutil em palavras que deixam perguntas no ar', rhythm:'pausado e preciso, com silêncios breves antes de revelações, sem sussurro permanente'
  },
  {
    id:'espirito-de-porco', labels:['Espírito de porco','Espírito de porco'],
    story:'Encontra uma maneira de azedar o clima mesmo quando tudo parecia correr bem. Diante de uma conquista alheia, aponta um defeito; numa comemoração, faz uma observação ácida que deixa alguém sem resposta. Gosta de criar constrangimentos e transforma tarefas simples em discussões sobre detalhes que antes não incomodavam ninguém. Muitas vezes sabe exatamente o efeito que vai causar e usa a desculpa de estar apenas sendo sincero para escapar da responsabilidade. Sua satisfação está em interromper a alegria do grupo e recuperar o controle da situação. A convivência revela o custo desse comportamento: as pessoas passam a esconder novidades e evitar sua presença, obrigando o personagem a encarar a diferença entre ter razão e agir com maldade.',
    acting:'Comentários secos nos momentos de entusiasmo, olhar crítico e satisfação discreta ao provocar desconforto; cria obstáculos pequenos e certeiros, sem depender de gritos.',
    timbre:'médio-grave, seco e levemente áspero', intonation:'ácida e mordaz, com ironia fria e falsa inocência após comentários inconvenientes', rhythm:'cadenciado, com pausas calculadas antes de alfinetadas e finais de frase cortantes'
  },
  {
    id:'pick-me-girl', labels:['Pick Me Girl','Pick Me Girl'],
    story:'Busca aprovação masculina e mede seu valor pela atenção que recebe dos homens ao redor. Para parecer especial, insiste em dizer que é diferente das outras mulheres e transforma preferências pessoais em argumentos de superioridade. Pode diminuir interesses considerados femininos, desqualificar outra mulher diante do grupo ou concordar com uma crítica injusta para conquistar simpatia. Adapta opiniões e atitudes conforme percebe o que será elogiado, mesmo quando isso contraria seus próprios desejos. Por trás dessa competição existe medo de não ser escolhida; sua trajetória pode revelar o custo de trocar autenticidade por validação e a possibilidade de construir vínculos sem transformar outras mulheres em rivais.',
    acting:'Procura discretamente a reação masculina após falar, muda o tom ao receber atenção e apresenta comparações depreciativas com aparente descontração; deixa transparecer insegurança quando a aprovação não vem.',
    timbre:'médio, claro e de suavidade calculada', intonation:'agradável e buscando cumplicidade, com ênfase em comparações e mudanças sutis ao procurar aprovação', rhythm:'conversacional, com pausas breves para avaliar reações, sem voz infantilizada'
  },
  {
    id:'afeminado', labels:['Afeminado','Afeminada'],
    story:'Expressa feminilidade de maneira espontânea em seus gestos, na escolha das palavras e no cuidado com a própria apresentação. Usa as mãos para acompanhar o raciocínio, percebe nuances de tom e gosta de encontrar uma forma pessoal de se mostrar ao mundo. Sua expressão pode ser delicada, firme, expansiva ou contida conforme a situação, sem precisar virar uma piada constante. Quando alguém tenta enquadrar seu comportamento, decide entre se preservar e afirmar o próprio jeito com clareza. O conflito do personagem nasce dessa negociação entre pertencimento e autenticidade; seus gostos e relações são individuais, e sua trajetória revela desejos, limites e qualidades que vão além dos trejeitos.',
    acting:'Gestos fluidos, expressão facial atenta e movimentos delicados quando fizerem sentido para a cena; preserve naturalidade e variedade emocional, sem transformar feminilidade em deboche.',
    timbre:'médio, macio e flexível, sem impor altura aguda', intonation:'melódica e articulada, com nuances expressivas e firmeza quando necessário', rhythm:'fluido e natural, com pausas que acompanham gestos e emoções, com floreios vocais caricatos'
  },
  {
    id:'asmr', labels:['ASMR','ASMR'], voiceOnly:true,
    timbre:'muito suave, macio e delicadamente soproso',
    intonation:'sussurrada e acolhedora, em volume muito baixo, quase um sussurro',
    rhythm:'lento, calmo e pausado, com articulação delicada e respirações discretas',
    accentStyle:'suave e discreto',
    voiceDirection:'Interpretação íntima, relaxante e agradável de ouvir, sem projeção forte, tensão vocal ou variações bruscas de volume. Manter voz consistente e fala compreensível.'
  }
].map(profile => Object.freeze({...profile, labels:Object.freeze(profile.labels)})));
