# Fantasy Atleti ⚽️🔥

Aplicación web para crear alineaciones de jugadores del Atlético de Madrid con un presupuesto limitado.
Frontend en React + Vite, backend simulado con JSON Server, todo desplegable vía Docker.

- TECNOLOGÍAS UTILIZADAS
- REQUISITOS
- INSTALACIÓN Y EJECUCIÓN EN DOCKER
- EJECUCIÓN SIN DOCKER
- ESTRUCTURA DEL PROYECTO
- FUNCIONALIDAD PRINCIPAL
- LOGIN
- FUNCIONALIDAD EXPLICADA
- NOTAS ADICIONALES

## 🚀 Tecnologías utilizadas

- React + Vite
- JSON Server (mock API)
- Docker + Docker Compose
- CSS personalizado


## Requisitos

Docker y Docker Compose instalados

Navegador moderno (Chrome, Edge, Firefox…)

Opcional si no usas Docker: Node.js >=18 para ejecutar Vite y JSON Server localmente.


## 📦 Instalación y ejecución en Docker

Docker y Docker Compose instalados

Navegador moderno (Chrome, Edge, Firefox…)

Opcional si no usas Docker: Node.js >=18 para ejecutar Vite y JSON Server localmente.


INSTALACIÓN Y EJECUCIÓN EN DOCKER

Clonar el repositorio:

git clone https://github.com/JPalos21/Portafolio.git
cd fantasy-atleti


Levantar los contenedores:

docker-compose up --build


Abrir en el navegador:

Frontend: http://localhost:5173

API JSON Server: http://localhost:3000

El JSON Server sirve los endpoints: /jugadores, /usuarios y /alineaciones.

Para parar los contenedores:

docker-compose down

o pararlos desde Docker Desktop


## Ejecución sin docker (opcional)

Instalar dependencias:

cd frontend
npm install


Levantar JSON Server:

npx json-server ./public/data.json


Levantar frontend:

npm run dev

Frontend en http://localhost:5173, backend en http://localhost:3000.


## Estructura del proyecto

frontend/ – Código React + Vite

frontend/public/data.json – Base de datos simulada

Dockerfile – Imagen del frontend

docker-compose.yml – Orquestación de frontend + JSON Server


## Funcionalidad principal

Con un presupuesto limitado crear una alineación de 11 jugadores nunca gastando más de lo permitido. Además se pueden guardar alineaciones y borrarlas. También se pueden editar y eliminar jugadores.

Visualizar presupuesto restante y jugadores en la alineación

Acceso a historial de alineaciones


## Login

👤 Usuarios por defecto

Usuario	Contraseña
javi	123
admin	admin123

Puedes crear un usuario nuevo en el login e iniciar sesión a continuación. Si no quieres puedes acceder con un usuario precreado llamado javi con contraseña 123
También puedes acceder como administrador con el usuario admin y contraseña admin123


## Funcionalidad explicada

Una vez iniciada sesión como usuario normal podemos ir añadiendo jugadores hasta un máximo de 11. Hay un máximo de 1 portero, 4 defensas, 3 centrocampistas y 3 delanteros. Puedes llevar el seguimiento del número de jugadores desplegando la lista haciendo click en el carrito de la compra derecho. Vienen acompañados de un botón para borrar todos los jugadores de una posición en caso de que fuese necesario.

Si únicamente necesitas borrar un jugador puedes ir a la zona de "Mi alineación" donde puedes observar los detalles de cada jugador haciendo click en él o borrarlo de tu alineación. En caso de que ya tengas la plantilla completa y quieras enviarla le puedes poner un nombre a tu alineación, que por defecto llevará tu nombre de usuario como entrenador.

Podrás visualizar todas las alineaciones de todos los entrenadores y borrarlas desde "Alineaciones".

***Hay una funcionalidad secreta y es que puedes añadir más dinero a tu presupuesto si haces click en el escudo del Atleti***

En caso de iniciar sesión como admin puedes acceder a la zona llamada "Admin" en la que podrás filtrar los jugadores según su posición y modificar su información y precio, o directamente borrarlos. Esta zona que se encuentra en /admin no se puede acceder por ruta en caso de que sea un usuario normal.


## Notas adicionales

Para un correcto funcionamiento, asegúrate de borrar la caché del navegador si realizas cambios en data.json.

Los usuarios y contraseñas están encriptados en data.json usando bcrypt.

Se ha testeado tanto en Windows como Linux, usando Docker o ejecución local de Node.js + JSON Server.

Asegúrate de que se puede escuchar en los puertos 5173 y 3000.