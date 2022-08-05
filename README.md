# load-repo [![npm](https://img.shields.io/npm/v/load-repo?color=a1b858&label=)](https://npmjs.com/package/load-repo)

> You need to make sure `git` is in your path, otherwise you can move on<br>
> This is a library based on [git-clone](https://www.npmjs.com/package/git-clone) development

### Install
```bash
load-repo

npm install load-repo
```

### Api
> `loadRepo(repo: string): void`

> `loadRepo(repo: string, path?: string): void`

> `loadRepo(repo: string, path?: string, options?: IOptions): void`

> `loadRepo(repo: string, path?: string, callback: (error?: Error) => void): void`

> `loadRepo(repo: string, path?: string, options?: IOptions, callback: (error?: Error) => void): void`


<details>
<summary>repo</summary><br>

```ts
// rule: origin:owner/name#branch

const repo = 'github:vtrbo/load-repo#main'
```

</details><br>

<details>
<summary>path</summary><br>

```ts
// default value process.cwd()

const path = '/'
```

</details><br>

<details>
<summary>options</summary><br>

```ts
/**
 * IOptions
 * {
 *   if clone is true, keep .git; otherwise, delete it
 *   clone: boolean
 *
 *   if branch is undefined, Clone the default branch
 *   branch: string
 * }
 */

const options = {
  clone: true,
  branch: 'main'
}
```

</details><br>

<details>
<summary>callback</summary><br>

```ts
// if error exists, it means that the download failed; otherwise, it succeeded

const callback = (error: Error) => {
  if (error)
    console.log('download fail')
  else
    console.log('download success')
}
```

</details><br>

## 开源许可证

[MIT](./LICENSE) License &copy; 2022-PRESENT [Victor Bo](https://github.com/vtrbo)
