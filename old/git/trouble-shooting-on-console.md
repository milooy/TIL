
## rebase 도중 더 이상 confilict 해결 할 것이 없는데 `git add`하라고 할 때.

```bash
$ git rebase --continue
Applying: other-2
No changes - did you forget to use 'git add'?
If there is nothing left to stage, chances are that something else
already introduced the same changes; you might want to skip this patch.

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".
```

- rebase할 change patch와 같은게 이미 있는 경우. (그래서 git이 어떻게 해야할지 잘 모르를 경우)
`--skip`하고 계속 진행하면 된다.
- 그 다음 commit이 다시 충돌이 있다면 다시 멈추고, 아니면 `--continue`를 하면 된다.


## push할 때 마다 암호를 물어본다?

[remote url를 https를 사용하기 때문](https://help.github.com/articles/why-is-git-always-asking-for-my-password, ssh를 사용하거나, 암호를 캐싱하거나.

### ssh사용하기

```bash
  # 이미 클론한건 remote url를  ssh로 바꾸기.
  $ git remote set-url origin git@github.com:user/repo.git
```

- 요걸 따라함 [generating-ssh-keys](https://help.github.com/articles/generating-ssh-keys/)

### 암호 캐싱하기

- [caching-your-github-password-in-git](https://help.github.com/articles/caching-your-github-password-in-git/)



