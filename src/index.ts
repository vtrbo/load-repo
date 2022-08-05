import type { Options } from 'git-clone'
import gitClone from 'git-clone'
import rimraf from 'rimraf'
import { ensureSuffix } from '@vtrbo/utils/string'
import type { IOptions, IRepo } from './types'

export function loadRepo(repo: string): void
export function loadRepo(repo: string, path?: string): void
export function loadRepo(repo: string, path?: string, options?: IOptions): void
export function loadRepo(repo: string, path?: string, callback?: (error?: Error) => void): void
export function loadRepo(repo: string, path?: string, options?: IOptions, callback?: (error?: Error) => void): void

/**
 * @description 下载 git repo
 *
 * @param { string } repo
 * @param { string } path?
 * @param { IOptions } options?
 * @param { (error?: Error) => void } callback
 */
export function loadRepo(repo: string, path?: string, options?: IOptions | ((error?: Error) => void), callback?: (error?: Error) => void): void {
  const tPath = ensureSuffix('/', path || process.cwd())
  const tOptions: IOptions = options && typeof options !== 'function' ? (options as IOptions) : {}
  const tCallback: (error?: Error) => void = options && typeof options === 'function' ? (options as (error?: Error) => void) : callback || (() => {})

  const repoParams = formatRepoParams(repo)

  const args: string[] = []
  tOptions.depth && args.push('--depth', tOptions.depth)
  repoParams.branch && args.push('--branch', repoParams.branch)

  gitClone(
    repoParams.url,
    tPath,
    { args } as Options,
    (error?: Error) => {
      if (!error) {
        !tOptions.clone && rimraf.sync(`${tPath}.git`)
        tCallback()
      }
      else {
        rimraf.sync(tPath)
        tCallback(error)
      }
    })
}

/**
 * @description 格式化 repo
 *
 * @param { string } repo
 * @returns { IRepo }
 */
function formatRepoParams(repo: string): IRepo {
  const regex = /^(?:(github|gitee|gitlab|bitbucket):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/
  const match = regex.exec(repo) || []
  const [,type, origin, owner, name, branch] = match
  const strategy: {
    [key: string]: string
  } = {
    github: 'github.com',
    gitee: 'gitee.com',
    gitlab: 'gitlab.com',
    bitbucket: 'bitbucket.org',
  }
  return {
    url: `git@${strategy[origin || 'github']}:${owner}/${name}.git`,
    type: type || 'github',
    origin: strategy[origin || 'github'],
    owner,
    name,
    branch,
  }
}
