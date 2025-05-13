# 🧠 Backend - ProjectZen  - API REST para Gestión de Proyectos Grupales

Este repositorio contiene el backend de **ProjectZen**, una plataforma completa para la gestión colaborativa de proyectos. Expone una API REST robusta que permite manejar autenticación, usuarios, proyectos, tareas, reportes, notificaciones por correo, y más.

## 🧱 Tecnologías utilizadas

- ⚙️ **[NestJS](https://nestjs.com/)**: Framework de Node.js para construir aplicaciones backend escalables y mantenibles.
- 🗃️ **[TypeORM](https://typeorm.io/)**: ORM para trabajar con bases de datos relacionales de forma sencilla y tipada.
- 🐘 **[PostgreSQL](https://www.postgresql.org/)**: Base de datos robusta y potente utilizada para persistencia de datos.
- 🔐 **[JWT](https://jwt.io/)**: Autenticación basada en tokens para proteger rutas y recursos.
- 🔑 **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)**: Utilizado para el hash y validación segura de contraseñas.
- 📧 **[NestMailer](https://github.com/nest-modules/mailer)**: Módulo para el envío de correos electrónicos (avisos, tareas vencidas, recuperación de contraseña, etc).

## ✨ Funcionalidades principales

- 🔐 **Autenticación y Autorización**:
  - Registro y login con JWT.
- 👥 **Gestión de Usuarios**: CRUD de usuarios, asignación de roles, recuperación de contraseña.
- 🗂️ **Gestión de Proyectos**: Crear, editar, eliminar y listar proyectos grupales.
- 📝 **Tareas y Kanban**:
  - Roles dentro de los proyectos: **Creador**, **Moderador**, **Miembro**.
  - Creación, asignación y actualización de tareas.
  - Estados y prioridades.
  - Reportes individuales y grupales.
- 📊 **Reportes**:
  - Tareas cumplidas por usuario.
  - Tareas pendientes por grupo.
  - Reportes automáticos y programados.
- 📧 **Notificaciones por Correo**:
  - Aviso de tareas próximas a vencer o vencidas.
  - Confirmaciones de acciones (registro, recuperación de contraseña).
  - Gestión de PQR vía email.
