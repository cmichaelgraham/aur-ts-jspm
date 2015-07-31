### 0.9.1 (2015-07-29)

* improve output file name

## 0.9.0 (2015-07-01)


#### Bug Fixes

* **all:** switch to new metadata abstraction ([05f3bfde](http://github.com/aurelia/dependency-injection/commit/05f3bfde7b032d83df14eb7b23b6292534c91c02))
* **container:**
  * add generics to Map type info ([072262ef](http://github.com/aurelia/dependency-injection/commit/072262ef7ca9656739e9bbda49fd3d75ba6c113c))
  * dry out bad key error message ([58a1036f](http://github.com/aurelia/dependency-injection/commit/58a1036f5e52eadfc1b3bd65a22ebaebf94d715c))
  * Improve error message on bad key for DI ([6495ad3b](http://github.com/aurelia/dependency-injection/commit/6495ad3b84938ea66749e07f8c271b87e0a53074), closes [#36](http://github.com/aurelia/dependency-injection/issues/36))
* **package:** update aurelia tools and dts generator ([83c1e2cb](http://github.com/aurelia/dependency-injection/commit/83c1e2cb096ce8f6802d78419a5e9f0afb895776))


#### Features

* **container:**
  * enable the invoke helper to take additional deps ([eec36d2a](http://github.com/aurelia/dependency-injection/commit/eec36d2a69e3ca35eef4798d91e66192dcb103d6))
  * turn a container instance into a globally reachable singleton instance ([3c02164b](http://github.com/aurelia/dependency-injection/commit/3c02164bdb04c2e0b9f3927f20cec453e67e6833))


## 0.8.0 (2015-06-08)


#### Bug Fixes

* **container:** enable autoregister of non-functions ([c40ac432](http://github.com/aurelia/dependency-injection/commit/c40ac432ca6c3d63ccddb6c6c5bcaa2ffa6c5ba9), closes [#31](http://github.com/aurelia/dependency-injection/issues/31))


#### Features

* **container:** improve helpfulness of activation errors ([47aa4871](http://github.com/aurelia/dependency-injection/commit/47aa48711a905101b83452daa5ded82242c186bd))


### 0.7.1 (2015-05-06)


#### Bug Fixes

* **emptyParameters:** import from ./container ([7d4cfc92](http://github.com/aurelia/dependency-injection/commit/7d4cfc929514519138cc1af36661951dd5ff42c8))


## 0.7.0 (2015-04-30)


#### Features

* **all:** update to using the new metadata api ([51bfdd1e](http://github.com/aurelia/dependency-injection/commit/51bfdd1e1042178a301346a263b642e14aa5f394))


#### Breaking Changes

* Removed base classes for registrations and instance
activators since metadata now uses key/value pairs rather than
inheritance.

 ([51bfdd1e](http://github.com/aurelia/dependency-injection/commit/51bfdd1e1042178a301346a263b642e14aa5f394))


## 0.6.0 (2015-04-09)


#### Bug Fixes

* **Container:** remove new in function call ([08cd06fd](http://github.com/aurelia/dependency-injection/commit/08cd06fd6393e8941a2a2a0df012df3a209eedda))
* **all:**
  * update compiler to latest version ([b6a3dd03](http://github.com/aurelia/dependency-injection/commit/b6a3dd034ce3b55a08770b969af2f113803cbd0e))
  * explicit import of core-js and switch to Reflect.construct ([5ebe60be](http://github.com/aurelia/dependency-injection/commit/5ebe60be9170dd8ecf34b19dc9b6e88144dfc13b))
* **container:** remove initialize hack ([5c9fdd09](http://github.com/aurelia/dependency-injection/commit/5c9fdd09dd1d0848da0b24c694c95e20ca82c01c))
* **decorators:** remove unnecessary returns ([150607d1](http://github.com/aurelia/dependency-injection/commit/150607d1cde449b8065440d5ca90b1a0a8e07721))


#### Features

* **all:** add decorator support ([120e61a3](http://github.com/aurelia/dependency-injection/commit/120e61a3aa686cee4a2cb7008a59d3b0eab8fb1c))
* **container:** remove AtScript support ([6ed8891a](http://github.com/aurelia/dependency-injection/commit/6ed8891a3543d800475674343869c2e34e66107f))
* **cotainer:** add InstanceActivator abstraction ([0fc2a317](http://github.com/aurelia/dependency-injection/commit/0fc2a3178183169ebb2c067c142e9cc7b3645e02))


### 0.5.1 (2015-03-27)


#### Bug Fixes

* **container:** better errors for instantiation failures ([8c5e3a64](http://github.com/aurelia/dependency-injection/commit/8c5e3a647bb4354f2c420d37e405792b9cc8601f))


## 0.5.0 (2015-03-24)


#### Bug Fixes

* **container:** factories are explicit ([667a16e4](http://github.com/aurelia/dependency-injection/commit/667a16e4dbd07b75493e0690ac4232d8c0cb508c), closes [#13](http://github.com/aurelia/dependency-injection/issues/13))
* **singleton:** always register in the root container ([186b573e](http://github.com/aurelia/dependency-injection/commit/186b573e0e3d09f57bedf8fd7c37ab862dc2f5d1), closes [#22](http://github.com/aurelia/dependency-injection/issues/22))


#### Features

* **container:**
  * use new logging AggregateError ([6e2548ef](http://github.com/aurelia/dependency-injection/commit/6e2548ef6f6b0e339f53793db1c76dc81ef6650c))
  * add unregister method ([2755688c](http://github.com/aurelia/dependency-injection/commit/2755688ce0a2bd13ef71adcda5ed7fa05092d3b4), closes [#19](http://github.com/aurelia/dependency-injection/issues/19))


### 0.4.5 (2015-02-28)


#### Bug Fixes

* **package:** change jspm directories ([cef0da35](http://github.com/aurelia/dependency-injection/commit/cef0da351e26aa549e45b48dc6cd98e3e6b6fcaa))


### 0.4.4 (2015-02-27)


#### Bug Fixes

* **package:** update dependencies ([25e924ca](http://github.com/aurelia/dependency-injection/commit/25e924caccdfd033657047a22b93428b90363700))


### 0.4.3 (2015-02-18)


#### Bug Fixes

* **build:** add missing bower bump ([39ab3d07](http://github.com/aurelia/dependency-injection/commit/39ab3d07d0c0d893206f61ebfe4f658a66303895))


#### Features

* **metadata:**  singleton metadata can now indicate root container target ([4a99d4f5](http://github.com/aurelia/dependency-injection/commit/4a99d4f5694ddeeba89a63331f1fb651b7df4b8c))


### 0.4.2 (2015-02-03)


#### Bug Fixes

* **util:**
  * fix ridiculously dumb error ([8cfe89f0](http://github.com/aurelia/dependency-injection/commit/8cfe89f0de5d2d6101f5421bf941dc84352bba9d))
  * function name polyfill should minify correctly ([85358c53](http://github.com/aurelia/dependency-injection/commit/85358c5359ddc0a069c4d049fd28d760052cb437))


#### Features

* **container:** consume atscript annotation parameters as arrays ([7303cb36](http://github.com/aurelia/dependency-injection/commit/7303cb36599873ec14fac9dd020b7aafe1e7d756), closes [#15](http://github.com/aurelia/dependency-injection/issues/15))


### 0.4.1 (2015-01-24)


#### Bug Fixes

* **bower:** correct semver range ([3b7670c3](http://github.com/aurelia/dependency-injection/commit/3b7670c3ead8cc1b5e41874029f1e6fef86ed187))


## 0.4.0 (2015-01-22)


#### Bug Fixes

* **all:** switch to metadata api ([19c60ad9](http://github.com/aurelia/dependency-injection/commit/19c60ad976a6bd8216dfbddbe8f7ac12ca1325d2))
* **package:** update dependencies ([247d9ff9](http://github.com/aurelia/dependency-injection/commit/247d9ff925af07488d9ce6337e64e977370ab43a))


#### Features

* **all:** update to fluent metadata and add helpers ([8e3b7576](http://github.com/aurelia/dependency-injection/commit/8e3b7576bd7fda89bec4b2c79154c6a7a296a6aa))
* **container:** enable custom class init before constructor ([33b4cc1c](http://github.com/aurelia/dependency-injection/commit/33b4cc1c48502d5a321aced22111b4f5251f648d))


### 0.3.1 (2015-01-12)

* Update compiled output.


## 0.3.0 (2015-01-12)


#### Bug Fixes

* **container:** remove bogus createTypedChild api ([42b2ae2a](http://github.com/aurelia/dependency-injection/commit/42b2ae2a1507672f95503c0bc9257c755324a520))
* **package:** update Aurelia dependencies ([ccf09589](http://github.com/aurelia/dependency-injection/commit/ccf09589cfdd76ac77df12fad7e4ae6383000f48))


#### Features

* **resolver:** add parent resolver ([f035f1f5](http://github.com/aurelia/dependency-injection/commit/f035f1f5dece5c0316f18500e28ad37bdf9ac066))


### 0.2.1 (2015-01-06)


#### Bug Fixes

* **package:** change doc json media type ([b82feb82](http://github.com/aurelia/dependency-injection/commit/b82feb82f758ddc820039d7e32b1079908706020))


## 0.2.0 (2015-01-06)


#### Bug Fixes

* **container:** discover registration attributes on base classes ([b7af69d1](http://github.com/aurelia/dependency-injection/commit/b7af69d101bad032acaf41e37140e57e52b6c07f))
* **optional:** add Optional annotation to public api ([1d688334](http://github.com/aurelia/dependency-injection/commit/1d688334ac5fe16ec692fe8a4bb09d63a7698632))


#### Features

* **annotations:** add optional resolver ([27a580d3](http://github.com/aurelia/dependency-injection/commit/27a580d38d1ea899fd10ba4dbe80639dda1422e0))
* **build:** update compiler and switch to register module format ([e959d7bb](http://github.com/aurelia/dependency-injection/commit/e959d7bb8f06cdc4bee5ee48afa5bdb62ed79ab3))
* **container:** enable simple registration when key and value are the same ([9f1f502c](http://github.com/aurelia/dependency-injection/commit/9f1f502c9fa67d832b9b28397cbc1e3b5edc7082))
* **package:** switch from es6-shim to core-js ([90a501d4](http://github.com/aurelia/dependency-injection/commit/90a501d42409e50703c869e98ed8431b8ccb54d8))


### 0.1.1 (2014-12-17)


#### Bug Fixes

* **package:** update dependencies to latest ([54a0bda1](http://github.com/aurelia/dependency-injection/commit/54a0bda1a217200c07cbee81193b044038b2b09a))


## 0.1.0 (2014-12-11)


#### Bug Fixes

* **package:** add es6-shim polyfill ([4732acee](http://github.com/aurelia/dependency-injection/commit/4732acee560080be01ea579ac5124e63079e8571))
