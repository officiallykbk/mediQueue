from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:5173")

        # Wait for the main heading to be visible to ensure the page is loaded
        expect(page.get_by_role("heading", name="HealthSeek")).to_be_visible()

        # Input symptoms and start the search
        page.get_by_placeholder("Describe your symptoms... (e.g., fever and cough)").fill("headache and fever")
        page.get_by_role("button", name="Find Hospital").click()

        # Wait for the loading indicator to appear
        loading_indicator = page.locator(".animate-spin")
        expect(loading_indicator).to_be_visible()

        # Check for the loading text
        expect(page.get_by_text("Finding the best care for you...")).to_be_visible()

        # Take a screenshot of the loading state
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
