# Zapier Integration Test Plan

This plan verifies Pangolinfo v1.0.0 in the Zapier editor without storing credentials or private response data in the repository.

## Preconditions

- Use a time-limited Pangolinfo API key in a Zapier connection.
- Name the connection `Pangolinfo 7-day test` or another non-secret label.
- Confirm authentication succeeds through the read-only MCP initialize request.
- Do not enable screenshots unless the scenario explicitly requires visual evidence.
- Delete or rotate the test credential when the testing window ends.

## Action and search tests

| Capability | Safe test input | Required assertions |
|---|---|---|
| Get Amazon Product by ASIN | ASIN `B0DYTF8L2W`, `amz_us`, optional postal code `10041` | HTTP success; stable `id`; non-empty product envelope; no API key in output or logs |
| Find Amazon Products by Keyword | `noise cancelling headphones`, `amz_us`, limit `10` | One or more records; each record has a string `id`; position and Sponsored fields are mappable when returned |
| Find Amazon Reviews by ASIN | ASIN `B0DYTF8L2W`, one page, one-star filter, recent sort, limit `10` | Review records have stable IDs; page count is bounded; ASIN and point cost are retained |
| Get Google AI Overview | `best portable fan`, screenshot disabled | Stable task ID; structured response; AI Overview and citation fields are available when Google returns them |
| Find Amazon Niche Opportunities | US, minimum volume `10000`, maximum top-five brand share `0.4`, page/size `1/10` | Stable niche IDs; demand and competition metrics are mappable; no more than 10 records |

## Error tests

1. Use a deliberately invalid temporary key and confirm authentication fails without exposing the key or response body.
2. Submit an invalid ASIN and confirm the error is understandable and sanitized.
3. Submit review page count `99` and confirm the request is capped at `10`.
4. Submit result limit `200` and confirm output is capped at `100`.
5. Confirm users cannot override either Pangolinfo host or any API path.

## End-to-end live Zaps

At least three users must run live Zaps before App Directory submission. Recommended beta Zaps:

1. Schedule → Find Amazon Products by Keyword → Google Sheets: keyword ranking snapshot.
2. Schedule → Find Amazon Reviews by ASIN → Slack: low-star complaint digest.
3. Schedule → Get Google AI Overview → Google Sheets: brand citation evidence.

Additional validation Zaps:

4. Schedule → Get Amazon Product by ASIN → Filter → Email: price or stock change alert.
5. Schedule → Find Amazon Niche Opportunities → Airtable: weekly shortlist.

## Evidence to retain

- Successful authentication timestamp.
- One successful Zap History run per capability.
- Screenshots with credentials and personal data redacted.
- Monitoring results showing no 401/403/429/5xx pattern.
- Three distinct beta users with at least one enabled live Zap each.

## 2026-08-26 local live verification

- Authentication passed through the MCP `initialize` check.
- All six originally prototyped capability handlers completed against live Pangolinfo endpoints using a time-limited key stored only in the ignored local `.env` file.
- Amazon product detail, keyword product search, Google AI Overview, niche opportunities, and Alexa Shopping returned structured data. The one-star review query completed successfully and returned an empty array for the selected ASIN/filter at test time.
- The niche handler returned 10 records with stable IDs and demand/competition fields. Zapier CLI's interactive result printer emitted `s is not iterable` while rendering that large result, but the same handler passed through `zapier-platform-core` and returned the expected array; this was isolated as a CLI display issue rather than an API or handler failure.
- Alexa Shopping completed locally in approximately 39 seconds but failed in Zapier's hosted editor at the platform's 30-second action limit. It was therefore removed from the public v1.0.1 capability set rather than shipping a timing-sensitive action.
- No credential or full private response was copied into this document, Git, or the status tracker.
- A Zapier-hosted connection was created and Product Detail, Keyword Product Search, Reviews, AI Overview, and Niche Opportunities all passed in the Zap editor. Search scenarios were explicitly configured to return all results as line items.
- Remaining production evidence: create beta-ready end-to-end Zaps and retain redacted Zap History evidence from at least three users.
