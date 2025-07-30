import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
from datetime import datetime

# -------------------------------
# Fixture del driver
# -------------------------------
@pytest.fixture
def driver(request):
    options = Options()
    #options.add_argument("--headless")  # quitá esto si querés ver el navegador
    options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(5)

    # Agregamos el driver al objeto request para usarlo después
    request.node.driver = driver

    yield driver
    driver.quit()

# -------------------------------
# Hook para capturas en caso de error
# -------------------------------
@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()

    if report.when == "call" and report.failed:
        driver = getattr(item, "driver", None)
        if driver:
            now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
            filename = f"screenshot_{item.name}_{now}.png"
            screenshot_dir = os.path.join(os.getcwd(), "assets")
            os.makedirs(screenshot_dir, exist_ok=True)
            path = os.path.join(screenshot_dir, filename)
            driver.save_screenshot(path)

            # Adjunta la imagen al reporte HTML
            if hasattr(report, "extra"):
                report.extra.append(pytest_html.extras.image(path))
            else:
                report.extra = [pytest_html.extras.image(path)]

# -------------------------------
# Hook para usar pytest-html
# -------------------------------
def pytest_configure(config):
    global pytest_html
    pytest_html = config.pluginmanager.getplugin("html")
