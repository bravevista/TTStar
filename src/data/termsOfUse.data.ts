type TypeText = 'header' | 'paragraph' | 'list' | 'subheader';

export interface TermsOfUseSection {
    type: TypeText,
    content: string | string[],
};

export const termsOfUseData: TermsOfUseSection[] = [
    {
        type: 'header',
        content: '1. Introducción',
    },
    {
        type: 'paragraph',
        content: 'Bienvenido a TrustThreads (en adelante, “la Plataforma”). El presente documento establece los términos y condiciones bajo los cuales se regirá el uso de la Plataforma por parte de sus usuarios. Al utilizar la Plataforma, aceptas cumplir íntegramente estos Términos de Uso. Si no estás de acuerdo con alguno de los términos aquí expuestos, te recomendamos abstenerte de utilizar la Plataforma.',
    },
    {
        type: 'header',
        content: '2. Definiciones',
    },
    {
        type: 'paragraph',
        content: 'Para efectos de estos términos, se entenderá por:',
    },
    {
        type: 'list',
        content: [
            'Usuario: Toda persona, ya sea individual o representante de una institución, organización, club o agrupación, que acceda y utilice la Plataforma.',
            'Contenido: Toda información, datos, textos, gráficos, fotografías, videos o cualquier otro tipo de material publicado en la Plataforma.',
            'Moderación: Conjunto de acciones y medidas adoptadas por la Plataforma para garantizar el correcto funcionamiento y convivencia en el entorno digital, aplicables cuando se detecten conductas o contenidos que alteren el equilibrio del ecosistema o vulneren los principios fundamentales.',
            'Plataforma: El sitio web y/o aplicación móvil de TrustThreads.',
        ],
    },
    {
        type: 'header',
        content: '3. Uso de la Plataforma',
    },
    {
        type: 'subheader',
        content: '3.1. Acceso y Registro',
    },
    {
        type: 'list',
        content: [
            'El acceso a la Plataforma podrá requerir un proceso de registro, en el cual se solicitarán datos personales básicos y la autorización expresa para el tratamiento de la información conforme a nuestra Política de Privacidad.',
            'Los usuarios deberán proporcionar información veraz y actualizada, siendo responsables de mantener la confidencialidad de sus credenciales de acceso.',
        ],
    },
    {
        type: 'subheader',
        content: '3.2. Responsabilidad del Usuario',
    },
    {
        type: 'list',
        content: [
            'Cada usuario es responsable del contenido que publique y de las interacciones que mantenga en la Plataforma.',
            'Se fomenta la libre expresión y la responsabilidad individual. El usuario, al ser adulto y mostrar su nombre en la aplicación, asume las consecuencias de sus actos en el espacio virtual.',
        ],
    },
    {
        type: 'header',
        content: '4. Moderación de Contenidos y Conducta de los Usuarios',
    },
    {
        type: 'subheader',
        content: '4.1. Principios de Moderación',
    },
    {
        type: 'list',
        content: [
            'La Plataforma se orienta a ser un espacio de libre expresión, respetando los principios de respeto a la vida, propiedad privada y libertad. No obstante, se reserva el derecho de intervenir en casos que comprometan la integridad del ecosistema o que vulneren los principios establecidos.',
            'Se aplicará una moderación flexible: se ignorarán los insultos o faltas de respeto leves entre usuarios que mantienen una relación amistosa o se expresan de forma espontánea; pero se intervendrá cuando tales comportamientos escalen a acoso, malicia o situaciones de riesgo.',
        ],
    },
    {
        type: 'subheader',
        content: '4.2. Medidas y Sanciones',
    },
    {
        type: 'paragraph',
        content: 'Para Usuarios Individuos:',
    },
    {
        type: 'list',
        content: [
            'Advertencia: En caso de conductas que se consideren incipientes, se enviará una notificación de advertencia.',
            'Suspensión Temporal: Si la conducta inapropiada es recurrente o se agrava, se procederá a una suspensión temporal de la cuenta, cuya duración podrá variar entre 1 día y 3 meses, según el grado de responsabilidad.',
            'Sanción Extrema: En situaciones de extrema gravedad (terrorismo, atentados, incitación a destrucciones, sectas, entre otros), se procederá al baneo de la cuenta por un período de hasta 1 año, bloqueando el acceso y la participación del usuario en la Plataforma.',
        ],
    },
    {
        type: 'paragraph',
        content: 'Para Instituciones, Organizaciones, Clubes o Agrupaciones:',
    },
    {
        type: 'list',
        content: [
            'Se aplicarán medidas correctivas que podrán incluir notificaciones para exigir la rectificación de conductas autodestructivas o ideologías peligrosas. En casos graves, se podrá imponer una suspensión temporal de la cuenta institucional.',
            'En circunstancias extremas (por ejemplo, incidencias vinculadas al terrorismo o a la incitación explícita a la destrucción), la cuenta será suspendida de inmediato y se abrirá una investigación por parte del sector de seguridad de la Plataforma. Tras la investigación, se determinará si procede una suspensión, suspensión con rectificación pública o remoción definitiva de la cuenta, con las sanciones correspondientes para los responsables.',
        ],
    },
    {
        type: 'header',
        content: '5. Propiedad Intelectual e Información Publicada',
    },
    {
        type: 'list',
        content: [
            'Derechos de Propiedad: Todo contenido que el usuario publique (incluyendo prototipos, ideas y proyectos) se considerará de su exclusiva autoría. La Plataforma “patenta” internamente la idea publicada, es decir, se reconoce el mérito y derecho del primer usuario en demostrar un desarrollo o puesta en marcha activa del mismo.',
            'Conflictos por Plagio: En situaciones en las que se detecte la reproducción, plagio o apropiación indebida de ideas, se favorecerá al usuario que haya demostrado la implementación o el avance concreto de la idea en un período de tiempo razonable. Los conflictos se resolverán de acuerdo con las evidencias presentadas, valorando el desarrollo y no solo la idea en abstracto.',
            'Derechos de Terceros: La publicación de contenidos que infrinjan derechos de propiedad intelectual de terceros queda terminantemente prohibida. El usuario deberá garantizar que todo material publicado cuenta con las autorizaciones pertinentes.',
        ],
    },
    {
        type: 'header',
        content: '6. Limitación de Responsabilidad',
    },
    {
        type: 'list',
        content: [
            'La Plataforma se esfuerza por mantener un servicio seguro, estable y en continuo perfeccionamiento, pero se deslinda de cualquier responsabilidad derivada de fallas técnicas, problemas en la conectividad o inconvenientes ocasionados por terceros.',
            'No se garantizará la disponibilidad permanente o ininterrumpida de la Plataforma. En caso de fallas críticas, se aplicarán protocolos de resolución, pero la responsabilidad de la Plataforma quedará limitada en la medida permitida por la ley.',
        ],
    },
    {
        type: 'header',
        content: '7. Jurisdicción y Legislación Aplicable',
    },
    {
        type: 'list',
        content: [
            'Estos Términos de Uso se regirán e interpretarán de acuerdo con la legislación peruana.',
            'Para la resolución de cualquier conflicto derivado del uso de la Plataforma, las partes se someterán a la jurisdicción de los tribunales competentes en Perú, salvo acuerdo en contrario mediante cláusula compromisoria.',
        ],
    },
    {
        type: 'header',
        content: '8. Modificaciones a los Términos de Uso',
    },
    {
        type: 'list',
        content: [
            'La Plataforma se reserva el derecho de modificar, actualizar o sustituir estos Términos de Uso en cualquier momento. Los cambios serán comunicados a los usuarios a través de notificaciones directas o mediante la publicación en la Plataforma.',
            'El uso continuado de la Plataforma tras la notificación de dichas modificaciones constituirá la aceptación de los Términos actualizados.',
        ],
    },
    {
        type: 'header',
        content: '9. Terminación del Servicio',
    },
    {
        type: 'list',
        content: [
            'La Plataforma se reserva el derecho de suspender o dar por terminada la cuenta de cualquier usuario que incumpla estos Términos de Uso o que realice acciones que atenten contra los principios, la seguridad o el funcionamiento de la red social.',
            'En caso de terminación de la cuenta, el acceso a la Plataforma será bloqueado y la información asociada se tratará conforme a lo dispuesto en la Política de Privacidad y la normativa vigente.',
        ],
    },
    {
        type: 'header',
        content: '10. Disposiciones Finales',
    },
    {
        type: 'list',
        content: [
            'El presente documento constituye el acuerdo íntegro entre el usuario y la Plataforma en relación con el uso de la misma, sustituyendo cualquier acuerdo o comunicación previa, ya sea oral o escrita.',
            'Si alguna disposición de estos Términos de Uso fuera considerada nula o inaplicable, ello no afectará la validez y aplicabilidad de las restantes disposiciones.',
        ],
    },
];