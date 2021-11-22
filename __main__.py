from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from datetime import datetime
import re
from scrape import scrape

class RequestHandler(BaseHTTPRequestHandler):
	print(str(datetime.now()) + " Listening on port 8888")

	def do_GET(self):
		self.send_response(200, "ok")
		self.send_header('Access-Control-Allow-Origin', "*")
		self.end_headers()

		if re.search("scrape", self.path):
			return self.wfile.write(
				bytes(
					json.dumps(scrape(re.search("\w+$", self.path)[0])),
					"utf-8"
				)
				)

		filename = self.path.split('/')[-1] + ".json"

		# data = open(filename, encoding="utf-8")
		data = open(filename, encoding="shift_jis")

		if(data):
			self.wfile.write(bytes(data.read(),"utf-8"))
			# self.wfile.write(bytes(data.read(),"shift_jis"))
			print(str(datetime.now()) + " Data loaded " + filename)
			self.wfile.close()
		else:
			return print ("error", "not ok")
			self.wfile.write()
			self.wfile.close()
			return False

	def do_POST(self):
		self.send_response(200)
		self.send_header('Access-Control-Allow-Origin', "*")
		self.end_headers()

		req_body = self.rfile.read(int(self.headers.get('Content-Length'))).decode('utf-8')
		# req_body = self.rfile.read(int(self.headers.get('Content-Length'))).decode('shift_jis')
		filename = self.path.split('/')[-1] + ".json"

		if self.path.split("/")[1] == "save-html":
			print(type(req_body))
			open(self.path.split("/")[2] + ".html", "w").write(req_body)

		elif self.path.split("/")[1] != "save-html":
			print(req_body)
			req_body = json.loads(req_body)

			req_body["colorCode"] = {
				"ブラック": "BK",
				"オフホワイト": "WH",
				"ゴールド": "GO",
				"ローズゴールド": "PK",
				"モカ": "MC",
				"シルバー": "SV",
				"サックスブルー": "SX",
				"ネイビー": "NV",
				"ベージュ": "BG",
				"シェリーベージュ": "CB",
				"スキニーベージュ": "SB",
				"サンドベージュ": "SB",
				"チャコール": "CC",
				"チャコールグレー": "CC",
				"オフ×ブラック": "WB",
				"オフ×ネイビー": "WN",
				"テラコッタ": "TC",
				"ライトグリーン": "LG",
				# "No.1 帆型": "01",
				# "No.2 H型": "02",
				"ミックス": "MX",
				"ネイビーミックス": "MX",
				"ホワイト": "WH",
				"ブラウン": "BR",
				"キャメル": "CA",
				"ドロップ": "DR",
				"グレー": "GL",
				"ピンク": "PK",
				"シャンパン": "CP",
				"リング": "RN",
				"ストレート": "ST",
				"ブルー": "BL",
				"ブルーグレー": "BL",
				"ミント": "MN",
				"トープ": "TP",
				"レッド": "RD",
				"ローズ": "RS",
				"パープル": "PP",
				"カーキ": "KH",
				"サンド": "SD"
			}

			req_body = json.dumps(req_body, indent=2, ensure_ascii=False)

			open(filename, "w+").write(req_body)
			self.rfile.close()

			self.wfile.write(bytes("Data written " + filename,"utf-8"))
			# self.wfile.write(bytes("Data written " + filename,"shift_jis"))
			print(str(datetime.now()) + " Data written " + filename)
			self.wfile.close()



HTTPServer(("localhost", 8888), RequestHandler).serve_forever()