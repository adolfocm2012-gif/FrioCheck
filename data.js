/* FríoCheck — guía orientativa basada en Danfoss, Notas del Instalador (03/2005).
   Resúmenes adaptados para identificación; no sustituyen manuales actuales. */
const SYSTEMS = [
 {id:'todos',name:'Todos los equipos',icon:'◈'},
 {id:'condensador',name:'Condensador',icon:'≋'},
 {id:'compresor',name:'Compresor',icon:'⬡'},
 {id:'evaporador',name:'Evaporador',icon:'❄'},
 {id:'liquido',name:'Línea de líquido',icon:'◉'},
 {id:'control',name:'Control y eléctrico',icon:'⚡'},
 {id:'camara',name:'Cámara frigorífica',icon:'▤'},
 {id:'agua',name:'Enfriadora / agua',icon:'◌'}
];
const SYMPTOMS = [
 {id:'no-enfria',name:'No enfría / bajo rendimiento',icon:'🌡️'},
 {id:'no-arranca',name:'No arranca',icon:'⏻'},
 {id:'presion-alta',name:'Presión de alta elevada',icon:'↑'},
 {id:'presion-baja',name:'Presión de baja reducida',icon:'↓'},
 {id:'alta-baja',name:'Presión de alta baja',icon:'↘'},
 {id:'aspiracion-alta',name:'Presión de aspiración alta',icon:'↗'},
 {id:'paradas',name:'Saltan protecciones / ciclos',icon:'⚡'},
 {id:'burbujas',name:'Burbujas en visor',icon:'◌'},
 {id:'visor-color',name:'Visor descolorido',icon:'◉'},
 {id:'escarcha',name:'Escarcha / hielo',icon:'❄'},
 {id:'filtro-frio',name:'Filtro secador frío',icon:'◇'},
 {id:'ventilador',name:'Ventilador parado / fallo',icon:'✳'},
 {id:'descarga-caliente',name:'Descarga muy caliente',icon:'♨'},
 {id:'compresor-caliente',name:'Compresor caliente',icon:'♨'},
 {id:'golpeteo',name:'Golpeteo / ruido',icon:'♫'},
 {id:'aceite',name:'Nivel / aspecto de aceite',icon:'◕'},
 {id:'espuma',name:'Aceite con espuma',icon:'◌'},
 {id:'liquido-retorno',name:'Retorno de líquido',icon:'⚠'},
 {id:'oscilacion',name:'Funcionamiento irregular',icon:'〰'},
 {id:'camara-caliente',name:'Cámara demasiado caliente',icon:'↑'},
 {id:'camara-fria',name:'Cámara demasiado fría',icon:'↓'},
 {id:'humedad',name:'Humedad anormal',icon:'💧'},
 {id:'fuga',name:'Manchas de aceite / posible fuga',icon:'◉'},
 {id:'caudal',name:'Caudal de agua insuficiente',icon:'◌'}
];
const GUIDE = [
 {
  id:'cond-alta-aire', title:'Alta presión de condensación · aire',system:'condensador',severity:'alta',symptoms:['presion-alta','no-enfria','paradas','descarga-caliente'],
  summary:'El condensador no disipa el calor previsto o el circuito trabaja a una presión excesiva.',pages:[6,14],
  causes:[
   ['Batería sucia u obstruida','Observar aletas, polvo, hojas y posible recirculación de aire.','Limpiar con procedimiento adecuado y recuperar el paso de aire.'],
   ['Ventilación insuficiente o invertida','Comprobar funcionamiento, aspas, sentido de giro y obstáculos.','Corregir el fallo del ventilador por personal autorizado.'],
   ['Ambiente muy caliente o aire recirculado','Comparar aire de entrada con aire expulsado y espacio libre.','Mejorar ventilación y condiciones de instalación.'],
   ['Regulación de condensación incorrecta','Consultar consigna, sonda y documentación del controlador.','Revisar ajuste según diseño.'],
   ['Exceso de refrigerante o gases no condensables','Comparar presiones y temperaturas estabilizadas con las del fabricante; revisar historial de carga.','Solo personal habilitado debe intervenir en refrigerante y determinar la causa.']
  ], checks:['Verificar ventilador y sentido de impulsión.','Inspeccionar suciedad y acceso de aire.','Tomar temperaturas del aire de entrada/salida.','Registrar presiones, refrigerante y temperaturas de saturación.','Revisar regulación y antecedentes de carga.']
 },
 {
  id:'cond-alta-agua', title:'Alta presión de condensación · agua',system:'agua',severity:'alta',symptoms:['presion-alta','no-enfria','paradas','caudal','descarga-caliente'],summary:'La disipación hacia el circuito de agua resulta insuficiente.',pages:[14],
  causes:[
   ['Agua de entrada demasiado caliente','Tomar temperaturas de entrada y salida.','Revisar la fuente de disipación y sus límites.'],
   ['Caudal de agua reducido','Comprobar bomba, válvulas, filtros y caudal con procedimiento seguro.','Recuperar caudal de diseño.'],
   ['Intercambiador con incrustaciones','Comparar saltos térmicos y antecedentes de mantenimiento.','Limpiar el intercambiador según fabricante.'],
   ['Bomba fuera de servicio','Comprobar orden de marcha, protecciones y funcionamiento.','Reparar la causa del fallo.'],
   ['Refrigerante o regulación incorrectos','Contrastar condiciones con especificaciones y registro de carga.','Intervenir solo con personal habilitado.']
  ],checks:['Medir temperaturas de entrada y salida de agua.','Verificar bomba y caudal previsto.','Comprobar filtros, válvulas y posibles obstrucciones.','Comparar datos de condensación con manual.']
 },
 {
  id:'cond-baja',title:'Presión de condensación demasiado baja',system:'condensador',severity:'media',symptoms:['alta-baja','presion-baja','no-enfria','oscilacion'],summary:'Puede aparecer con exceso de disipación, baja carga térmica o regulación anómala.',pages:[14],
  causes:[
   ['Aire exterior muy frío o ventilación excesiva','Comparar temperatura exterior, ventilación y consigna de condensación.','Verificar control de ventilador y presión.'],
   ['Agua demasiado fría o caudal elevado','Comprobar condiciones hidráulicas en equipos por agua.','Revisar regulación del circuito de agua.'],
   ['Carga térmica baja / evaporador desalimentado','Relacionar presiones con demanda real y alimentación de líquido.','Identificar la causa aguas arriba.'],
   ['Válvulas del compresor o regulador defectuosos','Contrastar síntomas, diferencial de presión y regulación.','Revisar componentes conforme al manual.']
  ],checks:['Registrar temperatura exterior/agua.','Revisar velocidad o secuencia de ventiladores.','Comparar demanda real y carga térmica.','Comprobar regulación de condensación.']
 },
 {
  id:'cond-oscilante',title:'Presión de condensación oscilante',system:'condensador',severity:'media',symptoms:['oscilacion','paradas','presion-alta','alta-baja'],summary:'El control de condensación o la expansión puede provocar inestabilidad.',pages:[15],
  causes:[
   ['Banda de actuación grande del ventilador','Consultar consignas, histéresis y ciclos.','Revisar regulación según manual.'],
   ['Válvula de expansión inestable','Observar sobrecalentamiento y tendencia de presiones.','Verificar dimensionamiento y ajuste con datos.'],
   ['Reguladores de condensación mal seleccionados','Comprobar referencias KVR/KVD o equivalentes.','Contrastar selección con fabricante.'],
   ['Presión de aspiración inestable','Registrar conjuntamente alta y baja.','Diagnosticar primero la inestabilidad de aspiración.']
  ],checks:['Registrar tendencia temporal de ambas presiones.','Comparar secuencia del ventilador con cambios de presión.','Revisar control y expansión.']
 },
 {
  id:'cond-ventilador',title:'Ventilador del condensador averiado',system:'condensador',severity:'alta',symptoms:['ventilador','presion-alta','no-enfria','paradas'],summary:'Una ventilación defectuosa reduce la disipación y eleva la presión.',pages:[6,14],
  causes:[
   ['Motor parado o protección disparada','Comprobar señal de marcha, estado de protecciones y cableado, sin exposición eléctrica.','Diagnóstico eléctrico por persona competente.'],
   ['Giro invertido','Observar dirección del flujo y referencia del fabricante.','Corregir conexión/control según procedimiento.'],
   ['Aspas dañadas o aletas deformadas','Inspección visual con el equipo asegurado.','Reparar o sustituir partes afectadas.']
  ],checks:['Bloquear y asegurar arranque antes de inspección mecánica.','Comprobar orden de funcionamiento y protecciones.','Observar sentido del flujo y estado de aspas.']
 },
 {
  id:'asp-baja',title:'Presión de aspiración demasiado baja',system:'evaporador',severity:'alta',symptoms:['presion-baja','no-enfria','paradas','escarcha','oscilacion'],summary:'El evaporador puede estar recibiendo poco refrigerante o poca carga térmica.',pages:[7,18,19],
  causes:[
   ['Evaporador con escasa carga térmica','Comparar demanda real, temperatura de recinto y caudal de aire.','Verificar si el equipo está trabajando fuera de sus condiciones de diseño.'],
   ['Falta de alimentación de líquido','Mirar visor, recalentamiento, filtro, válvulas y línea de líquido.','Localizar la restricción o insuficiencia de alimentación antes de decidir una recarga.'],
   ['Válvula de expansión restringida o mal regulada','Comprobar escarcha localizada, bulbo y recalentamiento.','Revisar selección/ajuste por personal competente.'],
   ['Presostato de baja mal ajustado','Contrastar presiones reales con consigna y valores del fabricante.','Revisar protección sin anularla.']
  ],checks:['Comprobar si hay demanda y circulación de aire.','Medir aspiración y temperatura de saturación con el refrigerante correcto.','Calcular recalentamiento y observar visor.','Inspeccionar filtro, solenoide y válvula de expansión.','Revisar ajuste de presostato sin puentearlo.']
 },
 {
  id:'asp-alta',title:'Presión de aspiración demasiado alta',system:'compresor',severity:'media',symptoms:['aspiracion-alta','no-enfria','compresor-caliente'],summary:'La capacidad efectiva de compresión puede ser insuficiente frente a la carga.',pages:[18,23],
  causes:[
   ['Carga térmica excesiva','Comprobar carga de producto, puertas e infiltraciones.','Reducir carga anormal y verificar dimensionamiento.'],
   ['Compresor con capacidad insuficiente','Comparar capacidad prevista y demanda; verificar fases de funcionamiento.','Revisar selección y capacidad disponible.'],
   ['Platos de válvulas con fugas','Examinar comportamiento de presiones y temperaturas frente al manual.','Revisión mecánica especializada.'],
   ['Control de capacidad o válvula de desescarche con fuga','Inspeccionar secuencias y posiciones de control.','Revisar actuadores y válvulas.']
  ],checks:['Confirmar carga térmica real.','Registrar aspiración y descarga estabilizadas.','Revisar control de capacidad y posibles válvulas no estancas.']
 },
 {
  id:'descarga-alta',title:'Temperatura de descarga demasiado alta',system:'compresor',severity:'alta',symptoms:['descarga-caliente','compresor-caliente','presion-alta','presion-baja','no-enfria'],summary:'El compresor trabaja con condiciones térmicas desfavorables; hay riesgo de daño.',pages:[15,20],
  causes:[
   ['Condensación excesiva','Relacionar el problema con caudal y limpieza del condensador.','Resolver primero la causa de alta condensación.'],
   ['Aspiración demasiado baja / alimentación escasa','Medir aspiración, recalentamiento y comprobar aporte al evaporador.','Localizar desalimentación.'],
   ['Recalentamiento excesivo','Medir temperatura en salida del evaporador y temperatura de saturación.','Comprobar válvula de expansión y condiciones de carga.'],
   ['Fugas internas en válvulas del compresor','Comparar rendimiento y temperaturas con condiciones de diseño.','Evaluar reparación por servicio especializado.']
  ],checks:['Registrar temperatura real de descarga con sonda apta.','Medir alta y baja y asociarlas a refrigerante.','Comprobar recalentamiento y ventilación del condensador.']
 },
 {
  id:'descarga-baja',title:'Temperatura de descarga anormalmente baja',system:'compresor',severity:'alta',symptoms:['liquido-retorno','escarcha','oscilacion','no-enfria'],summary:'Descarga fría puede acompañar retorno de líquido o condensación demasiado baja.',pages:[15],
  causes:[
   ['Arrastre de líquido hacia aspiración','Comprobar escarcha en aspiración, recalentamiento y posición del bulbo.','Proteger el compresor y revisar expansión.'],
   ['Presión de condensación baja','Comparar presión y temperatura de condensación.','Revisar control de condensación.']
  ],checks:['Verificar riesgo de líquido antes de mantener servicio.','Medir recalentamiento y revisar el bulbo.','Comprobar condensación.']
 },
 {
  id:'comp-no-arranca',title:'El compresor no arranca',system:'control',severity:'alta',symptoms:['no-arranca','no-enfria','paradas'],summary:'El fallo puede estar en alimentación, mando, protecciones o motor.',pages:[8,22,23],
  causes:[
   ['Tensión ausente, insuficiente o falta de fase','Comprobación eléctrica reglamentaria por personal capacitado.','Restablecer suministro tras localizar la causa.'],
   ['Fusible, contactor o circuito de control defectuoso','Revisar señal de mando y protecciones sin puentes.','Reparar elemento y causa del disparo.'],
   ['Presostato de alta/baja o protección de aceite activados','Leer alarma y valores reales antes de rearmar.','Resolver la condición que disparó la protección.'],
   ['Relé térmico, devanado o motor defectuoso','Consultar alarmas, corriente previa e historial.','Diagnóstico y reparación eléctrica especializada.'],
   ['Fallo de caudal o anticongelación en enfriadora','Comprobar bomba, interruptor de flujo, filtros y señal de seguridad.','Restablecer caudal seguro antes de arrancar.']
  ],checks:['Leer alarma/estado del controlador sin resetear repetidamente.','Confirmar demanda y permiso de marcha.','Verificar protecciones: alta, baja, aceite, caudal, térmico.','Comprobar alimentación y mando por personal autorizado.']
 },
 {
  id:'comp-alta-corta',title:'Parada por presostato de alta',system:'control',severity:'alta',symptoms:['paradas','presion-alta','no-enfria','oscilacion'],summary:'La protección de alta requiere comprobar la condición real antes de rearmar.',pages:[20,22],
  causes:[
   ['Condensación excesiva real','Inspeccionar ventilación, suciedad, caudal de agua y ambiente.','Eliminar la causa de alta presión.'],
   ['Presostato defectuoso o ajuste incompatible','Contrastar presión real y consignas homologadas.','Sustituir o ajustar según manual y habilitación.']
  ],checks:['Consultar código de parada y lectura de alta.','Comprobar ventiladores o caudal de agua.','Verificar estado y ajuste del presostato sin anular protecciones.']
 },
 {
  id:'comp-baja-corta',title:'Parada por presostato de baja',system:'control',severity:'media',symptoms:['paradas','presion-baja','no-enfria','oscilacion'],summary:'Puede haber baja aspiración real, control de capacidad inadecuado o ajuste erróneo.',pages:[19,20,23],
  causes:[
   ['Poco aporte de refrigerante al evaporador','Comprobar filtro, válvulas, expansión y visor.','Localizar motivo de la baja aspiración.'],
   ['Carga baja frente a capacidad del compresor','Comparar demanda con escalonamiento y control.','Revisar regulación de capacidad.'],
   ['Ajuste/avería de presostato de baja','Contrastar lecturas reales y consignas.','Revisar protección sin puentearla.']
  ],checks:['Registrar presión justo antes de corte.','Inspeccionar visor, filtro y expansión.','Revisar demanda y escalonamiento.','Contrastar presostato con fabricante.']
 },
 {
  id:'comp-caliente',title:'Compresor excesivamente caliente',system:'compresor',severity:'alta',symptoms:['compresor-caliente','descarga-caliente','no-enfria','presion-alta'],summary:'Puede faltar refrigeración del motor o existir una relación de compresión excesiva.',pages:[20],
  causes:[
   ['Condensación alta','Comprobar disipación de calor.','Localizar causa en condensador.'],
   ['Poca alimentación o carga en evaporador','Medir aspiración, recalentamiento y temperaturas.','Revisar alimentación/condiciones de carga.'],
   ['Válvulas del compresor no estancas','Comparar capacidad y presiones con especificaciones.','Evaluación mecánica especializada.'],
   ['Motor sobrecargado','Revisar historial de consumo y protección.','Diagnóstico eléctrico seguro.']
  ],checks:['Registrar alta, baja y descarga.','Revisar condensador y demanda térmica.','Consultar límites térmicos de fabricante antes de continuar marcha.']
 },
 {
  id:'comp-frio',title:'Compresor anormalmente frío o escarchado',system:'compresor',severity:'critica',symptoms:['escarcha','liquido-retorno','no-enfria'],summary:'Puede indicar retorno de líquido, con riesgo de golpe y daño mecánico.',pages:[8,20],
  causes:[
   ['Recalentamiento insuficiente a la salida del evaporador','Medir saturación de evaporación y temperatura real en aspiración.','Revisar expansión y evitar entrada de líquido.'],
   ['Bulbo de la válvula de expansión mal situado','Inspeccionar fijación y contacto térmico del bulbo.','Corregir montaje según fabricante.']
  ],checks:['Valorar parada segura si hay indicios de líquido.','Medir recalentamiento.','Verificar bulbo, aislamiento y posición.']
 },
 {
  id:'comp-golpes',title:'Golpeteos en compresor',system:'compresor',severity:'critica',symptoms:['golpeteo','liquido-retorno','espuma','escarcha'],summary:'Golpes al arrancar o durante marcha pueden anunciar avería grave.',pages:[9,20],
  causes:[
   ['Golpe de líquido por retorno de refrigerante','Relacionar golpeteo con escarcha y recalentamiento insuficiente.','Detener y revisar retorno de líquido de forma segura.'],
   ['Refrigerante diluido en el aceite durante parada','Observar espuma en cárter al arranque y estado de calefactor.','Revisar migración y protección del cárter.'],
   ['Desgaste de cojinetes y piezas móviles','Relacionar ruido con vibración y antecedentes.','Inspección mecánica por especialista.']
  ],checks:['No mantener operación con golpeteo fuerte.','Comprobar escarcha y recalentamiento.','Observar estado del aceite y resistencia de cárter.','Registrar momento y tipo del ruido.']
 },
 {
  id:'comp-aceite-bajo',title:'Nivel de aceite bajo en cárter',system:'compresor',severity:'alta',symptoms:['aceite','paradas','compresor-caliente'],summary:'La falta de lubricación puede provocar desgaste y disparo de seguridad de aceite.',pages:[8,21],
  causes:[
   ['Carga de aceite insuficiente o aceite retenido en evaporador','Comprobar historial de servicio y condiciones de retorno.','Localizar causa de falta de aceite antes de reponer.'],
   ['Retorno deficiente por tuberías/pendientes','Revisar trazado de aspiración y condiciones de caudal.','Corregir retorno según proyecto.'],
   ['Separador de aceite o flotador atascado','Verificar retorno y estado del separador.','Revisión especializada.'],
   ['Desgaste interno o desequilibrio entre compresores paralelos','Comparar niveles y comportamiento entre unidades.','Evaluar elementos afectados.']
  ],checks:['Leer protección diferencial de aceite.','Ver nivel según condición de marcha prescrita.','Verificar retorno desde evaporador y separador.','No añadir aceite sin saber dónde está el existente.']
 },
 {
  id:'comp-aceite-alto',title:'Nivel de aceite demasiado alto',system:'compresor',severity:'alta',symptoms:['aceite','espuma','golpeteo'],summary:'El exceso aparente puede ser aceite sobrante o refrigerante absorbido en el cárter.',pages:[8,21],
  causes:[
   ['Exceso real de aceite','Comparar nivel con especificaciones y registro de carga.','Corrección por técnico competente.'],
   ['Refrigerante mezclado con aceite durante parada','Observar evolución del nivel/espuma al arranque y temperatura del cárter.','Verificar calefacción de cárter y migración.']
  ],checks:['Comprobar si el nivel varía entre parada y marcha.','Buscar espuma y temperatura anormal del cárter.','Revisar calefactor y antecedentes.']
 },
 {
  id:'comp-espuma-arranque',title:'Aceite con espuma al arrancar',system:'compresor',severity:'critica',symptoms:['espuma','aceite','golpeteo','liquido-retorno'],summary:'La migración de refrigerante hacia el aceite durante la parada puede causar golpes.',pages:[8,9,21],
  causes:[
   ['Cárter frío con refrigerante absorbido en aceite','Comprobar temperatura del cárter y estado de su calefactor.','Resolver migración de refrigerante y protección antes de operación.'],
   ['Separador de aceite demasiado frío','Observar condiciones del separador y retorno.','Revisar control térmico y elementos del retorno.']
  ],checks:['Registrar si ocurre solo después de horas parado.','Revisar funcionamiento de resistencia de cárter.','Comprobar nivel y espuma sin manipular circuito.']
 },
 {
  id:'comp-espuma-marcha',title:'Aceite con espuma en funcionamiento',system:'compresor',severity:'critica',symptoms:['espuma','aceite','liquido-retorno','escarcha','golpeteo'],summary:'Puede haber retorno de líquido o fallo del separador de aceite.',pages:[8,21],
  causes:[
   ['Líquido de evaporador llega al compresor','Medir recalentamiento y comprobar válvula de expansión.','Evitar retorno de líquido antes de continuar.'],
   ['Flotador/separador de aceite no cierra','Revisar su funcionamiento y condiciones de retorno.','Reparación especializada.']
  ],checks:['Priorizar integridad del compresor.','Comprobar aspiración y recalentamiento.','Revisar condiciones del separador.']
 },
 {
  id:'comp-aceite-oscuro',title:'Aceite descolorido o degradado',system:'compresor',severity:'alta',symptoms:['aceite','no-enfria','compresor-caliente'],summary:'Puede reflejar humedad, temperatura elevada, desgaste o contaminación previa.',pages:[21,22],
  causes:[
   ['Humedad o formación de ácidos','Comprobar indicador de humedad y pruebas de contaminación.','Plan de limpieza y recuperación conforme al fabricante.'],
   ['Temperatura de descarga elevada','Comprobar registro de temperaturas y causas térmicas.','Corregir calentamiento anómalo.'],
   ['Partículas por desgaste / motor quemado','Buscar historial de fallo y resultados de análisis de aceite.','Intervención profesional del sistema.']
  ],checks:['Revisar visor y señales de humedad.','Registrar descarga y estado del compresor.','No mezclar ni reemplazar fluidos sin diagnóstico.']
 },
 {
  id:'liquido-burbujas',title:'Burbujas en el visor de líquido',system:'liquido',severity:'media',symptoms:['burbujas','no-enfria','presion-baja','oscilacion'],summary:'Burbujas no significan automáticamente falta de gas: también puede haber pérdida de presión o subenfriamiento insuficiente.',pages:[6,16],
  causes:[
   ['Filtro secador parcialmente obstruido','Buscar diferencia térmica localizada entre entrada y salida.','Revisar y sustituir elemento si procede.'],
   ['Válvula solenoide/cierre parcialmente cerrada','Comprobar orden y estado real de las válvulas.','Solucionar restricción.'],
   ['Línea demasiado pequeña, larga, con curvas o desnivel','Consultar trazado y caída de presión prevista.','Evaluar dimensionamiento.'],
   ['Subenfriamiento insuficiente o ganancia de calor','Medir temperatura de líquido y saturación de alta.','Revisar condiciones de condensación y aislamiento.'],
   ['Carga de refrigerante insuficiente','Buscar fugas, revisar subenfriamiento y comprobar resto de causas.','Reparar fugas; carga solo por técnico habilitado y según placa.']
  ],checks:['Identificar el refrigerante antes de interpretar presiones.','Calcular subenfriamiento.','Comprobar si el filtro presenta salto térmico.','Revisar solenoide y válvulas de cierre.','No recargar solo por ver burbujas.']
 },
 {
  id:'liquido-filtro-frio',title:'Filtro secador frío, con rocío o escarcha',system:'liquido',severity:'media',symptoms:['filtro-frio','escarcha','burbujas','presion-baja','no-enfria'],summary:'Una caída anormal de presión puede producir enfriamiento en el filtro.',pages:[6,9,16],
  causes:[
   ['Filtro parcialmente bloqueado por suciedad','Comparar temperaturas de entrada y salida con equipo estabilizado.','Investigar contaminación y sustituir filtro según procedimiento.'],
   ['Elemento secador saturado de humedad o ácidos','Verificar humedad y posible contaminación.','Aplicar tratamiento específico por personal habilitado.']
  ],checks:['Inspeccionar si la escarcha aparece en el propio filtro.','Medir temperaturas antes y después.','Comprobar visor de humedad y estado de líquido.']
 },
 {
  id:'liquido-visor-amarillo',title:'Visor de humedad amarillo',system:'liquido',severity:'alta',symptoms:['visor-color','humedad','no-enfria'],summary:'El indicador puede señalar presencia de humedad; interpretar según su modelo y refrigerante.',pages:[6,16],
  causes:[
   ['Humedad dentro del sistema','Consultar escala y especificaciones del indicador instalado.','Comprobar causa de entrada de humedad, estado del secador y posibles ácidos.']
  ],checks:['Confirmar significado del color para ese visor.','Buscar antecedentes de apertura o fuga.','Revisar filtro secador y contaminación.']
 },
 {
  id:'liquido-visor-marron',title:'Visor marrón, oscuro o con partículas',system:'liquido',severity:'alta',symptoms:['visor-color','no-enfria','filtro-frio'],summary:'Puede existir contaminación que cause obstrucciones y desgaste.',pages:[6,16],
  causes:[
   ['Partículas e impurezas en el refrigerante','Inspeccionar el visor y antecedentes de reparación.','Diagnóstico y saneamiento profesional del circuito.'],
   ['Degradación del aceite / sistema','Relacionar con aceite descolorido y fallos anteriores.','Revisar secador y limpieza por personal habilitado.']
  ],checks:['Anotar color y presencia de partículas.','Comprobar filtro y aceite.','Investigar causa antes de sustituir componentes.']
 },
 {
  id:'liquido-solenoide',title:'Posible obstrucción o cierre de solenoide',system:'liquido',severity:'media',symptoms:['presion-baja','burbujas','no-enfria','paradas'],summary:'La válvula cerrada o agarrotada puede impedir la alimentación del evaporador.',pages:[6,9,16],
  causes:[
   ['Sin orden eléctrica de apertura','Revisar demanda y señal del controlador.','Resolver fallo de mando.'],
   ['Válvula agarrotada o apertura parcial','Inspeccionar diferencia de temperatura antes/después y comportamiento.','Revisar actuador/elemento según procedimiento.'],
   ['Válvula de cierre manual no abierta','Verificar posición nominal de la línea.','Restituir posición solo tras comprobar condiciones seguras.']
  ],checks:['Consultar demanda de frío y señal de solenoide.','Observar temperaturas a ambos lados.','Comprobar presiones antes de intervenir.']
 },
 {
  id:'liquido-linea',title:'Pérdida de carga en línea de líquido',system:'liquido',severity:'media',symptoms:['burbujas','presion-baja','no-enfria','oscilacion'],summary:'Tuberías, curvas, válvulas y accesorios pueden provocar vaporización prematura.',pages:[6,16],
  causes:[
   ['Diámetro insuficiente o línea demasiado larga','Revisar diámetro real, longitud y carga.','Evaluar redimensionamiento.'],
   ['Codos muy cerrados, aplastamientos o desniveles','Inspección visual y trazado.','Corregir elementos restrictivos.'],
   ['Calor excesivo alrededor de la línea','Medir entorno y líquido.','Revisar aislamiento/recorrido.']
  ],checks:['Inspeccionar trazado y deformaciones.','Calcular subenfriamiento con equipo estable.','Revisar diferencias térmicas en accesorios.']
 },
 {
  id:'receptor-bajo',title:'Nivel bajo en recipiente de líquido',system:'liquido',severity:'media',symptoms:['burbujas','no-enfria','presion-baja'],summary:'Un nivel bajo puede deberse a carga insuficiente o redistribución de refrigerante.',pages:[6,15],
  causes:[
   ['Posible falta de refrigerante','Buscar indicios de fuga y evaluar datos termodinámicos.','Corregir fugas y verificar carga conforme a placa.'],
   ['Líquido retenido en evaporador o condensador','Comprobar carga térmica y control de condensación.','Resolver mala distribución.'],
   ['Válvula de expansión desajustada','Evaluar recalentamiento y posición del bulbo.','Revisión de expansión.']
  ],checks:['Revisar condiciones de funcionamiento y posición de recipiente.','Observar visor, subenfriamiento y posibles fugas.','No inferir carga solo por nivel.']
 },
 {
  id:'receptor-alto',title:'Nivel excesivo en recipiente de líquido',system:'liquido',severity:'media',symptoms:['no-enfria','burbujas','presion-alta'],summary:'Puede haber exceso de carga, obstrucción aguas abajo o fallo de expansión.',pages:[6,15],
  causes:[
   ['Demasiada carga de refrigerante','Cruzar niveles, presión y registro de carga.','Intervenir según carga nominal y requisitos legales.'],
   ['Obstrucción en línea de líquido','Comprobar filtro y válvulas.','Localizar restricción.'],
   ['Alimentación insuficiente por expansión','Comprobar recalentamiento y válvula.','Revisar dimensionamiento/función.']
  ],checks:['Valorar rendimiento junto al nivel.','Revisar línea de líquido y expansión.','Consultar placa y datos de puesta en marcha.']
 },
 {
  id:'evap-hielo-total',title:'Evaporador bloqueado por escarcha',system:'evaporador',severity:'media',symptoms:['escarcha','no-enfria','presion-baja','humedad'],summary:'La acumulación de hielo dificulta el intercambio y restringe el paso de aire.',pages:[7,17],
  causes:[
   ['Desescarche inexistente o ineficaz','Consultar secuencia, sondas, duración y final de desescarche.','Corregir estrategia conforme al fabricante.'],
   ['Exceso de humedad entrando en la cámara','Comprobar juntas, puertas abiertas y producto sin embalar.','Reducir infiltración.'],
   ['Ventilación deficiente','Comprobar ventiladores y obstrucciones de batería.','Restablecer caudal de aire.']
  ],checks:['Fotografiar patrón de hielo.','Verificar ventiladores.','Revisar histórico de desescarches.','Comprobar juntas, puertas y carga húmeda.']
 },
 {
  id:'evap-hielo-entrada',title:'Escarcha solo en entrada del evaporador',system:'evaporador',severity:'media',symptoms:['escarcha','no-enfria','presion-baja','burbujas'],summary:'Escarcha localizada cerca de expansión sugiere evaporador mal alimentado.',pages:[7,17],
  causes:[
   ['Válvula de expansión restringida','Comprobar recalentamiento, bulbo, tamiz y orificio.','Diagnosticar y corregir expansión.'],
   ['Hielo o suciedad en filtro/orificio','Buscar variación de funcionamiento y temperatura puntual.','Investigar humedad o partículas.'],
   ['Vapor en línea de líquido','Comprobar visor, secador y subenfriamiento.','Resolver origen antes de tocar la expansión.']
  ],checks:['Comprobar si resto de batería permanece seca.','Medir recalentamiento.','Comprobar visor y filtro.','Inspeccionar bulbo sin alterar ajuste todavía.']
 },
 {
  id:'evap-ventilador',title:'Ventilador del evaporador parado',system:'evaporador',severity:'media',symptoms:['ventilador','escarcha','no-enfria','presion-baja'],summary:'Sin caudal de aire puede bajar la presión y acumularse escarcha.',pages:[7],
  causes:[
   ['Motor o su protección defectuosos','Verificar orden, alarma y protección.','Reparación eléctrica reglamentaria.'],
   ['Aspas dañadas o aletas obstruidas','Inspección mecánica con parada asegurada.','Reparación o limpieza.'],
   ['Orden de control interrumpida','Revisar lógica de desescarche y contacto de puerta.','Corregir control si procede.']
  ],checks:['Confirmar que el equipo debería ventilar en ese momento.','Comprobar alarma y estado de protecciones.','Inspeccionar obstrucciones con ventiladores inmovilizados.']
 },
 {
  id:'evap-retorno',title:'Riesgo de retorno de líquido al compresor',system:'evaporador',severity:'critica',symptoms:['liquido-retorno','escarcha','golpeteo','espuma'],summary:'Recalentamiento insuficiente o bulbo mal montado pueden provocar arrastre de líquido.',pages:[7,8,20],
  causes:[
   ['Bulbo mal sujeto o sin contacto con tubería','Comprobar sujeción, posición y aislamiento.','Corregir instalación según fabricante.'],
   ['Válvula de expansión alimenta en exceso','Evaluar recalentamiento bajo y condiciones de carga.','Ajuste profesional según instrucciones.'],
   ['Carga térmica baja o control inadecuado','Revisar demanda, aire y capacidad.','Corregir condiciones de control.']
  ],checks:['Valorar parada para proteger compresor.','Medir recalentamiento.','Inspeccionar bulbo y posición.','Verificar carga térmica.']
 },
 {
  id:'evap-aletas',title:'Aletas del evaporador deformadas',system:'evaporador',severity:'baja',symptoms:['no-enfria','presion-baja'],summary:'Una batería dañada reduce caudal e intercambio.',pages:[7,17],
  causes:[
   ['Golpe o manipulación de la batería','Observar zonas deformadas y obstrucción de paso.','Recuperar geometría con herramienta adecuada y procedimiento seguro.']
  ],checks:['Inspeccionar estado de aletas.','Comprobar si ventilación está comprometida.']
 },
 {
  id:'cam-caliente',title:'Cámara por encima de consigna',system:'camara',severity:'media',symptoms:['camara-caliente','no-enfria','presion-baja','escarcha'],summary:'Puede combinar problemas de carga, aislamiento, control o capacidad de frío.',pages:[18],
  causes:[
   ['Termostato/sonda incorrecta','Comparar lectura con termómetro y consigna.','Revisar sonda, ajuste y controlador.'],
   ['Carga térmica excesiva o puertas abiertas','Comprobar entradas de producto caliente, tráfico y juntas.','Reducir infiltración/carga indebida.'],
   ['Evaporador pequeño, helado o mal alimentado','Revisar batería, ventilación, escarcha y recalentamiento.','Resolver fallo de intercambio/alimentación.'],
   ['Compresor insuficiente o con rendimiento anómalo','Comprobar etapas activas y presiones.','Revisar capacidad efectiva.']
  ],checks:['Contrastar consigna con termómetro independiente.','Comprobar puertas y carga térmica.','Verificar ventilación/desescarche.','Relacionar con presiones y refrigerante.']
 },
 {
  id:'cam-fria',title:'Cámara por debajo de consigna',system:'camara',severity:'media',symptoms:['camara-fria','oscilacion'],summary:'La regulación de temperatura puede estar dando orden de frío de más.',pages:[18],
  causes:[
   ['Termostato con consigna muy baja','Revisar ajuste y diferencial.','Corregir parámetros conforme a uso.'],
   ['Sonda/bulbo mal colocado','Comparar lectura con medida independiente.','Reubicar o reparar según fabricante.'],
   ['Control de parada ineficaz','Comprobar si mantiene demanda cuando debe parar.','Revisar salida de mando.']
  ],checks:['Medir temperatura real.','Comparar consigna/lectura.','Verificar orden de marcha y paro.']
 },
 {
  id:'cam-humedad-alta',title:'Humedad relativa excesiva en cámara',system:'camara',severity:'baja',symptoms:['humedad','oscilacion'],summary:'El evaporador y su tiempo de operación condicionan la deshumidificación.',pages:[9,17],
  causes:[
   ['Evaporador sobredimensionado o carga muy baja','Observar ciclos cortos y humedad.','Evaluar dimensionamiento y regulación.'],
   ['Entrada de humedad por puertas/producto','Inspeccionar infiltraciones y uso.','Mejorar cierre y organización.']
  ],checks:['Medir temperatura y humedad.','Registrar tiempos de marcha.','Comprobar puertas y producto.']
 },
 {
  id:'cam-humedad-baja',title:'Humedad relativa demasiado baja',system:'camara',severity:'baja',symptoms:['humedad','no-enfria'],summary:'Puede favorecer desecación de productos y pérdidas de calidad.',pages:[8,17],
  causes:[
   ['Evaporador pequeño con muchos tiempos de marcha','Observar tiempos y temperaturas de evaporación.','Evaluar dimensionamiento.'],
   ['Aislamiento pobre o cargas internas altas','Comprobar cerramientos, alumbrado y ventiladores.','Reducir ganancias térmicas.']
  ],checks:['Registrar humedad real.','Comprobar aislamiento y consumos internos.','Revisar ciclos de marcha.']
 },
 {
  id:'cam-seguridad',title:'Alarma o puertas de cámara inseguras',system:'camara',severity:'critica',symptoms:['no-enfria','paradas'],summary:'Los cierres, avisos y mecanismos de salida son elementos de seguridad de las personas.',pages:[8,9],
  causes:[
   ['Indicadores, alarma o mecanismo de apertura defectuosos','Inspeccionar dispositivos con protocolo de seguridad.','Corregir inmediatamente antes de usar la cámara.'],
   ['Puerta con cierre o estanqueidad defectuosos','Comprobar cierre, desbloqueo y juntas.','Reparar y señalizar el riesgo.']
  ],checks:['No permitir presencia de personal encerrado.','Verificar alarma y apertura de emergencia.','Comprobar aviso visible y funcionamiento.']
 },
 {
  id:'general-fuga',title:'Manchas de aceite · posible fuga',system:'liquido',severity:'alta',symptoms:['fuga','no-enfria','burbujas','presion-baja'],summary:'El aceite en conexiones puede acompañar una fuga de refrigerante; no la confirma por sí solo.',pages:[8,15],
  causes:[
   ['Posible fuga en unión o componente','Inspeccionar zona y usar método de detección autorizado.','Localizar y reparar por personal habilitado; verificar estanqueidad.']
  ],checks:['Registrar ubicación y fotografía.','No tocar/aflojar conexiones presurizadas.','Aplicar protocolo de detección con equipos adecuados.']
 },
 {
  id:'general-electric',title:'Fusibles fundidos o protección de motor',system:'control',severity:'alta',symptoms:['no-arranca','paradas','ventilador','no-enfria'],summary:'Una sobrecarga o cortocircuito puede dejar fuera de servicio el equipo.',pages:[8,22],
  causes:[
   ['Sobrecarga, cortocircuito o pérdida de fase','Consultar disparo y comprobar alimentación por procedimiento eléctrico seguro.','Reparar la causa antes de reemplazar protección.'],
   ['Motor o contactor defectuoso','Revisar señales y estado de componentes.','Reparar por personal competente.']
  ],checks:['No aumentar calibre de protección ni puentearla.','Asegurar equipo y verificar ausencia de tensión según protocolo.','Investigar origen antes de rearme.']
 },
 {
  id:'expansion-bulbo',title:'Bulbo de válvula de expansión mal fijado',system:'liquido',severity:'alta',symptoms:['liquido-retorno','escarcha','presion-baja','no-enfria'],summary:'El bulbo sin buen contacto puede dar control errático de la alimentación.',pages:[7,18],
  causes:[
   ['Bulbo suelto, mal posicionado o en corriente de aire','Comprobar contacto completo, sujeción y ubicación.','Montar según instrucciones concretas del fabricante.'],
   ['Igualación externa ausente donde se necesita','Verificar tipo de válvula y conexión de igualación.','Revisar compatibilidad y montaje.']
  ],checks:['Inspección visual del bulbo sin modificar ajuste.','Comprobar recalentamiento.','Confirmar tipo de válvula e igualación.']
 },
 {
  id:'asp-escarcha',title:'Escarcha intensa en aspiración',system:'compresor',severity:'critica',symptoms:['escarcha','liquido-retorno','golpeteo'],summary:'Puede implicar recalentamiento demasiado bajo y retorno de refrigerante líquido.',pages:[8],
  causes:[
   ['Recalentamiento insuficiente','Medir temperatura y saturación de aspiración.','Revisar expansión y carga térmica evitando golpes de líquido.'],
   ['Regulador en aspiración alterando condiciones','Inspeccionar escarcha antes/después del regulador y datos de diseño.','Revisar regulación apropiada.']
  ],checks:['Buscar golpeteos y espuma en cárter.','Calcular recalentamiento.','Verificar expansión y reguladores.']
 },
 {
  id:'agua-sin-caudal',title:'Falta de caudal en enfriadora',system:'agua',severity:'alta',symptoms:['caudal','no-arranca','paradas','no-enfria','presion-baja'],summary:'Sin circulación de agua puede actuar el interruptor de flujo o la anticongelación.',pages:[22],
  causes:[
   ['Bomba parada o averiada','Verificar orden, protección y circulación.','Resolver avería hidráulica/eléctrica.'],
   ['Filtro de agua obstruido o válvula cerrada','Comprobar indicios de pérdida de carga y posiciones.','Restablecer el caudal de proyecto.'],
   ['Protección de flujo o anticongelación activa','Leer alarma y comparar temperaturas y caudal.','Investigar la causa antes de rearmar.']
  ],checks:['Leer estado de presostato/interruptor de flujo.','Confirmar bomba en marcha y válvulas.','Medir entrada/salida de agua si es seguro.','No anular seguridades de anticongelación.']
 },
 {
  id:'comp-marcha-cont',title:'Compresor no para y no alcanza temperatura',system:'compresor',severity:'media',symptoms:['no-enfria','camara-caliente','aspiracion-alta','presion-baja'],summary:'La causa puede ser falta de capacidad real o demanda que supera el diseño.',pages:[18,23],
  causes:[
   ['Carga térmica o infiltración excesiva','Revisar uso, puertas y temperaturas.','Reducir carga excesiva.'],
   ['Compresor sin capacidad suficiente / válvulas con fugas','Relacionar presiones con funcionamiento sostenido.','Comprobar capacidad y estado interno.'],
   ['Evaporador mal alimentado','Revisar recalentamiento, visor y filtro.','Corregir suministro de refrigerante.'],
   ['Presostato de baja defectuoso','Comparar corte y lectura real.','Diagnóstico del control.']
  ],checks:['Confirmar que control solicita frío continuamente.','Tomar temperatura de cámara y demanda.','Registrar presiones y temperaturas.','Comprobar ventilación y caudal.']
 }
];