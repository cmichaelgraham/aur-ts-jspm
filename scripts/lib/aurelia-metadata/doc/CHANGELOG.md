### 0.7.1 (2015-07-29)


#### Bug Fixes

* **metadata:** incorrect types and global references ([88dbfb5e](https://github.com/aurelia/metadata/commit/88dbfb5e5925af9b95f8731f3700bd2e3ec034e6), closes [#16](https://github.com/aurelia/metadata/issues/16), [#17](https://github.com/aurelia/metadata/issues/17))


## 0.7.0 (2015-07-01)


#### Bug Fixes

* **all:** address issue with globals and remove unnecessary Reflect.metadata poly ([93cda3b4](https://github.com/aurelia/metadata/commit/93cda3b401e706b837fc398c1fc106e829e936fe))
* **metadata:** mark fake System as such ([c40cfcb8](https://github.com/aurelia/metadata/commit/c40cfcb87c3c788f607d3ff67bf494ca05f5be15))
* **origin:** short-circuit module registry search on origin location success ([889e0ce7](https://github.com/aurelia/metadata/commit/889e0ce753d40b320ca803a5e4b16e4716219707))
* **package:** update aurelia tools and dts generator ([4cba6176](https://github.com/aurelia/metadata/commit/4cba61761b80ad9241a2516c72bee5999abe8986))
* **test:** correct import sources ([fd5b6f06](https://github.com/aurelia/metadata/commit/fd5b6f0696aa8e735fcf59f633e7b7f75924932f))


#### Features

* **build:** d.ts generation and build concat ([e7e24b5b](https://github.com/aurelia/metadata/commit/e7e24b5b0502920c6616219d305134c1e69b4fea))


## 0.6.0 (2015-06-08)


#### Bug Fixes

* **readme:** Now mentions Chrome required to run tests. ([86d9f4c2](https://github.com/aurelia/metadata/commit/86d9f4c29c9a859bb22d981d30707c85761d5a38))


#### Features

* **origin:** search module registry for module id if not found ([4abfc246](https://github.com/aurelia/metadata/commit/4abfc2469da4db3d3a077cb733c75e0c364f7068))


## 0.5.0 (2015-04-30)


#### Bug Fixes

* **origin:** never return null for a origin check ([cc25a5e6](https://github.com/aurelia/metadata/commit/cc25a5e6f8e0336cd5817a3460f1921d83969af8))
* **origin.spec:** incorrect test for empty origin data ([14304d56](https://github.com/aurelia/metadata/commit/14304d562eb78c93264052bd1fe21eb74dd69842))


#### Features

* **all:** metadata is now based on the ES7 proposal ([32ebe967](https://github.com/aurelia/metadata/commit/32ebe9676b89156cda736ecdf106b92002275ffd))


## 0.4.0 (2015-04-09)


#### Bug Fixes

* **ResourceType:** fix load to return Promise ([a43e8d28](https://github.com/aurelia/metadata/commit/a43e8d28b7c85bcff20119de2b0c384a9853a50e))
* **all:** update compiler, fix core-js ref ([b3dd9ea8](https://github.com/aurelia/metadata/commit/b3dd9ea8619f90efbaf9ff2d6617b7d92ad348bb))
* **metadata:**
  * store in private map ([52aed24e](https://github.com/aurelia/metadata/commit/52aed24ec5f7f25477cb8021493232c49d67be8b))
  * fix initializer for _first property ([740eb07c](https://github.com/aurelia/metadata/commit/740eb07c39b883b1d4e08e5dc779ee9e960a4e07))
  * add the locator config back on a configure property ([555612d1](https://github.com/aurelia/metadata/commit/555612d1df56e18c75b2c27bb9c99e0449fefa7e))


#### Features

* **all:** new decorator infrastructure ([72a6226e](https://github.com/aurelia/metadata/commit/72a6226e202c28f538f1f6350a130d0d76e23fa9))
* **metadata:** add firstOrAdd helper ([8ba74b71](https://github.com/aurelia/metadata/commit/8ba74b710f78ddd3f6aa6b059ca54273e91ce960))


### 0.3.4 (2015-03-24)


#### Features

* **metadata:** enable adding custom metadata as first metadata method ([705fd865](https://github.com/aurelia/metadata/commit/705fd8650f8d5e20933582cf4d694062cc2e15de), closes [#7](https://github.com/aurelia/metadata/issues/7))


### 0.3.3 (2015-02-28)


#### Bug Fixes

* **package:** change jspm directories ([2d61d2da](https://github.com/aurelia/metadata/commit/2d61d2dae9b8ce6899afffccd8f93ee0b5de8010))


### 0.3.2 (2015-02-27)


#### Bug Fixes

* **build:** add missing bower bump ([017aad74](https://github.com/aurelia/metadata/commit/017aad746538ae3f65955e370b57f260946ed01b))


### 0.3.1 (2015-01-25)


#### Bug Fixes

* **metadata:** fix safari complaint about variable "locator" ([6e887eac](https://github.com/aurelia/metadata/commit/6e887eac6eb4a7cd74b3b87080c6169d180cfa8e))


## 0.3.0 (2015-01-22)


#### Bug Fixes

* **metadata:**
  * rename configuration helper ([81c73ec1](https://github.com/aurelia/metadata/commit/81c73ec13ceeb6f257d6ae7a6ca91a02ed43ddcf))
  * accidental double wrapping of custom location function ([ac11ead8](https://github.com/aurelia/metadata/commit/ac11ead8cdb031c51bf705ea7775108b6f29ddcb))


#### Features

* **metadata:**
  * enhance dsl for configuring added metadata ([8ba28995](https://github.com/aurelia/metadata/commit/8ba2899578cf1353e16f6e695ce93a538153d6bf))
  * add a "has" helper to MetadataStorage ([362fcc7b](https://github.com/aurelia/metadata/commit/362fcc7bfe4793cc2b2c296b33d21a5a6a9e99f8))
  * new metadata fluent api ([b4c8162f](https://github.com/aurelia/metadata/commit/b4c8162f3428b7aa09db4bd8dd01f6a5505bf7ef))
  * re-implement metadata ([ce0304e2](https://github.com/aurelia/metadata/commit/ce0304e2fdc1f2aa69c3146aa9c42a260d868c0e))
* **origin:**  do not alter target object or function with origin data ([cbb8ac3a](https://github.com/aurelia/metadata/commit/cbb8ac3aeb15873232d76a97d1ba97dd8aa63d91))


### 0.2.4 (2015-01-12)


#### Bug Fixes

* **annotations:** remove bad export ([e307aaa8](https://github.com/aurelia/metadata/commit/e307aaa80260b4c674dd6fb577d92be37c297916))
* **annotations spec:** remove bad import ([d949c42d](https://github.com/aurelia/metadata/commit/d949c42d8129829c5168fcf4b861d9e6231af11f))


### 0.2.3 (2015-01-06)

* Updated package data to ensure proper system.register module format detetion by jspm.

## 0.2.0 (2015-01-06)


#### Features

* **annotations:** enable deep traversal of inheritance hierarchy ([db07e892](https://github.com/aurelia/metadata/commit/db07e8920ea880ca16f3edc18afc0c99d79360fa))
* **build:** update to latest 6to5 and switch to system.register module format ([8d5e644b](https://github.com/aurelia/metadata/commit/8d5e644be29f42f27a0bb2d1e7b0ca63893d1735))


## 0.1.0 (2014-12-11)


#### Bug Fixes

* **annotations:** normalize annotations on the fly ([0c2b6a55](https://github.com/aurelia/metadata/commit/0c2b6a55feb08a6f56605dad245a83ce16172035))

