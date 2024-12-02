
Plan de Desarrollo del Proyecto

Configurar el entorno de desarrollo:
Instalar Node.js y npm.
Crear un proyecto React para el frontend.
Configurar un servidor backend con Node.js y Express.
Configurar SQLite para la base de datos.

Desarrollar el Frontend:
Crear la estructura del proyecto React.
Implementar la landing page.
Crear componentes para:
login
lista de productos
detalle de producto
administración de productos.

Desarrollar el Backend:
Configurar el servidor Express.
Crear rutas para manejar las solicitudes de frontend.
Conectar con la base de datos SQLite.
Implementar la lógica de autenticación y CRUD para productos.
Hasheado de la contraseña
npm install bcrypt


Integrar Frontend y Backend:
Configurar las llamadas API desde el frontend al backend.
Probar la funcionalidad completa localmente.
Agregar .env a .gitignore: Para no subir el archivo .env al repositorio para proteger información sensible

Administrar el Backend:
Para permitir a los administradores gestionar:
las tablas products, users y search_history,
Se deben crear endpoints RESTful en el backend que brinden soporte a las operaciones CRUD:
Crear
Leer
Actualizar
Eliminar
Crear interfaces en el frontend para interactuar con estas funcionalidades.

Desplegar en Azure:
Crear una cuenta de estudiante en Azure. 
Configurar un servicio de App Service para el frontend.
Configurar una base de datos SQLite en Azure.
Desplegar el backend en Azure.



Creación y Ejecución del Proyecto



Configuración del Proyecto
cd supermarket-virtual-de-menestras-ecommerce
cd ecommerce-backend
Instalar Node.js, npm y librerías necesarias:
brew install node
npm install express sqlite3 cors body-parser
npm install dotenv  # para cargar las variables de entorno en la app
crear el archivo .env
PORT=3001
DB_PATH=./database.sqlite
ADMIN_PASSWORD=Password5!

Crear un proyecto React:
cd supermarket-virtual-de-menestras-ecommerce
cd ecommerce-frontend
crear el archivo .env
REACT_APP_API_URL=http://localhost:3001/api


Configurar el servidor backend:

cd ecommerce-backend
npm init -y
.env

Desarrollar el código para el Frontend
App.js
Componentes:
LandingPage.js
ProductList.js
Register.js
Login.js
.env

Desarrollar el código para el Backend    
server.js
Crear o utilizar la base de datos
database.sqlite
Crear o utilizar las tablas necesarias

Integrar Frontend y Backend
Llamada API desde React:
GET, POST

Desplegar en Azure
Desplegar el frontend:
npm run build
az webapp up --name ecommerce-frontend --resource-group myResourceGroup --plan myAppServicePlan
Desplegar el backend:
az webapp up --name ecommerce-backend --resource-group myResourceGroup --plan myAppServicePlan
