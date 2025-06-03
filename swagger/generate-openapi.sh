#!/bin/bash

# Configuration
OUTPUT_JSON="swagger/swagger.json"
OUTPUT_YAML="swagger/openapi.yml"
ENTRY_JS="swagger/generateSwagger.js"
echo "➡ Generating Swagger JSON..."
node $ENTRY_JS


if [ $? -ne 0 ]; then
  echo "❌ Failed to generate Swagger JSON"
  exit 1
fi

echo "✅ Swagger JSON generated: $OUTPUT_JSON"

echo "➡ Converting JSON to OpenAPI YAML..."
swagger-cli validate $OUTPUT_JSON
swagger-cli bundle $OUTPUT_JSON --outfile $OUTPUT_YAML --type yaml

if [ $? -eq 0 ]; then
  echo "✅ OpenAPI YAML generated: $OUTPUT_YAML"
else
  echo "❌ Failed to generate YAML"
  exit 1
fi
