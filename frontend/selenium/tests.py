#!/usr/bin/env python

import unittest
import re
import time
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait  # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC

class SweTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://www.swetravels.me")

    def test_loads(self):
        self.assertEqual("SWEtravels", self.driver.title)

    def test_nav_home(self):
        self.nav_test('Home')

    def test_nav_about(self):
        self.nav_test('About')

    def test_nav_park(self):
        self.nav_test('Parks')
        self.content_test('Park Code')

    def test_nav_camp(self):
        self.nav_test('Campgrounds')
        self.content_test('Total Sites')

    def test_nav_visi(self):
        self.nav_test('Visitor Centers')
        self.content_test('Directions')

    def test_nav_stat(self):
        self.nav_test('States')
        self.content_test('Abbreviations')

    def nav_test(self, text):
        link = self.driver.find_element_by_link_text(text)
        link.click()
        self.assertEqual("SWEtravels", self.driver.title)

    def content_test(self, exp):
        src = self.driver.page_source
        found = re.search(exp, src)
        self.assertNotEqual(found, None)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main(verbosity=2)

