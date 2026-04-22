import { NegocioTab, HowItWorksStep } from '@/types/casos-demo'

// ─────────────────────────────────────────────────────────────────
// CARD FIJA
// ─────────────────────────────────────────────────────────────────
export const CARD_HUMANO = {
  icon: '🤝',
  titulo: 'Hablar con una persona, siempre',
  descripcion:
    'Sabemos que los chatbots son molestos cuando no te dejan hablar con alguien. Todos nuestros asistentes permiten derivar a una persona real en cualquier momento de la conversación. La diferencia es que en lugar de atender 100 consultas, tu equipo atiende solo las 10 que realmente lo necesitan.'
}

// ─────────────────────────────────────────────────────────────────
// CÓMO FUNCIONAN
// ─────────────────────────────────────────────────────────────────
export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    label: 'Disparador',
    description:
      'Todo empieza con un evento: un mensaje entrante, una fecha que se cumple, un campo que cambia en tu base de datos, o una acción de un cliente.'
  },
  {
    label: 'Acción automática',
    description:
      'El sistema ejecuta la respuesta configurada: manda un mensaje, agenda un turno, notifica al equipo, actualiza un registro o combina varias cosas a la vez.'
  },
  {
    label: 'Casos contemplados',
    description:
      'Definimos juntos qué pasa en cada escenario: cuando el cliente no responde, cuando pide hablar con alguien, cuando la info no está disponible. No quedan huecos.'
  },
  {
    label: 'Resultado medible',
    description:
      'Cada automatización tiene un resultado concreto: más turnos agendados, menos tiempo respondiendo mensajes, clientes que vuelven solos.'
  }
]

// ─────────────────────────────────────────────────────────────────
// PROCESO
// ─────────────────────────────────────────────────────────────────
export const PROCESO_PASOS = [
  {
    numero: '01',
    label: 'Reunión inicial',
    desc: 'Entendemos tu negocio y los casos más frecuentes. 30 minutos.'
  },
  {
    numero: '02',
    label: 'Propuesta a medida',
    desc: 'Te mostramos qué automatizaciones tienen más impacto para tu caso.'
  },
  {
    numero: '03',
    label: 'Implementación',
    desc: 'Configuramos, probamos y ajustamos. Sin tocar tu web actual.'
  },
  {
    numero: '04',
    label: 'Lanzamiento',
    desc: 'En una semana el asistente está activo y tu equipo capacitado.'
  }
]

