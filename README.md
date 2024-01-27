# Next.js 프로젝트2: 중고마켓

### 사용한 핵심 패키지 버전 리스트

기본 패키지

- react: `18`
- next.js: `14.1.0`

백엔드 관련 패키지

- prisma: `5.8.1`

인증 및 인가를 위해 사용한 Auth 관련 패키지

- next-auth: `4.24.5`
- @next-auth/prisma-adapter: `0.4.4-canary.81`
- @prisma/client: `5.8.1`

## 기능 구현 핵심 내용

### next-auth

로그인 여부에 따라 특정 페이지 접근 가능하도록 설정하기 위해 `next-auth`의 `middleware` 활용.
