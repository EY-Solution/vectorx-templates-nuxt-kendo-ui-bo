# vectorx-templates-nuxt-kendo-ui-bo
VectorX 프로젝트의 Kendo UI Back Office 전용 템플릿 

아래의 명령어를 실행하여 로컬 개발 서버를 구동 (http://localhost:21003/)
```bash
yarn install

yarn dev
```
이 App은 management용 API와 통신을 통해 구동되므로 사전에 Spring App을 설치해야 한다.
- https://github.com/EY-Solution/vectorx-templates-spring-bo

generate 명령어를 사용하여 static 리소스로 빌드
```
yarn generate
```

리소스 빌드 후에는 spring application으로 구동할 수 있다.

