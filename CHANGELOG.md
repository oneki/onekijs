# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.17.1](https://github.com/oneki/onekijs/compare/v0.15.8...v0.17.1) (2023-07-23)

**Note:** Version bump only for package root





# [0.17.0](https://github.com/oneki/onekijs/compare/v0.15.8...v0.17.0) (2023-07-23)

**Note:** Version bump only for package root





## [0.16.2](https://github.com/oneki/onekijs/compare/v0.16.1...v0.16.2) (2023-07-04)

**Note:** Version bump only for package root

## [0.16.1](https://github.com/oneki/onekijs/compare/v0.16.0...v0.16.1) (2023-06-28)

**Note:** Version bump only for package root

# 0.16.0 (2023-06-23)

### Bug Fixes

- async validations and async set values ([903b52f](https://github.com/oneki/onekijs/commit/903b52f80fb53650cd0ef05e98e7a8e641158203))
- async validator ([a662f6b](https://github.com/oneki/onekijs/commit/a662f6bb42f15bc4649ef6289d6292f79fc19d46))
- correct error code in secure helper ([944368c](https://github.com/oneki/onekijs/commit/944368c9fc1ee23b8907aa30818cf22c736e8860))
- fix package.json in cra-form-basic to reference onekijs ([b31ad89](https://github.com/oneki/onekijs/commit/b31ad891ba1de2afe20c21236fe9247348f339c9))
- fix package.json to reference onekijs ([14cf998](https://github.com/oneki/onekijs/commit/14cf9989839edc1f20005291f7c7d99b361a83c2))
- formService ([#29](https://github.com/oneki/onekijs/issues/29)) ([b493d56](https://github.com/oneki/onekijs/commit/b493d565a76c0c5e52a9df9a597874530ac636cb))
- getting-started ([c6c19d6](https://github.com/oneki/onekijs/commit/c6c19d6fb6c53348a02a160f5eef747d0ee3b35f))
- getting-started example ([44364f6](https://github.com/oneki/onekijs/commit/44364f611b6bbbbed507ab5efe069e6f7cb6e0fe))
- GridController typing ([ec72ae5](https://github.com/oneki/onekijs/commit/ec72ae544326cd7802fb83682f376be3da2a18e8))
- **onekijs-core:** fix binding when injecting a service ([b02ba56](https://github.com/oneki/onekijs/commit/b02ba56e34d5566dd2ff8dc0b96e5503c8c3b199))
- **onekijs-core:** fix crud methods not taking into account mutability of options ([284e3d1](https://github.com/oneki/onekijs/commit/284e3d1b08fb8e0518c12cf14c9f70fb3e21ea91))
- **onekijs-core:** force a payload when calling a saga ([62b9f41](https://github.com/oneki/onekijs/commit/62b9f4117b4ab48b275e4e33ba6a54f9fc72db3f))
- **onekijs-core:** use self instead of this after switching from an arrow function to a normal fct ([08012a0](https://github.com/oneki/onekijs/commit/08012a05da333ad1ccfaa60041aba64b12f6ee5d))
- react dispatch ([e1626b9](https://github.com/oneki/onekijs/commit/e1626b9424a1cd126d192c6c85f1c5ebf83750aa))
- useCollection ([13853b8](https://github.com/oneki/onekijs/commit/13853b83629d85c548727f325ac9a045d5ae8f71))

### Code Refactoring

- **onekijs:** convert project to Typescript ([a47fc98](https://github.com/oneki/onekijs/commit/a47fc9815fbb51271c12505a65cd8b38a1ab04e3))

- refactor!: merge onekijs/cra,onekijs/next and @oneki/xxx into onekijs (#20) ([7af6c32](https://github.com/oneki/onekijs/commit/7af6c322a52ccc9e28800baf699c34c050f05328)), closes [#20](https://github.com/oneki/onekijs/issues/20)

### Features

- add checkbox form grid component ([fd0c336](https://github.com/oneki/onekijs/commit/fd0c336d9135ab8aba9467487f01614cdc3617a0))
- add collection broker to proxy request to several collection at once ([1297a19](https://github.com/oneki/onekijs/commit/1297a1972cc8b715a9bc4a1a2b846314b7cc8b48))
- add onekijs-theme-clarity package ([ec1f556](https://github.com/oneki/onekijs/commit/ec1f556f3c06cd6068f47502f5c505a718050277))
- add pooling capability to useGet ([2ba17fe](https://github.com/oneki/onekijs/commit/2ba17feca2816f417b1643b764840743e82d37e3))
- add typings for theme ([52753cb](https://github.com/oneki/onekijs/commit/52753cbaddbb58d945d7513caff47d50a0ced7b9))
- add useCache and usePoll ([d98aaa7](https://github.com/oneki/onekijs/commit/d98aaa7e0be1017cdaf4f349c85f05eb60a85942))
- create oneki/next and oneki/cra packages ([962d6ed](https://github.com/oneki/onekijs/commit/962d6eddc05a880bb4c70109ef3c3d6741c44938))
- form ([0221bfd](https://github.com/oneki/onekijs/commit/0221bfd3bc22c5cadfa5ac0cd8fbe070cc04cf50))
- **onekijs-core:** support input type="checkbox" ([2bebdbe](https://github.com/oneki/onekijs/commit/2bebdbe94be9d4d32a4294450094347e7b04372d))
- support parameter auth: true in useCollection Fetch options ([d34269e](https://github.com/oneki/onekijs/commit/d34269e112a76d4a5abed6796033531b3e592aae))
- useCache ([82cd464](https://github.com/oneki/onekijs/commit/82cd464b2458a8ed5708c4d97711338b1d50c3e6))
- useForm supports loading initialValues asynchronously ([6c5a67d](https://github.com/oneki/onekijs/commit/6c5a67d44664f6dc26cb09de74df1ecfd384458d))

### BREAKING CHANGES

- the code specific to a CRA app is imported via

* import {xxx} from 'onekijs/cra'
  instead of
* import {xxx} from 'onekijs'

- chore: getting-started next: step01 and step02

- refactor: merge everything in onekijs package

- core: fix wrong import

- core: fix style component dependency

- chore: put next and cra into onekijs

- chore: add getting started next step04

- chore: add getting started next step05

- chore: add getting started next step06

- chore: add getting started next step07

- chore: add getting started next step08

- chore: add getting started next step09

- feat: support filtering and sorting for grid

- chore: add getting started next step10

Co-authored-by: Olivier Franki <olivier.franki@gmail.com>
Co-authored-by: Bruno Franki <bruno.franki@gmail.com>

- **onekijs:** Rename some classes

## [0.15.8](https://github.com/oneki/onekijs/compare/v0.15.7...v0.15.8) (2023-05-02)

**Note:** Version bump only for package root

## [0.15.7](https://github.com/oneki/onekijs/compare/v0.15.6...v0.15.7) (2023-01-10)

**Note:** Version bump only for package root

## [0.15.6](https://github.com/oneki/onekijs/compare/v0.15.5...v0.15.6) (2022-11-27)

**Note:** Version bump only for package root

## [0.15.5](https://github.com/oneki/onekijs/compare/v0.15.4...v0.15.5) (2022-11-17)

**Note:** Version bump only for package root

## [0.15.4](https://github.com/oneki/onekijs/compare/v0.15.3...v0.15.4) (2022-10-02)

**Note:** Version bump only for package root

## [0.15.3](https://github.com/oneki/onekijs/compare/v0.15.1...v0.15.3) (2022-10-02)

### Bug Fixes

- getting-started ([c6c19d6](https://github.com/oneki/onekijs/commit/c6c19d6fb6c53348a02a160f5eef747d0ee3b35f))

## [0.15.2](https://github.com/oneki/onekijs/compare/v0.14.7...v0.15.2) (2022-09-07)

### Bug Fixes

- getting-started ([c6c19d6](https://github.com/oneki/onekijs/commit/c6c19d6fb6c53348a02a160f5eef747d0ee3b35f))

### Features

- add onekijs-theme-clarity package ([ec1f556](https://github.com/oneki/onekijs/commit/ec1f556f3c06cd6068f47502f5c505a718050277))
- useForm supports loading initialValues asynchronously ([6c5a67d](https://github.com/oneki/onekijs/commit/6c5a67d44664f6dc26cb09de74df1ecfd384458d))

## [0.15.1](https://github.com/oneki/onekijs/compare/v0.15.0...v0.15.1) (2022-09-05)

**Note:** Version bump only for package root

# 0.15.0 (2022-09-05)

### Bug Fixes

- async validations and async set values ([903b52f](https://github.com/oneki/onekijs/commit/903b52f80fb53650cd0ef05e98e7a8e641158203))
- async validator ([a662f6b](https://github.com/oneki/onekijs/commit/a662f6bb42f15bc4649ef6289d6292f79fc19d46))
- correct error code in secure helper ([944368c](https://github.com/oneki/onekijs/commit/944368c9fc1ee23b8907aa30818cf22c736e8860))
- fix package.json in cra-form-basic to reference onekijs ([b31ad89](https://github.com/oneki/onekijs/commit/b31ad891ba1de2afe20c21236fe9247348f339c9))
- fix package.json to reference onekijs ([14cf998](https://github.com/oneki/onekijs/commit/14cf9989839edc1f20005291f7c7d99b361a83c2))
- formService ([#29](https://github.com/oneki/onekijs/issues/29)) ([b493d56](https://github.com/oneki/onekijs/commit/b493d565a76c0c5e52a9df9a597874530ac636cb))
- getting-started example ([44364f6](https://github.com/oneki/onekijs/commit/44364f611b6bbbbed507ab5efe069e6f7cb6e0fe))
- GridController typing ([ec72ae5](https://github.com/oneki/onekijs/commit/ec72ae544326cd7802fb83682f376be3da2a18e8))
- **onekijs-core:** fix binding when injecting a service ([b02ba56](https://github.com/oneki/onekijs/commit/b02ba56e34d5566dd2ff8dc0b96e5503c8c3b199))
- **onekijs-core:** fix crud methods not taking into account mutability of options ([284e3d1](https://github.com/oneki/onekijs/commit/284e3d1b08fb8e0518c12cf14c9f70fb3e21ea91))
- **onekijs-core:** force a payload when calling a saga ([62b9f41](https://github.com/oneki/onekijs/commit/62b9f4117b4ab48b275e4e33ba6a54f9fc72db3f))
- **onekijs-core:** use self instead of this after switching from an arrow function to a normal fct ([08012a0](https://github.com/oneki/onekijs/commit/08012a05da333ad1ccfaa60041aba64b12f6ee5d))
- react dispatch ([e1626b9](https://github.com/oneki/onekijs/commit/e1626b9424a1cd126d192c6c85f1c5ebf83750aa))
- useCollection ([13853b8](https://github.com/oneki/onekijs/commit/13853b83629d85c548727f325ac9a045d5ae8f71))

### Code Refactoring

- **onekijs:** convert project to Typescript ([a47fc98](https://github.com/oneki/onekijs/commit/a47fc9815fbb51271c12505a65cd8b38a1ab04e3))

- refactor!: merge onekijs/cra,onekijs/next and @oneki/xxx into onekijs (#20) ([7af6c32](https://github.com/oneki/onekijs/commit/7af6c322a52ccc9e28800baf699c34c050f05328)), closes [#20](https://github.com/oneki/onekijs/issues/20)

### Features

- add checkbox form grid component ([fd0c336](https://github.com/oneki/onekijs/commit/fd0c336d9135ab8aba9467487f01614cdc3617a0))
- add collection broker to proxy request to several collection at once ([1297a19](https://github.com/oneki/onekijs/commit/1297a1972cc8b715a9bc4a1a2b846314b7cc8b48))
- add onekijs-theme-clarity package ([ec1f556](https://github.com/oneki/onekijs/commit/ec1f556f3c06cd6068f47502f5c505a718050277))
- add pooling capability to useGet ([2ba17fe](https://github.com/oneki/onekijs/commit/2ba17feca2816f417b1643b764840743e82d37e3))
- add typings for theme ([52753cb](https://github.com/oneki/onekijs/commit/52753cbaddbb58d945d7513caff47d50a0ced7b9))
- add useCache and usePoll ([d98aaa7](https://github.com/oneki/onekijs/commit/d98aaa7e0be1017cdaf4f349c85f05eb60a85942))
- create oneki/next and oneki/cra packages ([962d6ed](https://github.com/oneki/onekijs/commit/962d6eddc05a880bb4c70109ef3c3d6741c44938))
- form ([0221bfd](https://github.com/oneki/onekijs/commit/0221bfd3bc22c5cadfa5ac0cd8fbe070cc04cf50))
- **onekijs-core:** support input type="checkbox" ([2bebdbe](https://github.com/oneki/onekijs/commit/2bebdbe94be9d4d32a4294450094347e7b04372d))
- support parameter auth: true in useCollection Fetch options ([d34269e](https://github.com/oneki/onekijs/commit/d34269e112a76d4a5abed6796033531b3e592aae))
- useCache ([82cd464](https://github.com/oneki/onekijs/commit/82cd464b2458a8ed5708c4d97711338b1d50c3e6))
- useForm supports loading initialValues asynchronously ([6c5a67d](https://github.com/oneki/onekijs/commit/6c5a67d44664f6dc26cb09de74df1ecfd384458d))

### BREAKING CHANGES

- the code specific to a CRA app is imported via

* import {xxx} from 'onekijs/cra'
  instead of
* import {xxx} from 'onekijs'

- chore: getting-started next: step01 and step02

- refactor: merge everything in onekijs package

- core: fix wrong import

- core: fix style component dependency

- chore: put next and cra into onekijs

- chore: add getting started next step04

- chore: add getting started next step05

- chore: add getting started next step06

- chore: add getting started next step07

- chore: add getting started next step08

- chore: add getting started next step09

- feat: support filtering and sorting for grid

- chore: add getting started next step10

Co-authored-by: Olivier Franki <olivier.franki@gmail.com>
Co-authored-by: Bruno Franki <bruno.franki@gmail.com>

- **onekijs:** Rename some classes

## [0.14.7](https://github.com/oneki/onekijs/compare/v0.14.6...v0.14.7) (2021-10-17)

### Bug Fixes

- async validations and async set values ([903b52f](https://github.com/oneki/onekijs/commit/903b52f80fb53650cd0ef05e98e7a8e641158203))
- formService ([#29](https://github.com/oneki/onekijs/issues/29)) ([b493d56](https://github.com/oneki/onekijs/commit/b493d565a76c0c5e52a9df9a597874530ac636cb))

### Features

- add checkbox form grid component ([fd0c336](https://github.com/oneki/onekijs/commit/fd0c336d9135ab8aba9467487f01614cdc3617a0))
- add typings for theme ([52753cb](https://github.com/oneki/onekijs/commit/52753cbaddbb58d945d7513caff47d50a0ced7b9))

## [0.14.6](https://github.com/oneki/onekijs/compare/v0.14.5...v0.14.6) (2021-10-03)

**Note:** Version bump only for package root

## [0.14.5](https://github.com/oneki/onekijs/compare/v0.14.4...v0.14.5) (2021-10-03)

### Bug Fixes

- async validator ([a662f6b](https://github.com/oneki/onekijs/commit/a662f6bb42f15bc4649ef6289d6292f79fc19d46))

## [0.14.4](https://github.com/oneki/onekijs/compare/v0.14.3...v0.14.4) (2021-08-19)

### Bug Fixes

- react dispatch ([e1626b9](https://github.com/oneki/onekijs/commit/e1626b9424a1cd126d192c6c85f1c5ebf83750aa))

## [0.14.3](https://github.com/oneki/onekijs/compare/v0.14.1...v0.14.3) (2021-08-18)

### Bug Fixes

- useCollection ([13853b8](https://github.com/oneki/onekijs/commit/13853b83629d85c548727f325ac9a045d5ae8f71))

## [0.14.1](https://github.com/oneki/onekijs/compare/v0.14.0...v0.14.1) (2021-08-10)

### Bug Fixes

- GridController typing ([ec72ae5](https://github.com/oneki/onekijs/commit/ec72ae544326cd7802fb83682f376be3da2a18e8))

### Features

- add collection broker to proxy request to several collection at once ([1297a19](https://github.com/oneki/onekijs/commit/1297a1972cc8b715a9bc4a1a2b846314b7cc8b48))

# [0.14.0](https://github.com/oneki/onekijs/compare/v0.13.1...v0.14.0) (2021-08-10)

**Note:** Version bump only for package root

## [0.13.1](https://github.com/oneki/onekijs/compare/v0.13.0...v0.13.1) (2021-08-09)

**Note:** Version bump only for package root

# [0.13.0](https://github.com/oneki/onekijs/compare/v0.12.2...v0.13.0) (2021-08-09)

**Note:** Version bump only for package root

## [0.12.2](https://github.com/oneki/onekijs/compare/v0.12.1...v0.12.2) (2021-08-09)

### Features

- create oneki/next and oneki/cra packages ([962d6ed](https://github.com/oneki/onekijs/commit/962d6eddc05a880bb4c70109ef3c3d6741c44938))

## [0.12.1](https://github.com/oneki/onekijs/compare/v0.12.0...v0.12.1) (2021-08-09)

**Note:** Version bump only for package root

# [0.12.0](https://github.com/oneki/onekijs/compare/v0.11.0...v0.12.0) (2021-08-09)

- refactor!: merge onekijs/cra,onekijs/next and @oneki/xxx into onekijs (#20) ([7af6c32](https://github.com/oneki/onekijs/commit/7af6c322a52ccc9e28800baf699c34c050f05328)), closes [#20](https://github.com/oneki/onekijs/issues/20)

### BREAKING CHANGES

- the code specific to a CRA app is imported via

* import {xxx} from 'onekijs/cra'
  instead of
* import {xxx} from 'onekijs'

- chore: getting-started next: step01 and step02

- refactor: merge everything in onekijs package

- core: fix wrong import

- core: fix style component dependency

- chore: put next and cra into onekijs

- chore: add getting started next step04

- chore: add getting started next step05

- chore: add getting started next step06

- chore: add getting started next step07

- chore: add getting started next step08

- chore: add getting started next step09

- feat: support filtering and sorting for grid

- chore: add getting started next step10

Co-authored-by: Olivier Franki <olivier.franki@gmail.com>
Co-authored-by: Bruno Franki <bruno.franki@gmail.com>

# [0.11.0](https://github.com/oneki/onekijs/compare/v0.10.0...v0.11.0) (2021-07-26)

### Bug Fixes

- getting-started example ([44364f6](https://github.com/oneki/onekijs/commit/44364f611b6bbbbed507ab5efe069e6f7cb6e0fe))

### Features

- add pooling capability to useGet ([2ba17fe](https://github.com/oneki/onekijs/commit/2ba17feca2816f417b1643b764840743e82d37e3))
- add useCache and usePoll ([d98aaa7](https://github.com/oneki/onekijs/commit/d98aaa7e0be1017cdaf4f349c85f05eb60a85942))
- useCache ([82cd464](https://github.com/oneki/onekijs/commit/82cd464b2458a8ed5708c4d97711338b1d50c3e6))

# [0.10.0](https://github.com/oneki/onekijs/compare/v0.9.3...v0.10.0) (2021-06-19)

**Note:** Version bump only for package root

## [0.9.3](https://github.com/oneki/onekijs/compare/v0.9.2...v0.9.3) (2021-05-01)

### Features

- support parameter auth: true in useCollection Fetch options ([d34269e](https://github.com/oneki/onekijs/commit/d34269e112a76d4a5abed6796033531b3e592aae))

## [0.9.2](https://github.com/oneki/onekijs/compare/v0.9.1...v0.9.2) (2021-04-23)

### Bug Fixes

- correct error code in secure helper ([944368c](https://github.com/oneki/onekijs/commit/944368c9fc1ee23b8907aa30818cf22c736e8860))

## [0.9.1](https://github.com/oneki/onekijs/compare/v9.0.1...v0.9.1) (2021-04-19)

**Note:** Version bump only for package root

## [9.0.1](https://github.com/oneki/onekijs/compare/v0.9.0...v9.0.1) (2021-04-19)

**Note:** Version bump only for package root

# [0.9.0](https://github.com/oneki/onekijs/compare/v0.8.8...v0.9.0) (2020-11-21)

**Note:** Version bump only for package root

## [0.8.8](https://github.com/oneki/onekijs/compare/v0.8.7...v0.8.8) (2020-11-11)

**Note:** Version bump only for package root

## [0.8.7](https://github.com/oneki/onekijs/compare/v0.8.6...v0.8.7) (2020-10-13)

**Note:** Version bump only for package root

## [0.8.6](https://github.com/oneki/onekijs/compare/v0.8.5...v0.8.6) (2020-10-13)

**Note:** Version bump only for package root

## [0.8.5](https://github.com/oneki/onekijs/compare/v0.8.4...v0.8.5) (2020-09-26)

**Note:** Version bump only for package root

## [0.8.4](https://github.com/oneki/onekijs/compare/v0.8.3...v0.8.4) (2020-09-23)

**Note:** Version bump only for package root

## [0.8.3](https://github.com/oneki/onekijs/compare/v0.8.1...v0.8.3) (2020-09-23)

**Note:** Version bump only for package root

**Note:** Version bump only for package root

## [0.8.3](https://github.com/oneki/onekijs/compare/v0.8.1...v0.8.3) (2020-09-23)

**Note:** Version bump only for package root

## 0.8.2 (2020-09-02)

### Bug Fixes

- fix package.json in cra-form-basic to reference onekijs ([b31ad89](https://github.com/oneki/onekijs/commit/b31ad891ba1de2afe20c21236fe9247348f339c9))
- fix package.json to reference onekijs ([14cf998](https://github.com/oneki/onekijs/commit/14cf9989839edc1f20005291f7c7d99b361a83c2))
- **onekijs-core:** fix binding when injecting a service ([b02ba56](https://github.com/oneki/onekijs/commit/b02ba56e34d5566dd2ff8dc0b96e5503c8c3b199))
- **onekijs-core:** fix crud methods not taking into account mutability of options ([284e3d1](https://github.com/oneki/onekijs/commit/284e3d1b08fb8e0518c12cf14c9f70fb3e21ea91))
- **onekijs-core:** force a payload when calling a saga ([62b9f41](https://github.com/oneki/onekijs/commit/62b9f4117b4ab48b275e4e33ba6a54f9fc72db3f))
- **onekijs-core:** use self instead of this after switching from an arrow function to a normal fct ([08012a0](https://github.com/oneki/onekijs/commit/08012a05da333ad1ccfaa60041aba64b12f6ee5d))

### Code Refactoring

- **onekijs:** convert project to Typescript ([a47fc98](https://github.com/oneki/onekijs/commit/a47fc9815fbb51271c12505a65cd8b38a1ab04e3))

### Features

- **onekijs-core:** support input type="checkbox" ([2bebdbe](https://github.com/oneki/onekijs/commit/2bebdbe94be9d4d32a4294450094347e7b04372d))
- form ([0221bfd](https://github.com/oneki/onekijs/commit/0221bfd3bc22c5cadfa5ac0cd8fbe070cc04cf50))

### BREAKING CHANGES

- **onekijs:** Rename some classes

## [0.8.1](https://github.com/oneki/onekijs/compare/v0.8.0...v0.8.1) (2020-09-01)

**Note:** Version bump only for package root

# [0.8.0](https://github.com/oneki/onekijs/compare/v0.5.0...v0.8.0) (2020-08-30)

### Bug Fixes

- fix package.json in cra-form-basic to reference onekijs ([b31ad89](https://github.com/oneki/onekijs/commit/b31ad891ba1de2afe20c21236fe9247348f339c9))
- fix package.json to reference onekijs ([14cf998](https://github.com/oneki/onekijs/commit/14cf9989839edc1f20005291f7c7d99b361a83c2))
- **onekijs-core:** fix binding when injecting a service ([b02ba56](https://github.com/oneki/onekijs/commit/b02ba56e34d5566dd2ff8dc0b96e5503c8c3b199))
- **onekijs-core:** fix crud methods not taking into account mutability of options ([284e3d1](https://github.com/oneki/onekijs/commit/284e3d1b08fb8e0518c12cf14c9f70fb3e21ea91))
- **onekijs-core:** force a payload when calling a saga ([62b9f41](https://github.com/oneki/onekijs/commit/62b9f4117b4ab48b275e4e33ba6a54f9fc72db3f))
- **onekijs-core:** use self instead of this after switching from an arrow function to a normal fct ([08012a0](https://github.com/oneki/onekijs/commit/08012a05da333ad1ccfaa60041aba64b12f6ee5d))

### Code Refactoring

- **onekijs:** convert project to Typescript ([a47fc98](https://github.com/oneki/onekijs/commit/a47fc9815fbb51271c12505a65cd8b38a1ab04e3))

### Features

- **onekijs-core:** support input type="checkbox" ([2bebdbe](https://github.com/oneki/onekijs/commit/2bebdbe94be9d4d32a4294450094347e7b04372d))
- form ([0221bfd](https://github.com/oneki/onekijs/commit/0221bfd3bc22c5cadfa5ac0cd8fbe070cc04cf50))

### BREAKING CHANGES

- **onekijs:** Rename some classes

# [0.5.0](https://github.com/oneki/onekijs/compare/v0.4.1...v0.5.0) (2020-06-14)

**Note:** Version bump only for package root
