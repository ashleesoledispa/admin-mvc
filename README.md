````md id="4b3xtz"
# Event Analytics Manager

Sistema MVC desarrollado con Next.js + TypeScript enfocado en la administración y análisis comparativo de eventos.

## Descripción del Proyecto

Event Analytics Manager es una aplicación web que permite administrar eventos, registrar ventas de entradas y generar análisis comparativos entre eventos históricos y eventos actuales.

El sistema fue desarrollado bajo arquitectura MVC y tiene como objetivo ayudar a organizadores de eventos a evaluar el rendimiento de sus ventas mediante métricas y recomendaciones automáticas basadas en eventos anteriores.

---

# Funcionalidades Principales

## Administración de Eventos
- Creación de eventos
- Registro de:
  - nombre
  - fecha
  - aforo
  - categoría

## Registro de Ventas
- Registro de ventas de entradas
- Asociación de ventas a eventos mediante dropdown dinámico
- Control de ingresos

## Dashboard Analítico
- Comparación automática entre eventos pasados y eventos recientes
- Análisis de rendimiento
- Recomendaciones automáticas según comportamiento de ventas
- Visualización de ingresos y entradas vendidas

---

# Validaciones Back-End

El sistema implementa validaciones en servidor para proteger datos sensibles del core del negocio.

## Validación implementada:
- El sistema no permite registrar ventas que superen el aforo máximo del evento.

Esta validación se realiza directamente en el Back-End antes de guardar información en la base de datos.

---

# Relaciones Entre Tablas

El sistema utiliza relaciones entre entidades mediante Prisma ORM.

## Relación implementada:
- Un evento puede tener múltiples ventas.
- Las ventas se registran seleccionando el evento desde un dropdown dinámico.
- No se permite ingresar manualmente claves foráneas.

---

# Tecnologías Utilizadas

- Next.js
- TypeScript
- Prisma ORM
- SQLite
- TailwindCSS
- React
- Vercel

---

# Arquitectura MVC

El proyecto sigue una estructura basada en el patrón MVC:

## Model
Modelos Prisma:
- Event
- Sale

## View
Interfaces desarrolladas con Next.js y TailwindCSS.

## Controller
API Routes de Next.js encargadas de la lógica de negocio y validaciones.

---

# Instalación Local

## 1. Clonar repositorio

```bash
git clone https://github.com/ashleesoledispa/admin-mvc.git
````

## 2. Instalar dependencias

```bash
npm install
```

## 3. Generar Prisma Client

```bash
npx prisma generate
```

## 4. Ejecutar migraciones

```bash
npx prisma migrate dev
```

## 5. Iniciar servidor

```bash
npm run dev
```

---

# Deploy

Aplicación desplegada en Vercel.

---

# Autor

Proyecto desarrollado por Ashlee Soledispa.

```
```
