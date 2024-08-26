# Input 컴포넌트

Input 컴포넌트는 다양한 형태의 입력을 처리할 수 있는 재사용 가능한 공통 컴포넌트입니다. 텍스트 입력, 선택(드롭다운), 날짜 선택 등의 기능을 제공합니다.

## 기능

- 텍스트 입력 (단일 라인 및 다중 라인)
- 드롭다운 선택
- 날짜 선택
- 아이콘 및 단위 표시 지원
- 에러 및 성공 메시지 표시

## 사용법

```jsx
// 텍스트 입력
<Input
  inputType="text"
  label="이름"
  placeholder="이름을 입력하세요"
  icon={<UserIcon />}
/>

// 드롭다운 선택
<Input
  inputType="select"
  label="카테고리"
  dropdownOptions={[
    { value: 'option1', text: '옵션 1' },
    { value: 'option2', text: '옵션 2' },
  ]}
/>

// 날짜 선택
<Input
  inputType="date"
  label="날짜"
/>
```

## Props

| Prop 이름       | 타입                                       | 설명                                  |
| --------------- | ------------------------------------------ | ------------------------------------- |
| inputType       | 'text' \| 'textarea' \| 'select' \| 'date' | 입력 타입 (기본값: 'text')            |
| label           | string                                     | 입력 필드 라벨                        |
| error           | string                                     | 에러 메시지                           |
| success         | string                                     | 성공 메시지                           |
| icon            | ReactNode                                  | 입력 필드 앞에 표시될 아이콘          |
| unit            | string                                     | 입력 필드 뒤에 표시될 단위            |
| className       | string                                     | 추가 CSS 클래스                       |
| placeholder     | string                                     | 플레이스홀더 텍스트                   |
| dropdownOptions | Array<{ value: string, text?: string }>    | 선택 옵션 (inputType이 'select'일 때) |
| onChange        | function                                   | 값 변경 시 호출될 함수                |
| value           | any                                        | 입력 필드의 값                        |

## 하위 컴포넌트

- InputText: 텍스트 입력을 위한 컴포넌트
- InputSelect: 드롭다운 선택을 위한 컴포넌트
- InputDate: 날짜 선택을 위한 컴포넌트

각 하위 컴포넌트에 대한 자세한 사용법은 해당 컴포넌트의 코드 주석을 참조하세요.

## 스타일링

기본적인 스타일은 컴포넌트에 내장되어 있지만, `className` prop을 통해 추가적인 스타일을 적용할 수 있습니다.

## 주의사항

- inputType에 따라 필요한 props가 다를 수 있으니 주의해서 사용해주세요.
- 날짜 선택 시 `dayjs` 라이브러리를 사용하고 있으므로, 프로젝트에 해당 라이브러리가 설치되어 있어야 합니다.
