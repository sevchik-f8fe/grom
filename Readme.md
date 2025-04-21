# инструкция

**у вас должны быть установлены: git, node.js**

### GIT ПОШАГОВО:

    когда первый раз хочешь установить:
    git clone https://github.com/sevchik-f8fe/grom.git
    git branch ИМЯ_НОВОЙ_ВЕТКИ
    git branch //вывод локальных веток
    git pull main

        ты закончил свою работу и хочешь сохранить это:
        git add .
        git commit -m "описываешь вкратце че сделал"
        git push --set-upstream "название_твой_НОВОЙ_ветки"

    когда снова возвращаещься к работе:
    git checkout main
    git pull
    git branch ИМЯ_НОВОЙ_ВЕТКИ
    git branch //вывод локальных веток
    git pull main

        ты закончил свою работу и хочешь сохранить это:
        git add .
        git commit -m "описываешь вкратце че сделал"
        git push --set-upstream "название_твой_НОВОЙ_ветки"

### ДАЛЕЕ ПО ПРОЕКТУ:

- фотки кидайте в /src/assets
- новые компоненты (что-то повторяющееся например инпуты, какие-то блоки или шапка с подвалом) создаете в /src/components
- новые страницы (авторизация, регистрация, этапы) создаете в /src/pages
- все стили пишем внутри /src/index.css

**делаете всё как у меня в примере и желательно с коментами**

пример:

1. создал инпут и блок, поместил их в /src/components
2. создал глваную страницу, поместил ее в отдельную папку внутри /src/pages
3. импортировал внутри /src/main.jsx эту страницу и создал новый маршрут (как у меня)

_смотри че я сделал и как в HomePage.jsx и main.jsx и потом делай свое_

#### если надо:

норм ии для всего этого: https://devv.ai/ru
документация по реакту: https://ru.legacy.reactjs.org/docs/getting-started.html (рус) и https://react.dev/learn (инглиш (она лучше))

_документация по реакт-роутер-дом: https://reactrouter.com/_
_документация по редуксу: https://redux-toolkit.js.org/introduction/getting-started (тулкит) и https://redux.js.org/introduction/getting-started (редукс)_
