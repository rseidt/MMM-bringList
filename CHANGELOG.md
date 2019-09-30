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

## [1.0.3] - Added some more verbose error messeages in the log to help identify failures.

- Log the response if the download of the list master data from the bring api fails
- Log the available lists is the List specified in the config was not found. 

## [1.0.4] - Added config Elements verboseLogging and updateInterval.

- To stop polluting logfiles, the verboseLogging element is added to the configuration object
- To provide more control over the network traffic, the updateInterval can now be configured.  