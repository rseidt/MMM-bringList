# mmm-bring-list Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## [1.0.0] - Release

First public release

## [1.0.1] - Bugfix

- Fixed list name comparison
- Fixed interval bug

## [1.0.2] - Added some retry and circuit breakers at some places for stability

- Retry all HTTP calls 3 times (interval 1 second) bevore giving up
