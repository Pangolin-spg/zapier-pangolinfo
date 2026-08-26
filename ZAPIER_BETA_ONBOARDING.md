# Pangolinfo Zapier Beta Onboarding

## Join the private integration

Request the official private-integration invite URL from the Pangolinfo integration administrator, then open it while signed in to the Zapier account that will run the Beta Zap. The access URL is intentionally kept out of this public repository to avoid uncontrolled enrollment before the Beta cohort is approved.

Accept access to Pangolinfo v1.0.1, then connect a time-limited or test-purpose Pangolinfo API key. Never share a production key with another tester.

## Three useful Beta scenarios

Each tester should build, enable, and successfully run at least one live Zap. Use a weekly schedule during Beta to keep test credit consumption bounded.

### Tester A — Amazon keyword visibility

1. Schedule by Zapier — Every Week.
2. Pangolinfo — Find Amazon Products by Keyword.
3. Set **If multiple search results are found** to **Return all results as line items**.
4. Send the selected fields to the tester's own Google Sheet, Zapier Table, Airtable base, or approved destination.
5. Confirm organic position, Sponsored placement, ASIN, title, price, rating, and stable ID fields are available.

### Tester B — Amazon review complaint feed

1. Schedule by Zapier — Every Week.
2. Pangolinfo — Find Amazon Reviews by ASIN.
3. Choose one- or two-star reviews and **Return all results as line items**.
4. Send the review title, content, rating, author, purchase status, ASIN, and stable ID to the tester's own destination.
5. Confirm an empty search can be handled intentionally instead of treated as a credential failure.

### Tester C — Google AI Overview citation evidence

1. Schedule by Zapier — Every Week.
2. Pangolinfo — Get Google AI Overview.
3. Keep screenshots disabled unless visual evidence is required.
4. Store the query, AI Overview content, cited URLs/domains, result URL, task ID, and timestamp in the tester's own destination.
5. Confirm the Pangolinfo step completes within Zapier's hosted runtime.

## Evidence checklist

- The Zap is enabled, not only tested in the editor.
- Zap History contains at least one successful live run.
- Screenshots redact API keys, personal data, and unrelated account information.
- Record the tester email, Zap URL, scenario, first successful run time, and any error message in the private execution tracker—not in the public repository.
- Delete or rotate temporary credentials when testing is complete.

## Current capability scope

Zapier v1.0.1 includes five hosted-runtime-verified capabilities: Amazon Product Detail, Amazon Keyword Products, Amazon Reviews, Google AI Overview, and Amazon Niche Opportunities. Amazon Alexa is intentionally excluded because its synchronous response can exceed Zapier's 30-second hosted action limit; use the direct Amazon Alexa API, Make, or Apify instead.
