const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { delay } = require('@whiskeysockets/baileys')

const flowInfo = addKeyword(["1", "uno", "1️⃣"])
  .addAnswer([
    "Estos son los programas de estudio que ofertamos para el *Proceso de Admisión 2025*",
  ])

  .addAnswer([
    "👉 🐄🐄Producción Agropecuaria (*39 vacantes*)",
    "👉 👨‍⚕️👨‍⚕️Enfermería Tecnica (*39 vacantes*)",
    "👉 👨‍💻👨‍💻Arquitectura de Plataformas y servicios de Tecnologías de la Información (*39 vacantes*)",
    "👉 👨‍🔧👨‍🔧Mecatrónica Automotriz (*39 vacantes*)",
  ])
  .addAnswer([
    "Si desea regresar al menú principal, escriba *siguiente* o *menu*",
  ]);

const flowReq = addKeyword(["2", "dos", "2️⃣"])
  .addAnswer([
    "Para postular al *Proceso de Admisión 2025*, necesitas cumplir con los siguientes requisitos✍️✍️:",
  ])
  .addAnswer([
    "📝 *Requisitos* 📝",
    "👉 Copia de DNI 🪪",
    "👉 Fotografia del postulante en digital 🖼️",
    "👉 Correo electrónico 📧",
    "👉 Recibo de pago 🧾",
  ])
  .addAnswer([
    "Si desea regresar al menú principal, escriba *siguiente* o *menu*",
  ]);

const flowDate = addKeyword(["3", "tres", "3️⃣"])
  .addAnswer([
    "🗓️ Estas son las fechas importantes del *Proceso de Admisión 2025:*🗓️",
  ])
  .addAnswer(
    [
      "🎓*Inscripción de exonerados.*🎓 becados, profesionales, artistas/deportistas calificados",
      "👉 🗓️ Inicio de inscripciones: 02 de enero",
      "👉 🗓️ Cierre de inscripciones: 31 de enero",
      "👉 🗓️ Fecha del examen de admisión: 04 de febrero",
    ],
    { delay: 2000 }
  )
  .addAnswer(
    [
      "🎓*Inscripción de postulantes ordinarios.*🎓 ",
      "👉 🗓️ Inicio de inscripciones: 03 de febrero",
      "👉 🗓️ Cierre de inscripciones: 28 de marzo",
      "👉 🗓️ Fecha del examen de admisión: 30 de marzo",
      "👉 🗓️ *Inicio de clases: 07 de abril*",
    ],
    { delay: 2000 }
  )
  .addAnswer(
    ["Si desea regresar al menú principal, escriba *siguiente* o *menu*"],
    { delay: 2000 }
  );

const flowDoc = addKeyword(["4", "cuatro", "4️⃣"])
  .addAnswer("Descarga el Prospecto de Admisión 2025", {
    media:
      "https://iestpjmapuquio.edu.pe/wp-content/uploads/2025/02/PROSPECTO_2025.pdf",
  })
  .addAnswer(
    "Si desea regresar al menú principal, escriba *siguiente* o *menu*",
    { delay: 3000 }
  );

const flowPrincipal = addKeyword([
  "hola",
  "ole",
  "alo",
  "oli",
  "buenos",
  "buenos dias",
  "buen",
  "buen dia",
  "menu",
  "siguiente",
])
  .addAnswer(
    "🙌 ¡Bienvenido/a al *Proceso de Admisión 2025* del Instituto de Educación Superior Tecnológico José María Arguedas de Puquio!"
  )
  .addAnswer(
    [
      "Estamos aquí para ayudarte con toda la información que necesitas.",
      "Por favor, elige una de las siguientes opciones escribiendo el número correspondiente:",
      "👉 *1️⃣ Información sobre los programas de estudio y cantidad de vacantes.*",
      "👉 *2️⃣ Requisitos para postular.*",
      "👉 *3️⃣ Fechas importantes (inscripciones, examen y inicio de clases).*",
      "👉 *4️⃣ Descarga el Prospecto de Admisión 2025.*",
    ],
    null,
    null,
    [flowInfo, flowReq, flowDate, flowDoc]
  );

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
