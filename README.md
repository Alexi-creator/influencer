- Устанавливаем пакеты: npm i
- Режим разработки: npm run dev, на http://localhost:3000

- Если проект не "заводится" (не устанавливаются пакеты), как вариант переключиться на версию ноды v18.17.0
- Необходимо установить расширение для vs code: `Path Autocomplete` вставлять путь к изображению через @img/имя_изображения
- При добавлении новой иконки в директорию svgicons, нужно перезапустить проект, чтобы она была доступна, так же для более удобной смены цвета иконки ее необходимо подготовить:

`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5V19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"  stroke-linejoin="round"/>
  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"      stroke-linejoin="round"/>
</svg>`

`fill="currentColor" или stroke="currentColor"` !!!

и теперь можно задавать цвет так:

`svg {
  color: rgb(var(--color-primary));
}`

- Деплой:
1) переключиться на ветку мастер
2) влить девелоп ветку
3) запустить npm run github
4) закомитить и вылить

Страницы будут доступны по адресу: https://alexi-creator.github.io/influencer/
