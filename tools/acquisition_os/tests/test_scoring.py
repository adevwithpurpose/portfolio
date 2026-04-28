import unittest

from acquisition_os import Opportunity, score_opportunity, priority_band


class ScoringTests(unittest.TestCase):
    def test_high_intent_budgeted_automation_request_scores_p1(self):
        opportunity = Opportunity(
            source="upwork",
            title_or_excerpt="Need someone ASAP to automate client onboarding. Budget is $2,000 and we want to start this week.",
            signal_type="explicit_hiring",
            offer_match="automation system + internal dashboard",
            author_or_company="Example Co",
            source_url="https://example.com/job",
        )

        scored = score_opportunity(opportunity)

        self.assertGreaterEqual(scored.total_score, 80)
        self.assertEqual(priority_band(scored.total_score), "P1")
        self.assertEqual(scored.suggested_next_action, "draft_response")

    def test_curiosity_without_budget_scores_low_priority(self):
        opportunity = Opportunity(
            source="x",
            title_or_excerpt="Curious what AI tools people are using these days.",
            signal_type="general_discussion",
            offer_match="weak",
            author_or_company="Someone",
            source_url="https://example.com/post",
        )

        scored = score_opportunity(opportunity)

        self.assertLess(scored.total_score, 40)
        self.assertEqual(priority_band(scored.total_score), "ignore")
        self.assertEqual(scored.suggested_next_action, "ignore")

    def test_score_is_capped_at_100(self):
        opportunity = Opportunity(
            source="linkedin",
            title_or_excerpt="Hiring immediately. Need someone ASAP. Budget is $5,000. Looking to start this week. Our CRM and reporting workflow is broken and we need an internal dashboard.",
            signal_type="explicit_hiring",
            offer_match="automation system + internal dashboard + AI assistant + web system",
            author_or_company="Visible Founder Co",
            source_url="https://example.com/post",
        )

        scored = score_opportunity(opportunity)

        self.assertLessEqual(scored.total_score, 100)


if __name__ == "__main__":
    unittest.main()
