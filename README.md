# 🎵 Metrónomo Online

Metrónomo web interactivo desarrollado en React con Web Audio API. Herramienta precisa y minimalista para músicos y estudiantes de música.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Demo en vivo

[Ver demo](https://tu-usuario.github.io/metronomo) _(actualiza con tu URL de deployment)_

## ✨ Funcionalidades v1.0 (Actual)

### Características implementadas:
- ✅ **Control de tempo (BPM)**: Ajustable de 40 a 240 BPM mediante slider
- ✅ **Reproducción/Pausa**: Control simple de inicio y detención
- ✅ **Sonido preciso**: Generación de audio mediante Web Audio API
- ✅ **Indicador visual**: Animación de pulso sincronizada con el beat
- ✅ **Contador de beats**: Visualización del número de beats transcurridos
- ✅ **Diseño responsive**: Interfaz adaptable a diferentes dispositivos
- ✅ **UI moderna**: Diseño limpio con modo oscuro

### Tecnologías utilizadas:
- React 19.2.0 con Hooks (useState, useEffect, useRef)
- Web Audio API para síntesis de sonido
- CSS3 con animaciones y transiciones
- Vite 7.2.2 como bundler y dev server

## 📋 Roadmap

### 🎯 v2.0 - Funcionalidades Avanzadas (Próxima versión)

- [ ] **Compases personalizables**
  - Selector de time signature (2/4, 3/4, 4/4, 5/4, 6/8, 7/8)
  - Acentuación automática del primer beat
  
- [ ] **Variedad de sonidos**
  - Click clásico
  - Wood block
  - Cowbell
  - Beep electrónico
  
- [ ] **Subdivisiones rítmicas**
  - Negras (♩)
  - Corcheas (♪)
  - Tresillos (♪₃)
  - Semicorcheas (♬)
  
- [ ] **Tap Tempo**
  - Detección de BPM tapeando el ritmo
  - Promedio de múltiples taps para mayor precisión
  
- [ ] **Sistema de Presets**
  - Guardar configuraciones favoritas
  - Gestión de presets (crear, cargar, eliminar)
  - Persistencia en localStorage

- [ ] **Mejoras visuales**
  - Indicador visual de beats por compás
  - Distinción visual del beat acentuado
  - Animaciones mejoradas

### 🔮 v3.0 - Características Premium (Futuro)

- [ ] **Patrones rítmicos avanzados**
  - Creador de patrones personalizados
  - Biblioteca de patrones predefinidos (jazz, rock, latin, etc.)
  - Acentos personalizables por beat
  
- [ ] **Modos de práctica**
  - Modo entrenamiento: tempo gradual incremental/decremental
  - Modo aleatorio: cambios de tempo automáticos
  - Temporizador de práctica con alarmas
  
- [ ] **Funciones profesionales**
  - Sincronización MIDI
  - Click de entrada (count-in)
  - Polirritmias y métricas complejas
  - Exportar/importar configuraciones
  
- [ ] **Personalización avanzada**
  - Temas personalizables
  - Configuración de volumen independiente
  - Balance entre beat acentuado y beats normales
  
- [ ] **Características colaborativas**
  - Compartir configuraciones por URL
  - Modo sincronizado para ensayos en grupo
  
- [ ] **PWA (Progressive Web App)**
  - Instalable como aplicación
  - Funcionalidad offline completa
  - Notificaciones push para recordatorios de práctica

## 🛠️ Instalación y desarrollo

### Requisitos previos
- Node.js 16+ 
- npm o yarn

### Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/metronomo.git
cd metronomo
```

### Instalar dependencias
```bash
npm install
```

### Iniciar servidor de desarrollo
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173/`

### Build para producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

## 📁 Estructura del proyecto

```
metronomo/
├── src/
│   ├── App.jsx          # Componente principal del metrónomo
│   ├── App.css          # Estilos del componente
│   ├── main.jsx         # Punto de entrada de React
│   └── index.css        # Estilos globales
├── public/              # Archivos estáticos
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
└── README.md           # Este archivo
```

## 🎮 Uso

1. **Ajustar tempo**: Usa el slider para seleccionar el BPM deseado (40-240)
2. **Iniciar**: Haz click en el botón "▶ Iniciar" para comenzar el metrónomo
3. **Observar**: El indicador visual pulsará en cada beat
4. **Pausar**: Haz click en "⏸ Pausar" para detener

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- Inspirado en metrónomos clásicos y herramientas modernas de práctica musical
- Web Audio API por proporcionar síntesis de audio precisa en el navegador
- Comunidad de React por las excelentes herramientas y recursos

## 📈 Estado del proyecto

🟢 **Activamente mantenido** - v1.0 estable, v2.0 en desarrollo

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub
