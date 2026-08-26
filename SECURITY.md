# Security Policy

## Credential handling

- Pangolinfo API keys are accepted only through Zapier authentication fields.
- Keys are sent only in the HTTPS `Authorization` header to `scrapeapi.pangolinfo.com` or `mcp.pangolinfo.com`.
- No action accepts a caller-controlled host or API path.
- Errors are sanitized before they reach users and do not include response bodies or credentials.
- The repository contains no production or test API key.

## Reporting

Please report security issues privately to `csm@pangolinfo.com`. Do not open a public issue with credentials, request bodies containing private data, or unredacted Zap history.
