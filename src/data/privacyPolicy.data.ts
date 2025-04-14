type TypeText = 'header' | 'paragraph' | 'list' | 'subheader';

export interface PolicySection {
    type: TypeText;
    content: string | string[];
};

export const privacyPolicyData: PolicySection[] = [
    {
        type: 'header',
        content: '1. Introducción',
    },
    {
        type: 'paragraph',
        content: 'Bienvenido a TrustThreads (en adelante, “la Plataforma”). La presente Política de Privacidad tiene por objeto informar a nuestros usuarios acerca del tratamiento de sus datos personales, en correspondencia con nuestros principios fundamentales: respeto a la vida, propiedad privada y libertad. Nuestra Plataforma ha sido diseñada como un espacio de libre expresión, en el cual se preserva la confidencialidad de la información, salvo en los casos establecidos por ley o en situaciones excepcionales que puedan afectar el ecosistema de la comunidad.',
    },
    {
        type: 'header',
        content: '2. Principios Rectores',
    },
    {
        type: 'paragraph',
        content: 'En TrustThreads nos regimos por los siguientes principios:'
    },
    {
        type: 'list',
        content: [
            'Respeto a la vida: Promovemos un ambiente seguro y respetuoso para todas las personas.',
            'Propiedad privada: Respetamos y protegemos la información personal de nuestros usuarios, entendiéndola como un bien protegido.',
            'Libertad: Garantizamos el ejercicio de la libre expresión, limitando únicamente aquellos casos que puedan alterar estos principios fundamentales o comprometer la integridad del ecosistema.',
        ],
    },
    {
        type: 'header',
        content: '3. Alcance y Definiciones',
    },
    {
        type: 'list',
        content: [
            'Usuarios: Se entiende por usuario a toda persona que se registre y/o utilice la Plataforma.',
            'Datos Personales: Cualquier información que permita identificar de forma directa o indirecta a un usuario.',
            'Datos Públicos: Aquellos datos que el usuario decide mostrar en su perfil o en sus publicaciones con carácter público.',
            'Datos Ocultos: Toda la información adicional registrada en la Plataforma que no ha sido configurada como pública por el usuario.',
        ],
    },
    {
        type: 'header',
        content: '4. Recopilación y Tratamiento de Datos',
    },
    {
        type: 'paragraph',
        content: 'La Plataforma puede recabar datos personales y de actividad de los usuarios a través de:',
    },
    {
        type: 'list',
        content: [
            'Registro y Perfil del Usuario: Información básica de identificación y contacto que el usuario decida proporcionar.',
            'Actividad en la Plataforma: Datos referentes a la interacción, publicaciones y participación en la red social.',
            'Datos Estadísticos: Información agregada y anónima utilizada para análisis y mejoras del servicio.',
        ],
    },
    {
        type: 'paragraph',
        content: 'El tratamiento de los datos se orienta exclusivamente a fines estadísticos, de mejora de la experiencia del usuario y de investigación interna, sin fines comerciales ni de divulgación no autorizada.',
    },
    {
        type: 'header',
        content: '5. Uso y Finalidad de la Información',
    },
    {
        type: 'list',
        content: [
            'Fines Estadísticos: La información recopilada será utilizada para generar estadísticas internas que ayuden a optimizar y perfeccionar el funcionamiento de la Plataforma.',
            'Seguridad y Mantenimiento: Garantizar el buen funcionamiento, la integridad y la seguridad de la Plataforma.',
            'Respeto a la Privacidad: Salvo autorización explícita del usuario, ni la Plataforma ni sus representantes utilizarán los datos con fines distintos a los establecidos en esta política.',
        ],
    },
    {
        type: 'header',
        content: '6. Confidencialidad y Publicidad de Datos',
    },
    {
        type: 'list',
        content: [
            'Información Pública: Se considerará pública únicamente aquella información que el usuario manifieste de forma expresa, ya sea en su perfil o en publicaciones marcadas como públicas.',
            'Información Oculta: La totalidad de datos no expuestos públicamente se mantendrá de forma oculta y confidencial, resguardada por mecanismos técnicos y organizativos adecuados, y no serán divulgados a terceros.',
        ],
    },
    {
        type: 'header',
        content: '7. Excepciones y Obligaciones Legales',
    },
    {
        type: 'paragraph',
        content: 'La Plataforma se reserva el derecho de proporcionar, de forma total o parcial, la información reservada en las siguientes circunstancias:',
    },
    {
        type: 'list',
        content: [
            'Orden Judicial o Requerimiento Legal: En cumplimiento de una orden de autoridad competente, o cuando se investiguen delitos graves que comprometan la seguridad o el orden público.',
            'Casos Excepcionales: Aquellos que, por su naturaleza, puedan alterar los principios de nuestra comunidad o impactar negativamente en el ecosistema de la Plataforma.',
        ],
    },
    {
        type: 'header',
        content: '8. Derechos de los Usuarios',
    },
    {
        type: 'paragraph',
        content: 'Los usuarios tienen derecho a:',
    },
    {
        type: 'list',
        content: [
            'Acceder: Conocer qué datos personales se han registrado y cómo se han utilizado.',
            'Rectificar: Corregir la información incorrecta o incompleta.',
            'Suprimir: Solicitar la eliminación de sus datos personales, siempre que no exista obligación legal de conservación.',
            'Oponerse: Impedir el tratamiento de sus datos para determinados fines.',
            'Portabilidad: Solicitar la transferencia de sus datos a otro responsable, en caso de ser técnicamente posible.',
        ],
    },
    {
        type: 'paragraph',
        content: 'Para ejercer estos derechos, los usuarios podrán dirigirse a nuestro departamento de protección de datos a través de los canales de contacto establecidos.',
    },
    {
        type: 'header',
        content: '9. Medidas de Seguridad',
    },
    {
        type: 'paragraph',
        content: 'La Plataforma implementa medidas técnicas, organizativas y de seguridad, encaminadas a proteger la información personal de los usuarios contra accesos no autorizados, pérdida, destrucción o alteración. Estas medidas se actualizan de forma periódica para responder a las nuevas amenazas del entorno digital.',
    },
    {
        type: 'header',
        content: '10. Cambios en la Política de Privacidad',
    },
    {
        type: 'paragraph',
        content: 'Nos reservamos el derecho de modificar la presente Política de Privacidad para adaptarla a nuevas normativas legales, tecnológicas o comerciales. Las modificaciones serán notificadas oportunamente a los usuarios a través de la Plataforma o mediante comunicación directa, según corresponda.',
    },
];