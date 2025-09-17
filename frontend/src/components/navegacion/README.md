# Navegación - Cartelera Morelos

Este directorio contiene componentes de navegación reutilizables para la aplicación Cartelera Morelos. Estos componentes facilitan la navegación del usuario a través de la aplicación y proporcionan una experiencia de usuario coherente.

## Componentes de Navegación

### NavSidebar

Barra lateral de navegación principal que muestra las secciones principales de la aplicación. Incluye soporte para submenús y resalta la sección activa.

**Características:**
- Navegación jerárquica con secciones y subsecciones
- Indicador visual de la sección activa
- Submenús expandibles/colapsables
- Iconos para cada sección
- Visible solo en pantallas medianas y grandes

### NavMobile

Menú de navegación para dispositivos móviles que se muestra como un menú desplegable. Contiene las mismas opciones que NavSidebar pero optimizado para pantallas pequeñas.

**Características:**
- Botón de hamburguesa para abrir/cerrar el menú
- Overlay para cerrar el menú al hacer clic fuera
- Animación de apertura/cierre
- Submenús expandibles/colapsables

### NavBreadcrumbs

Migas de pan que muestran la ruta de navegación actual y permiten navegar rápidamente a niveles superiores.

**Características:**
- Generación automática basada en la ruta actual
- Nombres amigables para las rutas
- Soporte para rutas dinámicas (IDs)
- Menú desplegable de navegación rápida
- Soporte para tema oscuro

### NavTabs

Pestañas de navegación horizontales para cambiar entre vistas relacionadas.

**Características:**
- Indicador visual de la pestaña activa
- Soporte para iconos
- Soporte para contadores

### NavTabsMobile

Versión responsive de NavTabs que se convierte en un menú desplegable en pantallas pequeñas.

**Características:**
- Pestañas horizontales en pantallas medianas y grandes
- Menú desplegable en pantallas pequeñas
- Indicador visual de la pestaña activa
- Soporte para iconos y contadores

### NavStepper

Navegación por pasos para procesos de múltiples etapas como formularios o flujos de trabajo.

**Características:**
- Indicador visual del paso actual
- Botones para avanzar/retroceder
- Personalizable con descripciones para cada paso
- Eventos para controlar la navegación

### NavDropdown

Menú desplegable para mostrar opciones en un espacio reducido.

**Características:**
- Posicionamiento configurable (izquierda, derecha)
- Soporte para iconos
- Soporte para divisores
- Eventos para controlar las acciones

### NavContextMenu

Menú contextual que se puede mostrar en cualquier posición, útil para acciones contextuales.

**Características:**
- Posicionamiento configurable
- Soporte para iconos
- Soporte para divisores
- Opciones peligrosas (en rojo)
- Eventos para controlar las acciones

## Mapa de Navegación

### Descripción

El Mapa de Navegación es una herramienta visual que muestra la estructura completa del sistema Cartelera Morelos, permitiendo a los usuarios entender la organización de los diferentes módulos y cómo navegar entre ellos. Este componente ofrece múltiples vistas para visualizar la estructura del sistema desde diferentes perspectivas.

## Características

- **Múltiples vistas**: Módulos, Árbol y Flujo
- **Modo oscuro/claro**: Adaptable a las preferencias del usuario
- **Leyenda interactiva**: Explicación de iconos, colores y conexiones
- **Exportación**: Capacidad para exportar el mapa como PNG o PDF
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla

## Vistas disponibles

### Vista de Módulos

Muestra todos los módulos del sistema como tarjetas independientes, cada una con su icono, nombre, descripción y páginas relacionadas. Esta vista es ideal para tener una visión general de las funcionalidades disponibles.

### Vista de Árbol

Muestra la estructura jerárquica del sistema, con el módulo de inicio como raíz y los demás módulos como ramas. Esta vista es útil para entender las relaciones de dependencia entre los diferentes módulos.

### Vista de Flujo

Muestra los principales flujos de navegación del sistema, como el flujo de gestión de actividades, el flujo de renta publicitaria y el flujo de usuario. Esta vista es ideal para entender los procesos típicos que los usuarios realizan en el sistema.

## Cómo usar

1. Accede al mapa de navegación desde el menú lateral
2. Selecciona la vista que deseas visualizar (Módulos, Árbol o Flujo)
3. Opcionalmente, activa la leyenda para entender los iconos y colores
4. Cambia entre modo claro y oscuro según tus preferencias
5. Exporta el mapa como PNG o PDF si necesitas compartirlo o guardarlo

## Componentes

### MapaNavegacion.vue

Componente principal que integra todas las vistas y funcionalidades del mapa de navegación.

### LeyendaMapa.vue

Componente que muestra una leyenda explicativa de los iconos, colores y conexiones utilizados en el mapa.

### MapaNavegacionPage.vue

Página que integra el componente de mapa de navegación en el router de la aplicación.

## Estilos

Los estilos del mapa de navegación se encuentran en el archivo `mapa-navegacion.css` en la carpeta `assets/css`. Este archivo incluye estilos para las diferentes vistas, temas y elementos del mapa.

## Integración con el router

El mapa de navegación está integrado en el router de la aplicación y es accesible desde la ruta `/mapa-navegacion`.

## Mantenimiento

Cuando se añadan nuevos módulos o funcionalidades al sistema, es importante actualizar el mapa de navegación para reflejar estos cambios. Esto implica:

1. Añadir el nuevo módulo a la lista de módulos en `MapaNavegacion.vue`
2. Actualizar los flujos si el nuevo módulo forma parte de algún flujo existente o crea uno nuevo
3. Actualizar la leyenda si se añaden nuevos iconos o colores

## Futuras mejoras

- Implementar la exportación real a PNG y PDF utilizando bibliotecas como html2canvas y jsPDF
- Añadir animaciones para mostrar los flujos de navegación
- Implementar zoom y pan para facilitar la navegación en mapas complejos
- Añadir filtros para mostrar solo ciertos tipos de módulos o conexiones