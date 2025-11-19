📝 README.md Corto
markdown# Fullmetal Alchemist: Brotherhood - Sistema de Gestión Alquímica

Aplicación web full-stack desarrollada en **Go + Next.js + TypeScript** para la gestión de Alquimistas Estatales de Amestris.

Permite registrar alquimistas, gestionar materiales alquímicos, solicitar transmutaciones que se procesan asíncronamente en segundo plano mediante colas (Redis), y mantener un registro completo de auditorías del sistema.

Los supervisores pueden aprobar o rechazar transmutaciones, visualizar estadísticas generales y consultar el historial de operaciones. La autenticación se realiza mediante JWT con tokens válidos por 24 horas.

---

## 🛠️ **Tecnologías**

**Backend:** Go 1.21 + Gorilla Mux + GORM + PostgreSQL + Redis + JWT  
**Frontend:** Next.js 16 + TypeScript + Tailwind CSS + Axios  
**Infraestructura:** Docker + Docker Compose

---

## 🚀 **Instalación y Uso**

### **Requisitos**
- Docker Desktop instalado y corriendo
  
### 1. Clonar el repositorio
-Dirigirse a la opcion de clonar repositorio con el enlace https://github.com/mbarriosare/fullmetal-alchemist
### 2. Codigo a usar
-Se debe usar los comandos "docker compose down" para eliminar cualquier contenedor que este en el equipo
-Luego usar "docker compose up --build para añadir todos los contenedores e ingresar al enlace que arroja para entrar al programa
