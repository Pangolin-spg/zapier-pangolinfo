# Pangolinfo for Zapier

Official Zapier Platform CLI integration for live Amazon commerce and AI-search intelligence from Pangolinfo.

The integration exposes six useful, read-only operations instead of acting as a thin promotional wrapper:

- Get Amazon Product by ASIN
- Find Amazon Products by Keyword
- Find Amazon Reviews by ASIN
- Get Google AI Overview
- Find Amazon Niche Opportunities
- Ask Amazon Alexa for Shopping

## Product and documentation map

| Zapier capability | Pangolinfo product | Documentation |
|---|---|---|
| Product, keyword and review data | [Amazon Scraper API](https://www.pangolinfo.com/amazon-scraper-api/) | [Amazon API](https://docs.pangolinfo.com/en-api-reference/amazonApi/amazonScrapeAPI) · [Review API](https://docs.pangolinfo.com/en-api-reference/amazonReviewAPI/amazonReviewAPI) |
| Google AI Overview content and citations | [AI Overview SERP API](https://www.pangolinfo.com/ai-overview-serp-api/) | [AI Overview API](https://docs.pangolinfo.com/en-api-reference/aiModeSerpApi/aiModeSerpAPI) |
| Niche demand and competition metrics | [Amazon Niche Data API](https://www.pangolinfo.com/amazon-niche-data-api/) | [Niche Filter API](https://docs.pangolinfo.com/en-api-reference/nicheFilterAPI/nicheFilterAPI) |
| Alexa shopping answers and recommendations | [Amazon Alexa API](https://www.pangolinfo.com/amazon-alexa-api/) | [Amazon Alexa API](https://docs.pangolinfo.com/en-api-reference/amazonAlexaAPI/amazonAlexaAPI) |
| Agent-based access to the wider tool set | [Amazon Data MCP](https://www.pangolinfo.com/amazon-data-mcp/) | [MCP for agents](https://docs.pangolinfo.com/en-help-center/mcp/agents) |

## Authentication

Users enter a Pangolinfo API key. The key is sent only in the HTTPS `Authorization: Bearer` header to fixed Pangolinfo hosts. Connection testing performs a read-only MCP `initialize` request, so it verifies the credential without consuming a product-data request. Create or copy a key in the [Pangolinfo Console](https://tool.pangolinfo.com/).

## Local development

```bash
npm install
npm run check
```

To connect this source tree to Zapier Platform after logging in:

```bash
npx zapier-platform login
npx zapier-platform register "Pangolinfo"
npx zapier-platform push
```

Never commit `.zapierapprc`, API keys, test responses containing customer data, or Zapier deploy credentials.

## Initial Zap templates after Beta approval

1. Track Amazon competitor price and stock in Google Sheets.
2. Send low-star Amazon reviews to Slack for complaint triage.
3. Monitor organic and Sponsored keyword visibility on a schedule.
4. Alert when a brand disappears from Google AI Overview citations.
5. Build a weekly Amazon niche opportunity shortlist.
6. Track Alexa shopping recommendations and follow-up questions.

## Publishing gate

Zapier requires a working integration, successful in-editor tests, complete publishing checks, and at least three users with live Zaps before App Directory submission. A public Beta follows approval; Zap Templates can then produce independent use-case pages.

## Security and support

See [SECURITY.md](SECURITY.md). For product questions, visit [Pangolinfo](https://www.pangolinfo.com/) or email `csm@pangolinfo.com`.

## License

MIT
