# Инструкция

**У вас должны быть установлены: git, Node.js**

## GIT ПОШАГОВО

Когда первый раз хочешь установить:

```bash
git clone https://github.com/sevchik-f8fe/grom.git
cd grom
git branch ИМЯ_ВАШЕЙ_НОВОЙ_ВЕТКИ
git branch //вывод локальных веток
git pull main
```

Ты закончил свою работу и хочешь сохранить это:

```bash
git add .
git commit -m "описываешь вкратце че сделал"
git remote add origin https://github.com/sevchik-f8fe/grom.git #(пишется один раз)
git push -u origin ИМЯ_ВАШЕЙ_НОВОЙ_ВЕТКИ
```

Когда снова возвращаещься к работе:

```bash
cd grom
git checkout main
git pull
git branch ИМЯ_НОВОЙ_ВЕТКИ
git branch //вывод локальных веток
git pull main
```

Ты закончил свою работу и хочешь сохранить это:

```bash
git add .
git remote add origin https://github.com/sevchik-f8fe/grom.git #(пишется один раз)
git push -u origin ИМЯ_ВАШЕЙ_НОВОЙ_ВЕТКИ
```

Если вы неправильно написали команду, но не нажали Enter, то всю строку можно очистить при помощи комбинации Ctrl + U.

## ДАЛЕЕ ПО ПРОЕКТУ

- _Фотки_ кидайте в **/src/assets**
- _Новые компоненты_ (что-то повторяющееся например инпуты, какие-то блоки или шапка с подвалом) создаете в **/src/components**
- _Новые страницы_ (авторизация, регистрация, этапы) создаете в **/src/pages**
- **Все стили пишем внутри /src/index.css**

**Делаете всё как у меня в примере и желательно с коментами**

**Пример:**

1. Создал инпут и блок, поместил их в /src/components
2. Создал глваную страницу, поместил ее в отдельную папку внутри /src/pages
3. Импортировал внутри /src/main.jsx эту страницу и создал новый маршрут (как у меня)

_Смотри че я сделал и как в HomePage.jsx и main.jsx и потом делай свое_

## Если надо

[Норм ии для всего этого](https://devv.ai/ru)

[Документация по реакту (рус)](https://ru.legacy.reactjs.org/docs/getting-started.html)

[Документация по реакту (инглиш - она лучше)](https://react.dev/learn)

[Документация по реакт-роутер-дом](https://reactrouter.com)

[Документация по редуксу (тулкит)](https://redux-toolkit.js.org/introduction/getting-started)

[Документация по редуксу (редукс)](https://redux.js.org/introduction/getting-started)
