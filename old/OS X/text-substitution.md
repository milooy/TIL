# Text Substitutions in OS X

## 일반 사용법

`System Preferences > Keyboard > Text` 탭에서 사용하려는 단축문을 추가 / 삭제

### 내보내기 / 가져오기

*선택한 항목이 하나일 경우 드래그를 통해 내보내기가 동작하지 않음*

## 저장 파일 위치

`~/Library/Preferences/.GlobalPreferences.plist` 파일에 `NSUserDictionaryReplacementItems` 항목으로 등록

## 터미널 사용법

### 현재 목록 가져오기

```
defaults read -g NSUserDictionaryReplacementItems
```

### 새 항목 등록

```
defaults write -g NSUserDictionaryReplacementItems -array-add '{on=1;replace=foo;with=bar;}'
```

*새 항목 등록 후 시스템 설정 창에서 보이지 않음.*

## 참고

- [How to export and import text substitutions in OS X](http://support.apple.com/en-eg/HT204006)
