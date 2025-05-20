# Build the project
npm run build

# Backup the original package.json
Copy-Item package.json package.json.bak

# Copy the publish-package.json to package.json
Copy-Item publish-package.json package.json

# Create a tarball
npm pack

# Restore the original package.json
Copy-Item package.json.bak package.json
Remove-Item package.json.bak

Write-Host "Package created successfully!"
