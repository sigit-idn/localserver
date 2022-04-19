from io import BytesIO
from lib2to3.pgen2 import driver
import re
import time
import os
from PIL import Image
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.service import Service


# from selenium.webdriver.firefox.service import Service
# from selenium.webdriver.firefox.options import Options

def screenshot_page(product_number):
	files = os.listdir(os.path.dirname(__file__))
	htmls = [f for f in files if f.endswith(
		'.html') and f.startswith(product_number)]
	htmls.insert(0, htmls.pop())

	options = Options()
	options.headless = True
	# service = Service(ChromeDriverManager().install())
	# options.binary_location = r'C:\Users\nobor\AppData\Local\Mozilla Firefox\firefox.exe'
	# service = Service(executable_path=r'C:\Users\nobor\Documents\geckodriver.exe')

	driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
	# driver = webdriver.Firefox(service=service, options=options)
	driver.set_window_size(780, driver.execute_script("return window.innerHeight"))

	div_to_shots = ['#rw-paHead1',
					'.rw-paParts',
					'#rw-paStaff',
					'.rw-paSet',
					'.rw-paCSet',
					'#rw-paHead2',
					'.rw-paStyle',
					'.rw-Setof-2R',
					'.rw-Setof-2L',
					'.rw-Setof-3R',
					'.rw-Setof-3L',
					'.rw-Points_4',
					'.rw-Points_3',
					'#rw-paSpec',
					'.points-flex'
					]

	screenshot_index = 0

	for html in htmls:
		if html.endswith('.html'):
			driver.get(os.path.join(os.path.dirname(__file__), html))

			for selector in div_to_shots:
				if selector == '#rw-paHead1':
					driver.execute_script(
						f"document.querySelector('{selector} p')?.remove();")
			
				if selector == '.rw-paParts':
					driver.execute_script(
						f"if (document.querySelector('{selector} > div')) document.querySelector('{selector} > div').style.marginBottom = 0;")
				

				for element in driver.find_elements(By.CSS_SELECTOR, selector):
					if element.size['width'] <= 0 or element.size['height'] <= 0: continue

					screenshot = element.screenshot_as_png
					screenshot = Image.open(BytesIO(screenshot))
					screenshot_rgb = screenshot.convert('RGB')
					screenshot_rgb.save(os.path.join(os.path.dirname(__file__), ('%s-sp%d.png' % (product_number, screenshot_index))))
					
					screenshot_index += 1
					time.sleep(0.2)

	driver.quit()
	# os.remove('geckodriver.log')