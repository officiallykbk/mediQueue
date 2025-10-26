from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173")
    page.get_by_placeholder("Describe your symptoms... (e.g., fever and cough)").fill("i've been having hand tremors since i was a child")
    page.get_by_role("button", name="Find Hospital").click()
    page.wait_for_selector("text=Here's what we recommend")
    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
