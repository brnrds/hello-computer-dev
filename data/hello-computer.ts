import { Offerings } from "@/types/offerings";

export const HELLO_COMPUTER_DATA: Offerings = {
  _meta: {
    version: "1.1",
    PromptVariables: {
      company: "Client Company Ltd",
      industry: "B2B SaaS for finance teams",
      offer: "Spend analytics platform",
      icp: "UK mid-market finance leaders (50–500 employees)",
      brand_tone: "clear, friendly, no jargon",
      stack: ["HubSpot", "Webflow", "Notion", "Zapier", "Airtable", "Google Sheets"],
      kpis: { reply_rate_target: 5, meetings_per_month: 10, cpl_target: 150 },
      deadline: "2025-09-30",
      compliance_notes: "GDPR",
      assets_folder: "https://example.com/assets"
    }
  },
  "AI-Driven Growth Engines": {
    Description:
      "We build full systems to find new customers, start conversations, and help your team close more deals — without hiring a whole marketing department.",
    BuildPrompt:
      "Role: Senior growth-ops AI. Goal: design and ship a repeatable outbound + content engine for {company} in {industry}. Inputs: {offer}, {icp}, {brand_tone}, {stack}, {kpis}, {deadline}, {compliance_notes}. Tasks: ICP research; messaging framework; channel plan (email/LinkedIn/landing pages); asset list; workflow + CRM stages; reporting. Deliverables: strategy doc, 90-day plan, asset backlog, automation diagram, KPI dashboard spec. Success: >= {kpis.reply_rate_target}% reply rate, >= {kpis.meetings_per_month} meetings/mo, CPL <= {kpis.cpl_target}. Ask for missing inputs from {assets_folder}.",
    Services: [
      {
        Name: "Automated outbound (LinkedIn + email cadences)",
        Description:
          "Personalized multi-touch outreach that looks human but scales to hundreds or thousands of prospects.",
        BuildPrompt:
          "Role: Outreach systems AI. Build a compliant outbound program for {company}. Inputs: {icp}, {offer}, {brand_tone}, {stack}. Steps: (1) Define 3 ICP slices + pain/value map; (2) Draft 2x email and 2x LinkedIn cadences (6–8 touches each, 21–28 days); (3) Create list-spec; (4) Warm-up + sending plan; (5) A/B matrix; (6) CRM stages; (7) Logging + UTM. Outputs: sequences, list-spec schema, SOP, QA checklist."
      },
      {
        Name: "Lead magnets + landing pages",
        Description:
          "Useful guides or tools plus simple pages that capture contact details.",
        BuildPrompt:
          "Role: Conversion designer AI. Build 1 lead magnet + 1 landing page for {company}. Inputs: {offer}, {icp}, {brand_tone}. Steps: choose angle; outline; write; LP wireframe; analytics; GDPR; email confirmation. Outputs: PDF draft, LP copy, form schema, thank-you email, tracking plan."
      },
      {
        Name: "Content marketing (LinkedIn + blog)",
        Description:
          "Regular posts and articles that build trust and bring in leads.",
        BuildPrompt:
          "Role: Content strategist AI. Create a 30-day content plan for {company}. Inputs: {offer}, {icp}, {brand_tone}. Steps: content pillars; post formats; editorial calendar; repurposing matrix. Outputs: 30 LinkedIn posts, 4 blog outlines, content guidelines."
      },
      {
        Name: "CRM + automation setup",
        Description:
          "Connect your tools so leads flow smoothly from first contact to closed deal.",
        BuildPrompt:
          "Role: RevOps AI. Design CRM workflows for {company}. Inputs: {stack}, sales process, {compliance_notes}. Steps: stage mapping; automation rules; reporting setup; handoff protocols. Outputs: CRM config, automation flowchart, SOP."
      }
    ],
    "Example Deliverables": [
      { Name: "4-week cold outbound campaign", Description: "Identify ideal customers, craft outreach, launch, and book meetings." },
      { Name: "Reporting dashboard", Description: "Clear view of replies, meetings, and performance." }
    ],
    Packages: {
      Starter: { Price: "£2,500/month", Includes: "1 outbound sequence, 1 lead magnet, 4 posts" },
      Growth: { Price: "£5,000/month", Includes: "2+ sequences, AI inbox, 8 posts, landing page" },
      Custom: { Price: "from £7,500/month", Includes: "Tailored growth engine and integrations" }
    }
  },
  "Creative Engines": {
    Description:
      "Fast, professional brand, web, video, and collateral — AI speeds it up; quality stays high.",
    BuildPrompt:
      "Role: Creative director AI. Goal: define and ship brand + core assets for {company}. Inputs: {brand_tone}, references, competitors, {deadline}. Steps: positioning; visual directions; content guidelines; asset list; production plan. Outputs: brand doc, style tokens, asset backlog, 60-day plan.",
    Services: [
      {
        Name: "Brand strategy + design",
        Description: "Message, logo, colors, and templates that feel like you.",
        BuildPrompt:
          "Role: Brand systems AI. Produce a brand kit. Steps: audience + competitor scan; messaging ladder; logo directions; color + type tokens; layout system; social templates. Outputs: positioning one-pager, style guide JSON + PDF."
      },
      {
        Name: "Website design + build",
        Description: "Modern, mobile-friendly sites that convert visitors into customers.",
        BuildPrompt:
          "Role: Web designer AI. Build a conversion-focused website for {company}. Inputs: {offer}, {icp}, {brand_tone}, competitors. Steps: sitemap; wireframes; copy; visual design; development specs. Outputs: Figma file, copy doc, dev handoff."
      },
      {
        Name: "Video + motion graphics",
        Description: "Explainer videos, demos, and social content that gets your message across.",
        BuildPrompt:
          "Role: Video producer AI. Create video content for {company}. Inputs: {offer}, {brand_tone}, use cases. Steps: script; storyboard; style frames; animation plan; audio. Outputs: script, storyboard, style guide, production timeline."
      },
      {
        Name: "Marketing collateral",
        Description: "Pitch decks, case studies, and sales materials that close deals.",
        BuildPrompt:
          "Role: Marketing designer AI. Create sales collateral for {company}. Inputs: {offer}, {icp}, success stories. Steps: content audit; template design; copy framework; asset library. Outputs: pitch deck template, case study format, brand guidelines."
      }
    ],
    Packages: {
      "Brand Quickstart": { Price: "£3,000–£5,000", Includes: "Workshop + brand assets" },
      "Full Creative Suite": { Price: "£8,000–£15,000", Includes: "Brand + website + collateral" },
      "Ongoing Creative": { Price: "£2,000/month", Includes: "Monthly design support + content" }
    }
  },
  "Technical Integration": {
    Description:
      "We connect your tools and automate repetitive work so data flows and teams move faster.",
    BuildPrompt:
      "Role: Solutions architect AI. Goal: design a reliable automation layer for {company}. Inputs: {stack}, process maps, {compliance_notes}. Steps: app inventory; workflow proposals; risk review; monitoring. Outputs: architecture diagram, runbooks.",
    Services: [
      {
        Name: "AI agent integrations",
        Description: "Embed AI assistants into support, onboarding, or sales.",
        BuildPrompt:
          "Role: Agent engineer AI. Build an agent with tools (search/RAG, CRM, calendar, helpdesk). Steps: guardrails; KB curation; prompt + tools; eval; monitoring/handoff. Outputs: config files, index plan, eval report."
      },
      {
        Name: "Workflow automation",
        Description: "Connect your apps so data flows automatically between systems.",
        BuildPrompt:
          "Role: Automation engineer AI. Design workflows for {company}. Inputs: {stack}, process maps, {compliance_notes}. Steps: trigger mapping; data transformation; error handling; monitoring. Outputs: workflow diagrams, integration specs, testing plan."
      },
      {
        Name: "Data pipelines + reporting",
        Description: "Clean, combine, and visualize data from multiple sources.",
        BuildPrompt:
          "Role: Data engineer AI. Build reporting infrastructure for {company}. Inputs: {stack}, KPIs, data sources. Steps: schema design; ETL pipeline; dashboard mockups; alerting rules. Outputs: data model, pipeline code, dashboard spec."
      },
      {
        Name: "API development",
        Description: "Custom endpoints and integrations for unique business needs.",
        BuildPrompt:
          "Role: API architect AI. Design custom integrations for {company}. Inputs: {stack}, requirements, {compliance_notes}. Steps: endpoint design; authentication; rate limiting; documentation. Outputs: API spec, integration guide, testing suite."
      }
    ],
    Packages: {
      "Integration Starter": { Price: "£3,500–£7,000", Includes: "2-3 tool connections + basic automation" },
      "Full Automation Suite": { Price: "£10,000–£20,000", Includes: "Complete workflow automation + monitoring" },
      "Ongoing Support": { Price: "£1,500/month", Includes: "Maintenance + new integrations" }
    }
  },
  "Other Engagements": {
    Description:
      "Short, focused help to get you moving fast.",
    BuildPrompt:
      "Role: Facilitation AI. Design a short engagement (workshop or audit) that produces clear next steps for {company} within {deadline}.",
    Services: [
      {
        Name: "Workshops",
        Description: "Half-day or full-day sessions to solve a specific problem or train your team.",
        BuildPrompt:
          "Role: Workshop designer AI. Create a 4-hour session with objectives, agenda, exercises, materials, and outcomes."
      },
      {
        Name: "Strategy audits",
        Description: "Quick review of your current approach with specific recommendations.",
        BuildPrompt:
          "Role: Strategy consultant AI. Audit {company}'s current approach. Inputs: {offer}, {stack}, current metrics. Steps: gap analysis; competitive review; opportunity mapping. Outputs: audit report, priority matrix, 90-day roadmap."
      },
      {
        Name: "Technical consulting",
        Description: "Expert advice on architecture, tools, and implementation.",
        BuildPrompt:
          "Role: Technical advisor AI. Provide technical guidance for {company}. Inputs: {stack}, requirements, constraints. Steps: architecture review; tool evaluation; implementation planning. Outputs: technical recommendations, migration plan, risk assessment."
      }
    ]
  }
};
