#!/bin/bash


# Install mocha-junit-reporter
npm install mocha-junit-reporter

# Install json-schema-faker
npm install json-schema-faker


npx codeceptjs run ./features/PetAPI/Add_Pet.feature --reporter mocha-multi