// ─────────────────────────────────────────────────────────────────
// NEGOCIOS
// ─────────────────────────────────────────────────────────────────
export const NEGOCIOS: NegocioTab[] = [
  // ── INMOBILIARIA ──────────────────────────────────────────────
  {
    id: 'inmobiliaria',
    label: 'Inmobiliaria',
    icon: '🏠',
    casos: [
      {
        id: 'inmo-01',
        icon: '🕐',
        titulo: 'Información básica',
        descripcion:
          'Horarios, servicios, dirección y email. El bot responde con los datos actualizados de la inmobiliaria, fáciles de modificar desde el panel.',
        badges: [
          {
            type: 'permiteCrecer',
            explanation:
              'Si las consultas aumentan gracias a redes o a una mejor presencia digital pero nadie las cubre, el crecimiento tiene un techo. Esta automatización elimina ese límite.'
          },
          {
            type: 'generaVentas',
            explanation:
              'Cuando alguien le escribe a tres inmobiliarias, se queda con la que responde primero. Responder al instante, las 24 horas, es una ventaja competitiva directa.'
          },
          {
            type: 'evitaPerdidas',
            explanation:
              'Un canal que no responde parece inactivo o abandonado. El cliente pasa al siguiente. Responder siempre transmite profesionalismo y presencia.'
          }
        ]
      },
      {
        id: 'inmo-02',
        icon: '🔍',
        titulo: 'Búsqueda por requisitos',
        descripcion:
          'El visitante describe lo que busca: zona, precio, ambientes. El bot filtra el catálogo y muestra hasta 5 propiedades con precio, datos y link. Si no hay disponible, lo guarda y avisa cuando aparezca algo similar.',
        badges: [
          {
            type: 'generaVentas',
            explanation:
              'El cliente ya sabe lo que quiere. Si no está disponible ahora, en cuanto aparezca es una venta casi asegurada — y el bot va a buscarlo solo sin que nadie tenga que recordarlo.',
            star: true
          },
          {
            type: 'evitaPerdidas',
            explanation:
              'Sin esta automatización, el cliente que no encontró lo que buscaba simplemente no vuelve. Con ella, la inmobiliaria mantiene el contacto activo hasta que se cierra la operación.'
          },
          {
            type: 'dificilAMano',
            explanation:
              'Llevar registro de las necesidades de cada persona y compararlo con cada nuevo ingreso al catálogo es imposible de sostener manualmente a escala.'
          }
        ]
      },
      {
        id: 'inmo-03',
        icon: '📅',
        titulo: 'Agendar visita',
        descripcion:
          'Si la propiedad está disponible, ofrece coordinar una visita. La agenda automáticamente en el calendario del equipo y envía recordatorios al visitante y a los asesores.',
        badges: [
          {
            type: 'permiteCrecer',
            explanation:
              'El bot cubre la primera parte del proceso de ventas casi completo: califica al interesado, coordina la visita y asegura que ambas partes se presenten. Equivale a casi un puesto de trabajo menos.',
            star: true
          }
        ]
      },
      {
        id: 'inmo-04',
        icon: '💲',
        titulo: 'Consulta por venta de propiedad',
        descripcion:
          'El bot informa los requisitos para poner una propiedad en venta y conecta al interesado con el equipo, adelantando pasos para ambas partes.',
        badges: [
          {
            type: 'permiteCrecer',
            explanation:
              'Una de las consultas más habituales. Tenerla cubierta libera al equipo de responder siempre lo mismo y permite atender más casos sin sumar personas.'
          },
          {
            type: 'generaVentas',
            explanation:
              'Cuando el equipo finalmente habla con el cliente, este ya recibió información, ya entendió el proceso y ya decidió trabajar con la inmobiliaria. El cierre es más fácil.'
          }
        ]
      },
      {
        id: 'inmo-05',
        icon: '🏖️',
        titulo: 'Alquiler vacacional',
        descripcion:
          'Gestión de consultas para alquileres por temporada. Disponibilidad, precios y reservas. El sistema puede enviar ofertas automáticas para fechas vacacionales.',
        badges: [
          {
            type: 'estrategiaCreativa',
            explanation:
              'En lugar de esperar que el cliente llegue, el sistema va a buscarlo activamente en el momento justo — antes de que empiece a planificar sus vacaciones.'
          },
          {
            type: 'generaVentas',
            explanation:
              'Una invitación bien timed activa una decisión que el cliente probablemente no hubiese tomado solo. Muchas reservas no existen sin ese primer empuje.'
          },
          {
            type: 'dificilAMano',
            explanation:
              'Escribirle a cientos de personas en las fechas correctas, de forma personalizada, durante períodos de descanso del equipo, es prácticamente imposible sin automatización.'
          }
        ]
      },
      {
        id: 'inmo-06',
        icon: '🎓',
        titulo: 'Alquiler para estudiantes',
        descripcion:
          'Responde preguntas sobre alquiler temporario, muestra propiedades disponibles y avisa cuando haya stock en la temporada siguiente.',
        badges: [
          {
            type: 'generaVentas',
            explanation:
              'El sistema usa la información recopilada para contactar al cliente en el momento indicado — cuando la temporada se acerca y el estudiante está buscando.'
          },
          {
            type: 'dificilAMano',
            explanation:
              'Comparar las necesidades registradas de cada persona con el stock disponible en cada temporada es inviable manualmente. Acá sucede de forma automática.'
          },
          {
            type: 'estrategiaCreativa',
            explanation:
              'Probablemente sean los únicos en el rubro que buscan activamente al cliente en lugar de esperar a que llegue. Eso es una ventaja competitiva real y difícil de imitar sin tecnología.'
          }
        ]
      },
      {
        id: 'inmo-07',
        icon: '📲',
        titulo: 'Multicanal: Instagram y email',
        descripcion:
          'El mismo asistente puede operar en Instagram Direct o campañas de email. Un sistema, varios canales, sin duplicar la lógica.',
        badges: [
          {
            type: 'permiteCrecer',
            explanation:
              'No necesitás a alguien monitoreando cada red por separado. El mismo sistema cubre todos los canales simultáneamente, sin que el equipo tenga que intervenir.'
          },
          {
            type: 'evitaPerdidas',
            explanation:
              'Cuando solo se presta atención a un canal, las consultas que llegan por los otros se pierden sin que nadie lo note. Cubrir todos evita esa fuga silenciosa de clientes.'
          }
        ]
      }
    ]
  },

  // ── CONCESIONARIA ─────────────────────────────────────────────
  {
    id: 'concesionaria',
    label: 'Concesionaria',
    icon: '🚗',
    casos: [
      {
        id: 'auto-01',
        icon: '🔍',
        titulo: 'Búsqueda por características',
        descripcion:
          'El interesado describe qué busca: marca, modelo, año, kilómetros, presupuesto. El bot filtra el stock en tiempo real y muestra hasta 5 opciones.',
        badges: [
          {
            type: 'generaVentas',
            explanation:
              'El cliente sabe lo que quiere. Mostrarle opciones rápido es el primer paso para cerrar. El que responde primero se queda con el cliente.',
            star: true
          },
          {
            type: 'evitaPerdidas',
            explanation:
              'Si no hay stock disponible pero se guarda el registro, cuando llegue el auto indicado el cliente ya está esperando.'
          }
        ]
      },
      {
        id: 'auto-02',
        icon: '🧮',
        titulo: 'Simulador de financiación',
        descripcion:
          'El cliente indica cuánto puede pagar por mes y el bot calcula cuotas, anticipo estimado y opciones disponibles.',
        badges: [
          {
            type: 'generaVentas',
            explanation:
              'La financiación es el factor decisivo en la mayoría de las compras. Dar un número concreto al instante mueve al cliente de "estoy viendo" a "quiero avanzar".',
            star: true
          },
          {
            type: 'evitaPerdidas',
            explanation:
              'Sin esta información, el cliente se va a buscarla a otra concesionaria que sí la tenga disponible.'
          }
        ]
      },
      {
        id: 'auto-03',
        icon: '💱',
        titulo: 'Tasación de usado',
        descripcion:
          'El cliente ingresa marca, modelo, año y kilómetros. El bot devuelve un rango estimado y ofrece agendar una revisión presencial.',
        badges: [
          {
            type: 'permiteCrecer',
            explanation:
              'Es un trabajo administrativo repetitivo y aburrido que consume tiempo del equipo. El bot lo resuelve al instante, liberando a las personas para tareas que realmente lo necesitan.'
          },
          {
            type: 'estrategiaCreativa',
            explanation:
              'Pocas concesionarias dan una estimación automática. Es un diferencial concreto y difícil de ignorar.'
          }
        ]
      },
      {
        id: 'auto-04',
        icon: '🚦',
        titulo: 'Agendar test drive',
        descripcion:
          'El interesado elige el vehículo y el horario. El bot lo agenda automáticamente y envía recordatorios.',
        badges: [
          {
            type: 'generaVentas',
            explanation:
              'Quien hace el test drive compra en un porcentaje muy alto. El bot lleva al cliente hasta ese punto sin intervención humana.'
          },
          {
            type: 'dificilAMano',
            explanation:
              'Coordinar agendas, confirmar turnos y enviar recordatorios a escala es un trabajo administrativo considerable.'
          },
          {
            type: 'estrategiaCreativa',
            explanation:
              'Pocas concesionarias ofrecen coordinar un test drive desde el chat. Es un diferencial concreto que reduce la fricción para dar ese paso.'
          }
        ]
      },
      {
        id: 'auto-05',
        icon: '📩',
        titulo: 'Seguimiento post-visita',
        descripcion:
          'Después de un test drive, el sistema envía un mensaje automático al día siguiente con información adicional o una oferta especial.',
        badges: [
          {
            type: 'generaVentas',
            explanation:
              'El momento justo después de una visita es cuando el cliente está más cerca de decidir. Un mensaje bien timed puede inclinar la balanza.',
            star: true
          },
          {
            type: 'estrategiaCreativa',
            explanation:
              'Casi ninguna concesionaria hace seguimiento automático y personalizado post-visita. Es una ventaja real.'
          }
        ]
      },
      {
        id: 'auto-06',
        icon: '🔔',
        titulo: 'Alertas de nuevo stock',
        descripcion:
          'En cuanto ingresa un auto con las características buscadas, el cliente recibe un aviso automático.',
        badges: [
          {
            type: 'evitaPerdidas',
            explanation:
              'El cliente que no encontró lo que buscaba se va. Sin esta función, se pierde para siempre sin que nadie lo note.'
          },
          {
            type: 'generaVentas',
            explanation:
              'Cuando el auto llega, el cliente ya está interesado. Es una venta casi asegurada y el bot la gestiona solo.',
            star: true
          },
          {
            type: 'dificilAMano',
            explanation:
              'Cruzar las búsquedas guardadas con cada ingreso nuevo al stock manualmente es imposible de sostener.'
          }
        ]
      },
      {
        id: 'auto-07',
        icon: '🛠️',
        titulo: 'Recordatorio de service',
        descripcion:
          'El sistema recuerda a clientes anteriores cuándo vence su próximo service y agenda el turno desde el chat.',
        badges: [
          {
            type: 'permiteCrecer',
            explanation:
              'Fideliza al cliente para la próxima compra. Construye una relación a largo plazo que no depende de que alguien lo recuerde.'
          },
          {
            type: 'dificilAMano',
            explanation:
              'Llevar registro de cuándo vence el service de cada cliente y contactarlos en el momento justo es inviable sin automatización.'
          }
        ]
      },
      {
        id: 'auto-08',
        icon: '📲',
        titulo: 'Multicanal: Instagram y email',
        descripcion:
          'El mismo asistente puede operar en Instagram Direct o campañas de email. Un sistema, varios canales.',
        badges: [
          {
            type: 'permiteCrecer',
            explanation:
              'No necesitás a alguien monitoreando cada canal. El sistema cubre todos simultáneamente.'
          },
          {
            type: 'evitaPerdidas',
            explanation:
              'Las consultas por Instagram son muy frecuentes en concesionarias. Ignorarlas porque "no había nadie mirando" es perder clientes reales.'
          }
        ]
      }
    ]
  },

  // ── LIBRERÍA ──────────────────────────────────────────────────
{
    id: 'libreria',
    label: 'Librería',
    icon: '📚',
    casos: [
      {
        id: 'lib-01',
        icon: '🔍',
        titulo: 'Búsqueda por título o autor',
        descripcion: '¿Tienen El Alquimista? El bot consulta el catálogo en tiempo real y devuelve disponibilidad y precio al instante.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'La velocidad de respuesta es clave al momento de decidir. El que responde primero se queda con la venta.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Tener a alguien disponible para responder "¿tienen tal libro?" en cualquier momento del día es inviable. El bot lo hace al instante.',
          },
          {
            type: 'evitaPerdidas',
            explanation: 'Una respuesta lenta o ausente hace que el cliente busque en otra librería o en Mercado Libre.',
          },
        ],
      },
      {
        id: 'lib-02',
        icon: '✨',
        titulo: 'Recomendaciones personalizadas',
        descripcion: 'El bot analiza el perfil lector y sugiere títulos por género, autor o estado de ánimo.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'Una buena recomendación genera una compra que no estaba planeada. Es venta pura sin esfuerzo comercial.',
          },
          {
            type: 'estrategiaCreativa',
            explanation: 'Muy pocas librerías pueden ofrecer recomendaciones personalizadas a escala. Normalmente depende de que haya alguien con criterio disponible.',
          },
        ],
      },
      {
        id: 'lib-03',
        icon: '🎁',
        titulo: 'Armado de lista de regalos',
        descripcion: 'Busco un regalo para una nena de 8 años, presupuesto $5.000. El bot arma una selección curada.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'El cliente viene con presupuesto definido y disposición a gastar. El bot convierte esa intención en una compra concreta.',
            star: true,
          },
          {
            type: 'estrategiaCreativa',
            explanation: 'Es un servicio de librería especializada disponible las 24 horas. Muy difícil dedicarle ese tiempo a cada persona que escribe de forma manual.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Armar una selección curada y personalizada para cada consulta de regalo es imposible de sostener manualmente a escala.',
          },
        ],
      },
      {
        id: 'lib-04',
        icon: '📌',
        titulo: 'Reserva de un libro',
        descripcion: 'El cliente reserva un ejemplar desde el chat y recibe confirmación automática.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'La reserva es una venta confirmada. El bot la cierra sin que nadie tenga que intervenir.',
          },
          {
            type: 'evitaPerdidas',
            explanation: 'Si el libro no está disponible, el bot registra la reserva y avisa cuando llega. Sin esto, el cliente no vuelve.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Gestionar reservas, confirmar disponibilidad y avisar cuando está listo consume tiempo operativo considerable.',
          },
        ],
      },
      {
        id: 'lib-05',
        icon: '🔔',
        titulo: 'Aviso de reposición',
        descripcion: 'Cuando el stock se actualiza, el mensaje sale solo al cliente que lo pidió.',
        badges: [
          {
            type: 'evitaPerdidas',
            explanation: 'El cliente que quiso comprar y no pudo se pierde si nadie lo avisa. Con esta función, la venta queda en espera y no se va.',
          },
          {
            type: 'generaVentas',
            explanation: 'Cuando el libro llega, el cliente ya está listo para comprarlo. La venta estaba perdida y el bot la recupera.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Comparar lo que llega al stock con las necesidades registradas de cada cliente es inviable de sostener manualmente.',
          },
        ],
      },
      {
        id: 'lib-06',
        icon: '📖',
        titulo: 'Follow-up post-compra',
        descripcion: 'A los 14 días de comprar Harry Potter 1, el cliente recibe: ¿Ya lo terminaste? ¿Seguimos con el 2?',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'Convierte una compra en una serie. El cliente que compró el primero de una saga es el candidato más fácil para venderle el segundo.',
            star: true,
          },
          {
            type: 'estrategiaCreativa',
            explanation: 'Ninguna librería física hace esto de forma sistemática. Es una ventaja desproporcionada para el tamaño del negocio.',
          },
        ],
      },
      {
        id: 'lib-07',
        icon: '🏆',
        titulo: 'Club de lectores',
        descripcion: 'El cliente acumula descuentos por compra. El bot le recuerda su nivel en cada interacción.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'Construye lealtad sin descuentos agresivos. El cliente vuelve porque tiene un motivo concreto, no porque haya oferta.',
          },
          {
            type: 'estrategiaCreativa',
            explanation: 'Transforma una compra puntual en una relación continua. Pocos negocios chicos pueden sostener esto sin tecnología.',
            star: true,
          },
        ],
      },
      {
        id: 'lib-08',
        icon: '🎯',
        titulo: 'Reto lector anual',
        descripcion: 'El cliente elige una meta de libros al año. El sistema lleva el conteo e incentiva si se atrasa.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'Un cliente comprometido con una meta anual compra más veces en el año. El sistema lo mantiene enganchado solo.',
          },
          {
            type: 'estrategiaCreativa',
            explanation: 'Es una herramienta de fidelización que ninguna librería de la competencia está ofreciendo. Genera pertenencia y hábito.',
            star: true,
          },
        ],
      },
    ],
  },

  // ── GNC ───────────────────────────────────────────────────────
 {
    id: 'gnc',
    label: 'GNC / Taller',
    icon: '🔧',
    casos: [
      {
        id: 'gnc-01',
        icon: 'ℹ️',
        titulo: 'Información básica',
        descripcion: 'El bot responde preguntas sobre horarios, dirección, email y servicios.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'La respuesta rápida ayuda a ser la primera opción cuando alguien busca taller por primera vez.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Estar disponible para responder horarios y datos básicos en cualquier momento consume tiempo innecesario del equipo.',
          },
          {
            type: 'evitaPerdidas',
            explanation: 'Un taller que no responde parece cerrado o desorganizado. El cliente llama al siguiente.',
          },
        ],
      },
      {
        id: 'gnc-02',
        icon: '📋',
        titulo: 'Consulta por oblea GNC',
        descripcion: 'El cliente pregunta por el estado de su oblea y el bot responde con la información de su vehículo.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'La respuesta rápida posiciona al taller como primera opción para quien está buscando dónde hacer su oblea.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Buscar manualmente el registro de cada vehículo cada vez que alguien pregunta es tiempo operativo que se acumula.',
          },
          {
            type: 'estrategiaCreativa',
            explanation: 'Hay gente que no conoce el proceso para pedir la oblea. Si el taller lo explica y acompaña mediante el chatbot, fideliza un cliente desde el primer contacto.',
          },
        ],
      },
      {
        id: 'gnc-03',
        icon: '🔧',
        titulo: 'Consulta por prueba hidráulica',
        descripcion: 'El bot devuelve el estado y fecha de vencimiento registrados para el vehículo.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'La respuesta rápida posiciona al taller como primera opción para quien está buscando dónde hacer su prueba hidráulica.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Igual que la oblea, es una consulta repetitiva que el bot resuelve sin intervención humana.',
          },
          {
            type: 'estrategiaCreativa',
            explanation: 'Igual que con la oblea, acompañar al cliente en un proceso que no conoce genera confianza y fidelización desde el primer contacto.',
          },
        ],
      },
      {
        id: 'gnc-04',
        icon: '⏰',
        titulo: 'Aviso automático de vencimiento de oblea',
        descripcion: 'El sistema detecta vencimientos próximos y envía un mensaje automático X días antes.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'El cliente no siempre recuerda cuándo vence. El que le avisa primero es el que consigue el turno.',
            star: true,
          },
          {
            type: 'permiteCrecer',
            explanation: 'Un taller que avisa proactivamente fideliza sin esfuerzo. El cliente no necesita buscar otro porque este ya lo llamó.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Llevar el control de los vencimientos de todos los clientes y contactarlos en el momento justo es imposible sin automatización.',
          },
        ],
      },
      {
        id: 'gnc-05',
        icon: '📅',
        titulo: 'Aviso de prueba hidráulica',
        descripcion: 'Igual que el aviso de oblea pero para la prueba hidráulica. Corren de forma independiente.',
        badges: [
          {
            type: 'generaVentas',
            explanation: 'El aviso genera el turno. Sin aviso, el cliente se acuerda tarde o en otro taller.',
            star: true,
          },
          {
            type: 'permiteCrecer',
            explanation: 'Construye una relación de confianza. El cliente percibe que el taller lo cuida, no que lo espera.',
          },
          {
            type: 'dificilAMano',
            explanation: 'Dos sistemas de vencimiento distintos corriendo en paralelo para toda la base de clientes.',
          },
        ],
      },
      {
        id: 'gnc-06',
        icon: '📢',
        titulo: 'Mensaje masivo',
        descripcion: 'El encargado selecciona un grupo de clientes y envía un mensaje personalizado a todos desde el panel.',
        badges: [
          {
            type: 'estrategiaCreativa',
            explanation: 'Pocos talleres tienen la capacidad de comunicarse con toda su base de clientes en simultáneo con un mensaje relevante y personalizado.',
            star: true,
          },
          {
            type: 'permiteCrecer',
            explanation: 'Permite hacer campañas de temporada, promociones o recordatorios sin contratar a nadie extra.',
          },
        ],
      },
      {
        id: 'gnc-07',
        icon: '🔄',
        titulo: 'Sincronización con sistema externo',
        descripcion: 'Los vehículos y fechas se sincronizan automáticamente desde el sistema de gestión existente.',
        badges: [
          {
            type: 'dificilAMano',
            explanation: 'Cargar datos manualmente en dos sistemas distintos es lento, propenso a errores y no escala.',
            star: true,
          },
          {
            type: 'permiteCrecer',
            explanation: 'El sistema crece con el negocio sin sumar trabajo operativo. Más clientes no significa más carga.',
          },
        ],
      },
    ],
  },
]
