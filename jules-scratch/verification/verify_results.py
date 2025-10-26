
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173")

        # Input symptoms and submit
        page.get_by_placeholder("Describe your symptoms...").fill("I have a headache")
        page.get_by_role("button", name="Find Hospital").click()

        # Wait for the results to appear and verify the content
        expect(page.get_by_text("Recommended Department:")).to_be_visible(timeout=10000)
        # Use a more specific locator to avoid ambiguity
        expect(page.get_by_text("Based on your symptoms,")).to_be_visible()

        # Take a screenshot for visual confirmation
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
