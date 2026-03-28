export const STORY = {
  start: {
    id: "start",
    atmosphere: "dark",
    location: "Ruinas del Templo de Valdris",
    narration: `Abres los ojos. El frío de la piedra te muerde la espalda y el olor a humedad llena tus pulmones. Estás tendido en el suelo de lo que parece ser un antiguo templo en ruinas, sus columnas agrietadas se alzan como dedos oscuros hacia un cielo encapotado.

No recuerdas cómo llegaste aquí. Tu nombre... eso sí lo recuerdas. Y llevas una daga oxidada en el cinto y una capa raída sobre los hombros. En la distancia, el aullido del viento suena casi como una voz.

Ante ti se abren varias posibilidades.`,
    choices: [
      { text: "Explorar las ruinas en busca de pistas", nextId: "ruins_explore" },
      { text: "Seguir el camino que conduce al bosque", nextId: "forest_path" },
      { text: "Gritar pidiendo ayuda", nextId: "merchant" },
      { text: "Examinar el altar que brilla tenuemente al fondo", nextId: "ancient_altar" },
    ],
    statChanges: { vida: 0, mana: 0, oro: 0, experiencia: 0 },
    newItem: null,
    isEnding: false,
  },

  ruins_explore: {
    id: "ruins_explore",
    atmosphere: "mystic",
    location: "Interior del Templo",
    narration: `Avanzas entre las columnas caídas, rozando con los dedos los relieves tallados en las paredes. Figuras de guerreros y dragones se entrelazan en un frenético baile de piedra. Detrás de un muro derrumbado encuentras una pequeña cámara sellada.

Dentro hay un cofre de madera podrida. Lo abres sin dificultad: dentro reposa un mapa de pergamino con rutas trazadas en tinta carmesí. También ves una puerta de hierro oxidada con runas grabadas, que vibra levemente como si algo pulsara al otro lado.

El mapa señala tres lugares: el Bosque de Keth, el Pueblo de Keth y las Catacumbas del Este.`,
    choices: [
      { text: "Forzar la puerta de hierro", nextId: "dungeon_entrance", statChanges: { vida: -8, mana: 0, oro: 0, experiencia: 0 } },
      { text: "Usar el mapa para ir al Bosque de Keth", nextId: "forest_path", statChanges: { vida: 0, mana: -2, oro: 0, experiencia: 0 } },
      { text: "Rezar ante el grabado del dragón en la pared", nextId: "altar_power" },
      { text: "Usar el mapa para buscar una cámara oculta", nextId: "hidden_archive", requires: { item: "Mapa de Valdris" } },
    ],
    statChanges: { vida: 0, mana: 2, oro: 0, experiencia: 12 },
    newItem: "Mapa de Valdris",
    isEnding: false,
  },

  forest_path: {
    id: "forest_path",
    atmosphere: "dark",
    location: "Bosque de Keth",
    narration: `El sendero se adentra en un bosque de árboles retorcidos cuyas ramas entrelazadas bloquean casi toda la luz. Pisadas de hojas húmedas, crujidos en la maleza. Sientes que algo te sigue desde hace varios minutos.

De pronto, tres siluetas emergen entre los troncos: goblins armados con lanzas improvisadas. Su líder luce una corona de huesos. Te rodean lentamente, evaluando si eres presa fácil. Tienes unos segundos para decidir.`,
    choices: [
      { text: "Desenfundar la daga y atacar primero", nextId: "goblin_ambush" },
      { text: "Levantar las manos y negociar con el líder", nextId: "village" },
      { text: "Arrojar tu bolsa de monedas como distracción y correr", nextId: "dungeon_entrance", requires: { stat: "oro", min: 5 }, statChanges: { vida: 0, mana: 0, oro: -5, experiencia: 0 } },
    ],
    statChanges: { vida: -10, mana: 0, oro: 0, experiencia: 8 },
    newItem: null,
    isEnding: false,
  },

  merchant: {
    id: "merchant",
    atmosphere: "calm",
    location: "Cruce de Caminos",
    narration: `Tu voz resuena entre las piedras. Para tu sorpresa, una figura se acerca desde el sendero oriental: un mercader anciano con una mula cargada de fardos. Se llama Orvyn y conoce estas tierras como la palma de su mano.

"Estás en el corazón de Valdris, muchacho," dice mientras te ofrece agua y pan duro. Te cuenta que el Pueblo de Keth queda al norte, que las ruinas están malditas desde que el dragón Valdrix despertó, y que quien encuentre la Piedra de Mando podrá controlarlo... o morir en el intento.

Orvyn tiene provisiones y algo más en su carreta.`,
    choices: [
      { text: "Comprar provisiones y escuchar más historias", nextId: "village", statChanges: { vida: 12, mana: 6, oro: -12, experiencia: 0 } },
      { text: "Pedirle que te guíe a las ruinas del templo", nextId: "ruins_explore" },
      { text: "Ofrecerte como escolta armada a cambio de oro", nextId: "goblin_ambush", statChanges: { vida: -8, mana: 0, oro: 15, experiencia: 0 } },
    ],
    statChanges: { vida: 8, mana: 4, oro: 0, experiencia: 8 },
    newItem: "Pan de camino y cantimplora",
    isEnding: false,
  },

  goblin_ambush: {
    id: "goblin_ambush",
    atmosphere: "battle",
    location: "Bosque de Keth – Emboscada",
    narration: `El acero choca contra lanzas de madera. Los goblins son rápidos y sucios: uno te araña el brazo, otro lanza tierra a tus ojos. Pero la rabia que sientes es más rápida aún.

Con un tajo preciso desarmas al líder y lo tiras al suelo. Los otros dos huyen entre los árboles chillando. El líder goblin, herido y tembloroso, te mira con ojos enormes. A su lado hay un bulto de tela con objetos robados: monedas, una poción y algo más brillante...`,
    choices: [
      { text: "Rematar al líder y quedarte con todo el botín", nextId: "fight_goblin_win", requires: { stat: "vida", min: 50 } },
      { text: "Perdonarle la vida y preguntarle sobre el dungeon", nextId: "fight_goblin_win" },
      { text: "Ignorar el botín y correr hacia las catacumbas", nextId: "dungeon_entrance" },
    ],
    statChanges: { vida: -20, mana: 0, oro: 0, experiencia: 22 },
    newItem: null,
    isEnding: false,
  },

  ancient_altar: {
    id: "ancient_altar",
    atmosphere: "mystic",
    location: "Altar del Dragón Durmiente",
    narration: `Te acercas al altar. Es una losa de mármol negro con un dragón tallado en altorrelieve, cuyas escamas parecen moverse con la tenue luz azulada que emana desde las grietas de la piedra.

Al poner la mano sobre él, una corriente fría te sube por el brazo. En tu mente aparece una imagen: un trono de obsidiana, un dragón negro encadenado, y tú de pie frente a él con una gema pulsando en la mano.

La visión desaparece. Sientes el mana fluir por tu cuerpo como nunca antes. Y escuchas una voz antigua que susurra: "Elige tu camino, portador."`,
    choices: [
      { text: "Tocar la gema central del altar para absorber más poder", nextId: "altar_power", requires: { stat: "mana", min: 20 }, statChanges: { vida: -8, mana: 0, oro: 0, experiencia: 0 } },
      { text: "Alejarte inquieto hacia el bosque", nextId: "forest_path" },
      { text: "Estudiar las inscripciones del suelo", nextId: "dark_ritual" },
    ],
    statChanges: { vida: 0, mana: 18, oro: 0, experiencia: 18 },
    newItem: null,
    isEnding: false,
  },

  village: {
    id: "village",
    atmosphere: "calm",
    location: "Pueblo de Keth",
    narration: `Las primeras casas de madera aparecen entre la niebla matinal. El Pueblo de Keth es pequeño y apagado: sus habitantes te miran con desconfianza desde los umbrales. Pero la taberna está abierta, y el calor de la chimenea invita a entrar.

La tabernera, Mara, te habla entre susurros: el dragón Valdrix ha despertado en las montañas del este. Hace una semana destruyó tres granjas. Los aldeanos están aterrorizados. El alcalde promete una bolsa de oro enorme a quien resuelva el problema.

Tienes opciones en el pueblo.`,
    choices: [
      { text: "Hablar con el alcalde y aceptar la misión oficial", nextId: "village_quest" },
      { text: "Explorar los alrededores del pueblo", nextId: "dungeon_entrance", statChanges: { vida: -8, mana: 0, oro: 0, experiencia: 0 } },
      { text: "Pedir información sobre el ritual oscuro que mencionó Mara", nextId: "dark_ritual", requires: { stat: "mana", min: 25 }, statChanges: { vida: 0, mana: -5, oro: 0, experiencia: 0 } },
    ],
    statChanges: { vida: 10, mana: 5, oro: 0, experiencia: 12 },
    newItem: "Escudo de madera reforzada",
    isEnding: false,
  },

  dungeon_entrance: {
    id: "dungeon_entrance",
    atmosphere: "danger",
    location: "Catacumbas del Este – Entrada",
    narration: `Una boca de piedra se abre en la ladera de la colina. Antorchas apagadas flanquean la entrada. Dentro, el eco de tus pasos se multiplica y la oscuridad es casi sólida. El olor a hueso viejo y azufre llena el aire.

Según el mapa —o los rumores del pueblo— en lo más profundo de estas catacumbas hay dos cosas: el Campeón del Abismo, un guardián non muerto, y más allá de él, la Cámara del Ritual donde se forjó la maldición original de Valdrix.

Tu mano busca instintivamente la empuñadura de tu daga.`,
    choices: [
      { text: "Avanzar con cautela, antorcha en mano", nextId: "fight_champion", requires: { item: "Antorcha de las Catacumbas" }, statChanges: { vida: -8, mana: -4, oro: 0, experiencia: 0 } },
      { text: "Buscar directamente la Cámara del Ritual en las sombras", nextId: "dark_ritual", requires: { stat: "mana", min: 30 }, statChanges: { vida: -10, mana: -15, oro: 0, experiencia: 0 } },
      { text: "Retroceder y buscar refuerzos en el pueblo", nextId: "village" },
    ],
    statChanges: { vida: -5, mana: 0, oro: 0, experiencia: 10 },
    newItem: "Antorcha de las Catacumbas",
    isEnding: false,
  },

  fight_goblin_win: {
    id: "fight_goblin_win",
    atmosphere: "calm",
    location: "Claro del Bosque",
    narration: `Los goblins huyen. Estás de pie en el claro, sudoroso y con un corte en el brazo, pero vivo. Entre los objetos robados encuentras monedas de plata, una poción de cura y... una gema azul del tamaño de un puño que pulsa con luz propia.

El líder goblin, antes de desmayarse, balbucea: "Eso... eso es del dungeon. Nosotros lo robamos. El Campeón... nos perseguirá."

La gema vibra en tu mano. Puedes sentir que tiene un propósito, aunque no sabes cuál todavía.`,
    choices: [
      { text: "Ir al pueblo a curar las heridas y vender las monedas", nextId: "village" },
      { text: "Ir directamente al dungeon a investigar la gema", nextId: "dungeon_entrance", statChanges: { vida: -5, mana: 0, oro: 0, experiencia: 0 } },
      { text: "Volver al altar del templo para examinar la gema allí", nextId: "altar_power", requires: { item: "Gema Azul del Abismo" }, statChanges: { vida: 0, mana: -5, oro: 0, experiencia: 0 } },
    ],
    statChanges: { vida: 5, mana: 0, oro: 18, experiencia: 30 },
    newItem: "Gema Azul del Abismo",
    isEnding: false,
  },

  hidden_archive: {
    id: "hidden_archive",
    atmosphere: "mystic",
    location: "Interior del Templo",
    narration: `Sigues las líneas carmesí del mapa hasta un bloque de piedra que parecía indistinguible del resto. Al presionarlo, una sección del muro cede con un gruñido de roca antigua y deja al descubierto un archivo secreto.

Estantes carcomidos yacen vencidos por el tiempo, pero en el centro aún resiste un atril de hierro. Encima descansa una llave oxidada envuelta en una tela ceremonial y una nota ilegible por la humedad. La cerradura a la que pertenece debe de seguir esperando, paciente, en algún rincón de Valdris.`,
    choices: [
      { text: "Tomar la llave y dirigirte a las catacumbas", nextId: "dungeon_entrance" },
      { text: "Volver al altar y comparar la llave con las runas", nextId: "altar_power" },
      { text: "Salir del templo y buscar refugio en el pueblo", nextId: "village" },
    ],
    statChanges: { vida: 0, mana: 5, oro: 5, experiencia: 18 },
    newItem: "Llave oxidada",
    isEnding: false,
  },

  altar_power: {
    id: "altar_power",
    atmosphere: "mystic",
    location: "Altar del Poder Antiguo",
    narration: `La luz azul del altar te envuelve. Las runas del suelo se iluminan una por una. Sientes cómo el poder arcano fluye por tus venas, reescribiendo algo en tu interior. Recuerdas fragmentos de vidas pasadas: eras un guardián de este templo. Moriste aquí. Y ahora has vuelto.

La voz del altar habla con claridad:
"El dragón Valdrix fue sellado por tu sacrificio hace mil años. El sello se rompe. Tú debes restaurarlo... o convertirte en su nuevo amo."

Ahora tienes acceso a poderes que antes no imaginabas.`,
    choices: [
      { text: "Usar el poder para proteger el pueblo y enfrentar al dragón", nextId: "village_quest", statChanges: { vida: 0, mana: -10, oro: 0, experiencia: 0 } },
      { text: "Adentrarte en el dungeon a buscar más poder aún", nextId: "dark_ritual", statChanges: { vida: -10, mana: -5, oro: 0, experiencia: 0 } },
      { text: "Ir directamente a la guarida del dragón", nextId: "dragon_lair", statChanges: { vida: -15, mana: -10, oro: 0, experiencia: 0 } },
    ],
    statChanges: { vida: 5, mana: 25, oro: 0, experiencia: 40 },
    newItem: "Marca del Guardián Antiguo",
    isEnding: false,
  },

  dark_ritual: {
    id: "dark_ritual",
    atmosphere: "dark",
    location: "Cámara del Ritual Oscuro",
    narration: `La cámara es circular, con un altar de obsidiana en el centro manchado de algo oscuro. Siete velas negras arden solas. En las paredes, grabados en sangre, hay instrucciones en una lengua antigua que, inexplicablemente, puedes leer.

El ritual es sencillo y terrible: quien lo complete se convierte en el Amo de Valdrix, capaz de controlar al dragón como una marioneta. El precio es la humanidad. El que entre como héroe, sale como algo diferente.

Sientes la tentación como una mano cálida en la espalda.`,
    choices: [
      { text: "Completar el ritual. El poder lo justifica todo.", nextId: "ending_dark", requires: { stat: "mana", min: 40 } },
      { text: "Destruir el altar antes de que nadie más lo encuentre", nextId: "fight_champion", statChanges: { vida: -15, mana: -10, oro: 0, experiencia: 0 } },
      { text: "Huir. Este lugar no es para ti.", nextId: "ending_exile", statChanges: { vida: 0, mana: 0, oro: -5, experiencia: 0 } },
    ],
    statChanges: { vida: -20, mana: 20, oro: 0, experiencia: 35 },
    newItem: "Tomo del Ritual Proibido",
    isEnding: false,
  },

  village_quest: {
    id: "village_quest",
    atmosphere: "calm",
    location: "Salón del Alcalde – Pueblo de Keth",
    narration: `El alcalde Brennan te estrecha la mano con fuerza. Es un hombre recto, de manos callosas y ojos cansados. Te cuenta todo: el dragón Valdrix tiene su guarida en el Pico del Abismo, tres horas al este. Los intentos anteriores de enviados terminaron en humo y ceniza.

"Pero tú eres diferente," dice mirando la marca en tu muñeca o el brillo en tus ojos. "Lo sé."

Los aldeanos te despiden con vítores contenidos. Un viejo cazador te da sus últimas flechas de plata. Una niña pequeña te entrega un amuleto de madera tallada.

El camino al este está despejado. El cielo, negro de humo.`,
    choices: [
      { text: "Partir al Pico del Abismo a enfrentar al dragón", nextId: "dragon_lair", statChanges: { vida: -10, mana: -10, oro: 0, experiencia: 0 } },
      { text: "Entrenar con los aldeanos y preparar una trampa", nextId: "ending_hero", statChanges: { vida: -15, mana: -5, oro: 0, experiencia: 0 } },
      { text: "Marcharte del pueblo sin ayudarlos", nextId: "ending_exile", statChanges: { vida: 0, mana: 0, oro: -20, experiencia: 0 } },
      { text: "Alzar el Amuleto de Keth y pedir la bendición del pueblo", nextId: "village_blessing", requires: { item: "Amuleto de Keth" } },
    ],
    statChanges: { vida: 10, mana: 10, oro: 20, experiencia: 25 },
    newItem: "Amuleto de Keth",
    isEnding: false,
  },

  fight_champion: {
    id: "fight_champion",
    atmosphere: "battle",
    location: "Sala del Campeón – Catacumbas",
    narration: `Lo ves al fondo de la sala: el Campeón del Abismo. Un caballero de huesos y armadura ennegrecida, de más de dos metros. Sus cuencas vacías brillan con fuego verde. Alza su espada de obsidiana sin decir una sola palabra.

La pelea es brutal. Te golpea como una catapulta. Pero encuentras el patrón: cada tres golpes, pausa. Es entonces cuando atacas. Una, dos, tres veces en el punto débil de su garganta.

Con un crujido ensordecedor, el Campeón cae. El suelo tiembla. Una llave de hierro cae de sus huesos.`,
    choices: [
      { text: "Usar la llave para abrir la puerta al norte: la guarida del dragón", nextId: "dragon_lair", requires: { item: "Llave del Abismo" }, statChanges: { vida: -10, mana: -5, oro: 0, experiencia: 0 } },
      { text: "Volver al pueblo con la llave como prueba de tu valor", nextId: "village_quest" },
      { text: "Huir con lo que tienes antes de que llegue algo peor", nextId: "ending_exile", statChanges: { vida: 0, mana: 0, oro: -10, experiencia: 0 } },
    ],
    statChanges: { vida: -35, mana: -20, oro: 10, experiencia: 55 },
    newItem: "Llave del Abismo",
    isEnding: false,
  },

  sealed_armory: {
    id: "sealed_armory",
    atmosphere: "danger",
    location: "Catacumbas del Este – Entrada",
    narration: `La llave oxidada gira con dificultad, pero la cerradura cede. La puerta lateral se abre hacia una armería olvidada donde lanzas partidas, escudos mordidos por el óxido y cascos hundidos duermen bajo siglos de polvo.

En un cofre forrado de cuero reseco encuentras una poción espesa del color del ámbar. También descubres marcas recientes en el suelo: alguien, o algo, estuvo aquí mucho después de que las catacumbas fueran selladas.`,
    choices: [
      { text: "Beber la poción y seguir hacia el Campeón", nextId: "fight_champion", requires: { item: "Poción del Bastión" } },
      { text: "Llevar el hallazgo al pueblo como prueba", nextId: "village_quest" },
      { text: "Descender más hondo en busca del ritual", nextId: "dark_ritual" },
    ],
    statChanges: { vida: 10, mana: 0, oro: 10, experiencia: 20 },
    newItem: "Poción del Bastión",
    isEnding: false,
  },

  mana_gate: {
    id: "mana_gate",
    atmosphere: "mystic",
    location: "Cámara del Ritual Oscuro",
    narration: `Canalizas tu magia hacia el sello grabado en la piedra. Las runas responden con un estallido azul y, durante un instante, las paredes parecen respirar. Una compuerta oculta se entreabre y te deja pasar a una cámara donde la energía arcana aún gotea desde el techo como lluvia de luz.

Allí no hay enemigos, solo conocimiento prohibido. Te impregnas de ese poder con la inquietante certeza de que ya no podrás fingir inocencia.`,
    choices: [
      { text: "Aprovechar la revelación y entrar al ritual oscuro", nextId: "dark_ritual" },
      { text: "Marchar directo a la guarida de Valdrix con este poder", nextId: "dragon_lair" },
      { text: "Regresar al pueblo antes de que la magia te consuma", nextId: "village" },
    ],
    statChanges: { vida: -12, mana: 12, oro: 0, experiencia: 25 },
    newItem: "Grimorio de ceniza",
    isEnding: false,
  },

  brute_gate: {
    id: "brute_gate",
    atmosphere: "battle",
    location: "Sala del Campeón – Catacumbas",
    narration: `Clavas el hombro una y otra vez hasta que la piedra cede con un estruendo que hace temblar las criptas. Tras el portón hallas un pasadizo de guerra: cadenas rotas, escudos rajados y los restos de una defensa desesperada.

En un soporte ennegrecido descansa un arco corto aún utilizable. Si alguien intentó detener al Campeón desde aquí, fracasó... pero quizás dejó la herramienta que te faltaba.`,
    choices: [
      { text: "Tomar el arco y desafiar al Campeón", nextId: "fight_champion" },
      { text: "Retirarte con el botín hacia Keth", nextId: "village" },
      { text: "Seguir el eco del combate hacia la guarida del dragón", nextId: "dragon_lair" },
    ],
    statChanges: { vida: -18, mana: 0, oro: 5, experiencia: 18 },
    newItem: "Arco de guerra",
    isEnding: false,
  },

  dragon_lair: {
    id: "dragon_lair",
    atmosphere: "danger",
    location: "Pico del Abismo – Guarida de Valdrix",
    narration: `El calor lo percibes antes de ver al dragón. Entonces doblas la última curva y allí está: Valdrix, negro como el carbón y enorme como una catedral, enroscado sobre una montaña de oro y huesos calcinados. Sus ojos dorados se abren despacio y te miran con curiosidad... y hambre.

"Otro humano pequeño," ronronea en una lengua que entiendes sin saber por qué. "¿Vienes a matarme o a suplicar?"

La cueva entera vibra con su respiración. Tienes quizás un minuto antes de que tome su decisión por ti.`,
    choices: [
      { text: "Atacar con todo lo que tienes. ¡Por Keth!", nextId: "ending_hero", requires: { stat: "vida", min: 40 }, statChanges: { vida: -15, mana: -5, oro: 0, experiencia: 0 } },
      { text: "Negociar: ofrecerle libertad a cambio de paz", nextId: "ending_dark", requires: { stat: "mana", min: 50 }, statChanges: { vida: 0, mana: -20, oro: 0, experiencia: 0 } },
      { text: "Sacrificarte para sellar al dragón con tu propia vida", nextId: "ending_dead", statChanges: { vida: -40, mana: -20, oro: 0, experiencia: 0 } },
      { text: "Alzar la Marca del Guardián Antiguo y despertar el sello", nextId: "ancient_seal", requires: { item: "Marca del Guardián Antiguo" }, statChanges: { vida: 0, mana: -15, oro: 0, experiencia: 0 } },
    ],
    statChanges: { vida: -30, mana: -20, oro: 0, experiencia: 80 },
    newItem: null,
    isEnding: false,
  },

  village_blessing: {
    id: "village_blessing",
    atmosphere: "calm",
    location: "Salón del Alcalde – Pueblo de Keth",
    narration: `Cuando elevas el amuleto, el salón entero guarda silencio. Mara enciende una vela, el alcalde hinca una rodilla y uno a uno los habitantes del pueblo se acercan a tocar la madera tallada como si fuera una reliquia.

No hay gran magia ni trueno divino, pero sientes algo igual de poderoso: una voluntad compartida. La esperanza de Keth se posa sobre tus hombros como una armadura invisible.`,
    choices: [
      { text: "Partir reforzado hacia el Pico del Abismo", nextId: "dragon_lair", requires: { item: "Bendición de Keth" }, statChanges: { vida: 0, mana: -5, oro: 0, experiencia: 0 } },
      { text: "Usar la bendición para preparar la defensa del pueblo", nextId: "ending_hero" },
      { text: "Volver a las catacumbas mientras la bendición dura", nextId: "fight_champion", statChanges: { vida: -5, mana: 0, oro: 0, experiencia: 0 } },
    ],
    statChanges: { vida: 8, mana: 8, oro: 0, experiencia: 15 },
    newItem: "Bendición de Keth",
    isEnding: false,
  },

  ancient_seal: {
    id: "ancient_seal",
    atmosphere: "mystic",
    location: "Pico del Abismo – El Último Sello",
    narration: `La Marca del Guardián responde al rugido de Valdrix. Bajo la ceniza, antiguas líneas de poder se encienden una tras otra, revelando un círculo sellado que llevaba siglos esperando tu regreso.

Por un segundo, el dragón deja de parecer invencible. No porque sea menor, sino porque comprendes al fin cómo fue encerrado la primera vez. La decisión ya no es entre valentía y cobardía, sino entre legado y supervivencia.`,
    choices: [
      { text: "Entregarte al sello y terminar lo que empezaste hace mil años", nextId: "ending_dead", requires: { item: "Marca del Guardián Antiguo" }, statChanges: { vida: -20, mana: -20, oro: 0, experiencia: 0 } },
      { text: "Usar el sello solo como distracción y atacar con todo", nextId: "ending_hero", statChanges: { vida: -10, mana: -10, oro: 0, experiencia: 0 } },
      { text: "Romper el círculo y ofrecerte como amo del dragón", nextId: "ending_dark", requires: { stat: "mana", min: 60 }, statChanges: { vida: 0, mana: -25, oro: 0, experiencia: 0 } },
    ],
    statChanges: { vida: 0, mana: 10, oro: 0, experiencia: 30 },
    newItem: null,
    isEnding: false,
  },

  // ── FINALES ────────────────────────────────

  ending_hero: {
    id: "ending_hero",
    atmosphere: "calm",
    location: "Pueblo de Keth – Día de la Victoria",
    narration: `El último rugido de Valdrix sacude las montañas. Cuando el eco se apaga, hay silencio. Luego, desde el valle, el clamor del pueblo.

Vuelves a Keth con quemaduras en los brazos y una sonrisa que no puedes contener. No recuerdas nada de tu vida anterior, pero esta noche, en la taberna iluminada, rodeado de rostros agradecidos, sientes que esto siempre fue tu destino.

El alcalde Brennan te nombra Guardián de Valdris. Una estatua se erigirá en la plaza. Los bardos compondrán canciones. Y tú, finalmente, descansas.

FINAL: EL HÉROE DE VALDRIS`,
    choices: [],
    statChanges: { vida: 30, mana: 30, oro: 200, experiencia: 150 },
    newItem: "Corona del Guardián de Valdris",
    isEnding: true,
  },

  ending_dark: {
    id: "ending_dark",
    atmosphere: "mystic",
    location: "Trono de Obsidiana – Pico del Abismo",
    narration: `El ritual se completa. O el trato se sella. Da igual el camino: el resultado es el mismo.

Sientes cómo algo en ti se reescribe. El miedo desaparece. La compasión se vuelve borrosa. Pero el poder... el poder es glorioso. Valdrix inclina la cabeza ante ti, su nuevo amo. El fuego que antes te amenazaba ahora te obedece.

Desde tu trono de obsidiana ves el mundo de Valdris extenderse hasta el horizonte. Es tuyo. Todo es tuyo.

El pueblo de Keth envía emisarios. Los escuchas... y sonríes despacio.

FINAL: EL NUEVO AMO DE VALDRIS`,
    choices: [],
    statChanges: { vida: 50, mana: 100, oro: 500, experiencia: 200 },
    newItem: "Cetro del Dragón",
    isEnding: true,
  },

  ending_dead: {
    id: "ending_dead",
    atmosphere: "danger",
    location: "Pico del Abismo – El Último Sello",
    narration: `Extiendes los brazos. Las runas de tu piel arden en azul. Valdrix ruge y retrocede pero ya es tarde: el sello se activa, canalizando a través de ti.

El dolor es indescriptible. Y luego... paz.

El pueblo de Keth no sabe cómo nombrarte. No hay cuerpo que enterrar, solo una figura de luz grabada en la roca de la cueva: tú, con los brazos abiertos, sosteniendo al dragón encadenado por la eternidad.

Los niños de Keth crecen escuchando tu historia. No un rey. No un monstruo. Algo mejor: un guardián para siempre.

FINAL: EL SACRIFICIO ETERNO`,
    choices: [],
    statChanges: { vida: -100, mana: 0, oro: 0, experiencia: 300 },
    newItem: null,
    isEnding: true,
  },

  ending_exile: {
    id: "ending_exile",
    atmosphere: "dark",
    location: "Camino sin nombre – Al borde de Valdris",
    narration: `Caminas. El pueblo queda atrás. Las ruinas quedan atrás. El dragón sigue allí, pero ya no es tu problema, te dices.

La niebla te cubre. No sabes tu pasado, no tienes futuro claro. Solo el camino y el ruido de tus botas sobre la grava húmeda.

Quizás en la próxima tierra encuentres respuestas. O quizás solo encuentres más preguntas. Por ahora, existes. Y eso tendrá que ser suficiente.

Valdris ardió tres semanas después. Nadie recordó tu nombre.

FINAL: EL EXILIO SIN RETORNO`,
    choices: [],
    statChanges: { vida: 0, mana: 0, oro: -10, experiencia: 20 },
    newItem: null,
    isEnding: true,
  },
};
