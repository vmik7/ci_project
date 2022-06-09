import { Build } from 'api'
import { BuildDetailsState } from 'store/buildDetailsSlice/types'
import { buildList } from 'store/buildsSlice/mock'

export const logSample: string = `
yarn run v1.22.18
warning ../package.json: No license field
$ NODE_PATH=./src jest
 FAIL  src/getPrimeDividors/getPrimeDividors.test.ts
  getPrimeDividors
    ✓ should works with 0 (3 ms)
    ✓ should works with 1 (1 ms)
    ✓ should works with 2 (1 ms)
    ✓ should works with 5 (1 ms)
    ✓ should works with 10
    ✓ should works with 12
    ✕ should works with 588 (5 ms)

  ● getPrimeDividors › should works with 588

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Array [
        2,
        2,
        3,
        7,
    -   17,
    +   7,
      ]

      27 |
      28 |     it('should works with 588', () => {
    > 29 |         expect(getPrimeDividors(588)).toEqual([2, 2, 3, 7, 17]);
         |                                       ^
      30 |     });
      31 | });
      32 |

      at Object.<anonymous> (src/getPrimeDividors/getPrimeDividors.test.ts:29:39)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 6 passed, 7 total
Snapshots:   0 total
Time:        1.376 s, estimated 2 s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
`

export const initialState: BuildDetailsState = {
    data: buildList.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {} as Record<string, Build>),
    logs: buildList.reduce((acc, item) => {
        acc[item.id] = logSample
        return acc
    }, {} as Record<string, string>),

    isLoading: false,
    isLoaded: false,
    loadError: null,

    isLogsLoading: false,
    isLogsLoaded: false,
    loadLogsError: null,

    rebuild: null,

    isRebuilding: false,
    isRebuilded: false,
    rebuildError: null,
}
