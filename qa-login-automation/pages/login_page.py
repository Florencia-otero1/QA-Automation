class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://the-internet.herokuapp.com/login"

    def open(self):
        self.driver.get(self.url)

    def login(self, username, password):
        self.driver.find_element("id", "username").send_keys(username)
        self.driver.find_element("id", "password").send_keys(password)
        self.driver.find_element("css selector", "button[type='submit']").click()

    def get_flash_message(self):
        return self.driver.find_element("id", "flash").text
