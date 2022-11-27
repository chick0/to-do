# To-Do

**To-Do**는 웹에서 사용하는 간단한 할 일 목록 웹 애플리케이션입니다.

## API

API 서버는 [todo-api](https://github.com/chick0/todo-api) 서버를 사용합니다.

## 클라이언트

클라이언트는 Svelte 프레임워크로 개발되었습니다.

[svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)를 이용해 해시 기반 라우팅을 사용하고 있습니다.

스타일은 자체 제작 스타일입니다. 폰트는 [Pretendard](https://github.com/orioncactus/pretendard)를 사용하고 있습니다. 해당 폰트는 공개중인 폰트와 다르게 영문, 기호, 일부 한글만 포함하고 있습니다. (총 2,927자) 또 브라우저간의 동일한 스타일을 위해 [minireset.css](https://github.com/jgthms/minireset.css)를 사용하고 있습니다.

웹 사이트의 아이콘의 경우에는 [Check Box Icon Tick Mark](https://pixabay.com/images/id-1294836/)를 수정해서 사용하고 있습니다.

모바일 환경의 개선을 위해 PWA를 사용하고 있습니다. 서비스 워커가 캐싱하는 종류는 프리캐시와 런타임 캐시로 분류됩니다. 프리캐시는 웹 사이트에 접속하면 캐싱하는 자주 변하지 않는 정적 컨텐츠 입니다. (아이콘, 폰트, 일부 스타일) 반대로 런타임 캐시는 코드가 수정되거나 빌드할 때마다 변경되는 파일입니다. 캐싱된 파일들은 [캐시 관리자](https://github.com/chick0/to-do/blob/master/public/cache.html)를 이용해 확인 및 삭제할 수 있습니다.

# 설치 및 설정

## 클라이언트

클라이언트의 경우에는 yarn을 이용해 의존성을 설치하고 빌드 할 수 있습니다.

또 [릴리즈](https://github.com/chick0/to-do/releases) 메뉴에서 빌드된 결과물을 에셋에서 다운로드 할 수 있습니다.

# 저작권

사용된 Pretendard 폰트는 [OFL-1.1](https://github.com/orioncactus/pretendard/blob/main/LICENSE)를 따르고 있습니다.

브라우저 간 스타일 통일을 위해 사용하는 minireset.css는 [MIT License](https://github.com/jgthms/minireset.css/blob/master/LICENSE)를 따르고 있습니다.
