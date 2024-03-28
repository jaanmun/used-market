# Next.js 프로젝트2: 중고마켓

### 사용한 핵심 패키지 버전 리스트

```json
// 기본 패키지
"react": "^18"
"next": "14.1.0"

//로그인 관련 패키지
"react-hook-form": "^7.49.3"
"bcryptjs": "^2.4.3" // DB 저장 시 계정 비밀번호 암호화를 위해 사용

// HTTP 통신 패키지
"axios": "^1.6.7"

// 이미지 업로드 처리를 위해 활용한 패키지
"next-cloudinary": "^5.20.0",

// kakao maps
"react-kakao-maps-sdk": "^1.1.26"

// UI / notifications
"react-toastify": "^10.0.5"

// 백엔드 관련 패키지
"prisma": "^5.8.1"

//인증 및 인가를 위해 사용한 Auth 관련 패키지
"next-auth": "^4.24.5"
"@next-auth/prisma-adapter": "^0.4.4-canary.81"
"@prisma/client": "^5.8.1"
```

## 기능 구현 핵심 내용

### `next-auth`

로그인 여부에 따라 특정 페이지 접근 가능하도록 설정하기 위해 `next-auth`의 `middleware` 활용.

## 본 프로젝트를 통해 알게 된 점

### 프레임워크(Framework)별 User Type에 따른 페이지 접근 권한 설정하는 방법

- Angular는 Angular에서 프로젝트 설치와 함께 기본적으로 제공하는 Routing Guard인 `AuthGuard`를 활용하여 접근 제어 처리
  - `auth.guard.ts`라는 이름으로 Guard 파일을 생성하고 로그인 여부에 따른 특정 페이지 접근에 필요한 조건을 걸어줄 수 있다.
  - `canActivate`와 `canDeactivate`, `canActivateChild`, `canLoad` 모듈을 활용하여 작성된다.
  - 위 모듈은 로드되는 시점이 각각 다르고 로드되는 시점에 따라 상황에 맞게 실행된다.
  - `auth.guard.ts` 파일에 `canActivate` 모듈이 활용되어 있다고 가정하고 작성된 `auth.guard.ts` 파일을 `app-routing.module.ts`의 `routes`에 등록된 컴포넌트 중 필요한 컴포넌트에 `canActivate` 속성을 선언하여 import로 불러온 guard를 추가해주면 해당 컴포넌트에 Guard가 적용된다.
- Nextjs는 `next-auth/middleware` 활용하여 접근제어 처리
  - 기본적으로 설치되어있는 패키지가 아니기 때문에 필요한 경우 직접 설치해주어야 한다.

핵심

- `Angular`는 기본적으로 패키지가 설치되어 있다.
  - 앵귤러의 장점이자 단점
  - 장점: 번거롭게 따로 설치해줄 필요가 없다.
  - 단점: 프로젝트 파일 자체가 무거운 편이다.
- `Nextjs`는 필요한 경우 직접 필요한 패키지들을 찾아 설치해주어야 한다.

### `CSR`과 `SSR`에서 각각 유저 세션 데이터 가져오는 방법

CSR에서 유저 세션 데이터 가져오는 방법

1. `next-auth/react`의 `SessionProvider`를 import한 후 root layout.ts 내부 children을 `SessionProvider`로 wrapping한다.
2. 유저 세션 데이터를 가져오려는 컴포넌트에서 `next-auth/react`의 `useSession` hook을 활용해 다음과 같이 선언한다.

   ```tsx
   import { useSession } from 'next-auth/react';

   ...

   const { data: session, status } = useSession();
   ```

SSR에서 유저 세션 데이터 가져오는 방법

1. `next-auth` 패키지를 활용하는 경우 서버 컴포넌트에서 유저 세션 데이터를 가져오려면 `next-auth`의 `getServerSession`을 활용해야 하기 때문에 다음과 같이 import한다.

   ```tsx
   import { getServerSession } from 'next-auth';
   ```

2. import한 후 session 정보를 가져오기 위해 다음과 같이 선언한다.

   ```tsx
   import { authOptions } from '@/pages/api/auth/[...nextauth]';

   ...

   const session = await getServerSession(authOptions);
   ```

3. `getServerSession()` 함수의 첫 번째 인자로 전달된 authOptions는 `[...nextauth].ts` 파일에서 호출하여 가져온다.

### .env 환경변수 설정 시 알아야 할 사항

- 환경변수가 브라우저에 노출되어야 하는 경우 환경변수명 앞에 `NEXT_PUBLIC`을 붙어주어야 한다. 예를 들어 다음과 같다.
  - ```bash
    NEXT_PUBLIC_VARIABLE_NAME="value"
    ```
