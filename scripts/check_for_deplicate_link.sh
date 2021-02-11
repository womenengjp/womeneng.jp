#!/usr/bin/env bash
#
# Script for checking duplicate link.
# First, extract the link line that starts with "^- ".
# Next, read the next line one by one and extract the url with regex.
# Lastly, if a duplicate url exists, return an error.
SCRIPT_DIR=$(cd $(dirname $0); pwd)
LINKPATH="${SCRIPT_DIR}/../content/links.md"
REGEX='(http(s?))://[A-Za-z0-9\+&@#/%?=~_|!:,.;\-]+'

grep -E "^\|" "${LINKPATH}" | while read -r line; do
  if [[ $line =~ $REGEX ]]; then
    url="${BASH_REMATCH[0]}"
    count=$(grep -c "$url" "${LINKPATH}")
    if [ "${count}" -gt 1 ]; then
      echo "found duplicate link. ${url}"
      exit 1
    fi
  fi
done
