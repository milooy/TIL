# 데스크탑 아이콘 감추기

```
defaults write com.apple.finder CreateDesktop -bool false
killall Finder
```

## 다시 보기

```
defaults write com.apple.finder CreateDesktop -bool true
killall Finder
```
