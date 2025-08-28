#!/bin/bash
cd apps/app && npm run check-errors 2>&1 | tee ../../check.log
