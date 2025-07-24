import pytest
from pages.login_page import LoginPage

VALID_USER = "tomsmith"
VALID_PASS = "SuperSecretPassword!"

def test_valid_login(driver):
    login = LoginPage(driver)
    login.open()
    login.login(VALID_USER, VALID_PASS)
    #assert "You logged into a secure area!" in login.get_flash_message()
    assert "welcome!" in login.get_flash_message()


def test_invalid_login(driver):
    login = LoginPage(driver)
    login.open()
    login.login("wrong", "wrong")
    assert "Your username is invalid!" in login.get_flash_message()
