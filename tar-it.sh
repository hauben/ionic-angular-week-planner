#!/bin/bash
tar -czvf archive.tar.gz -X ./tar-exclude-list.txt --warning=no-file-changed .