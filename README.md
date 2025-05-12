# 🐾 Catálogo de Razas – Prueba Técnica Angular

Proyecto elaborado para la prueba técnica.
Permite listar razas de perros consumiendo **The Dog API**, filtrarlas, marcarlas como favoritas y ver estas últimas en una sección aparte, todo con Angular (stand-alone), Angular Material.



## ✨ Funcionalidades

| Módulo           | Descripción                                                                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Breeds**       | • Tabla paginada, ordenable y con filtros por nombre/origen<br>• Imágenes cargadas dinámicamente desde la CDN de The Dog API<br>• Marcado/Des-marcado de favoritos (❤) persistente en `localStorage` |
| **Favorites**    | Vista exclusiva que muestra únicamente las razas marcadas; permite quitarlas desde allí                                                                                                              |
| **UX**           | Tema claro “bone-white”, inputs con *ring* azul, tabla con hover y tarjetas responsivas en móvil                                                                                                     |
| **Arquitectura** | Angular 17 stand-alone + `provideRouter`, `provideHttpClient`, lazy-loading y servicios aislados                                                                                                     |
| **Pruebas**      | Unitarias para `BreedService`, `ApiKeyInterceptor` y `FavoritesService` (Karma + Jasmine)                                                                                                            |

---

## 🗂️ Estructura de carpetas

```
src/
 ├─ app/
 │   ├─ core/            ← modelos, servicios genéricos, interceptores
 │   ├─ features/
 │   │   └─ breeds/
 │   │       ├─ pages/
 │   │       │   ├─ breed-list/
 │   │       │   └─ favorites/
 │   │       └─ breeds.module.ts   (lazy)
 │   ├─ app.routes.ts
 │   └─ app.component.{ts,html,css}
 ├─ assets/
 └─ environments/
```

---

## 🏗️ Requisitos previos

| Software    | Versión mínima |
| ----------- | -------------- |
| Node.js     | **18 LTS**     |
| npm         | 9.x            |
| Angular CLI | `@17`          |

---

## 🚀 Instalación y ejecución

```bash
# 1· Clona el repo
git clone <tu-fork-o-url> dog-breeds
cd dog-breeds

# 2· Instala dependencias
npm install

# 3· Configura la API-Key (opciones)
#    a) .env.local (para Vite/Angular 17):  NG_APP_API_KEY=xxxxxxxx
#    b) src/environments/environment.ts -> apiKey: 'xxxxxxxx'

# 4· Arranca en modo desarrollo
ng serve -o         # abre http://localhost:4200
```

### Scripts útiles

| Comando                               | Acción                                      |
| ------------------------------------- | ------------------------------------------- |
| `ng test`                             | Ejecuta pruebas unitarias (Karma + Jasmine) |
| `ng lint`                             | Lint con ESLint y typescript-eslint         |
| `ng build --configuration production` | Compila para producción (`dist/`)           |

---

## ⚙️ Variables de entorno

| Variable         | Valor de ejemplo | Descripción                                                                                    |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `NG_APP_API_KEY` | `live_abc123…`   | Token personal de **The Dog API** (gratuito en [https://thedogapi.com](https://thedogapi.com)) |

---

## 🧩 Puntos clave de la implementación

1. **Stand-alone bootstrap**

   ```ts
   bootstrapApplication(AppComponent, {
     providers: [
       provideRouter(routes),
       provideHttpClient(withInterceptorsFromDi()),
       provideAnimations()
     ]
   });
   ```

2. **Interceptor de API-Key** inyecta `x-api-key` en cada request.

3. **Carga de imágenes**
   *Si la raza no trae `image.url`, se construye automáticamente*
   `https://cdn2.thedogapi.com/images/{reference_image_id}.jpg`.

4. **Persistencia favoritos**
   `FavoritesService` guarda un array de IDs en `localStorage`.

5. **Responsive**

   * Desktop: tabla Material.
   * ≤ 768 px: cuadrícula de tarjetas (`.cards`) con hover lift.

---

## 📝 Pendientes / posibles mejoras

* **E2E** con Cypress.
* **Infinite scroll** en lugar de paginador.
* **Dark mode** con `mat.define-dark-theme`.
* Guardar favoritos en Firestore para sincronizar entre dispositivos.

---

## 📄 Licencia

Uso educativo / demo. Puedes reutilizar el código citando al autor de la prueba.


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
