#!/bin/bash

rm -r output 
npx codeceptjs run --steps --grep @file-drop-file-process-result-view  --plugins allure  
allure serve output
