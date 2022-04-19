from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from datetime import datetime
import re
import os
from page_screenshot.shot import screenshot_page
from scrape import scrape


class RequestHandler(BaseHTTPRequestHandler):
    print(str(datetime.now()) + " Serving on port 8888")

    def do_GET(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', "*")
        self.end_headers()

        if re.match(r"/shot", self.path):
            return self.wfile.write(bytes(open(os.path.join(os.path.dirname(__file__), "page_screenshot", "index.html"), "r").read(), "utf-8"))

        if re.search("scrape", self.path):
            return self.wfile.write(
                bytes(
                    json.dumps(scrape(re.search("\w+$", self.path)[0])),
                    "utf-8"
                )
            )

        filename = os.path.join(os.path.dirname(__file__), "data", self.path.split("/")[-1] + ".json")


        # data = open(filename, encoding="utf-8")
        data = open(filename, encoding="shift_jis")

        if data == None: return self.wfile.write(bytes("No data", "utf-8"))

        data_content = data.read()

        self.wfile.write(bytes(data_content, "utf-8"))
        # self.wfile.write(bytes(data.read(),"shift_jis"))
        print(str(datetime.now()) + " Data loaded " + filename)
        self.wfile.close()

    def do_POST(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', "*")
        self.end_headers()

        if re.match(r"/shot", self.path):
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            filename = re.search("filename=\"([^\"]+)\"", str(body))[1]
            print("filename: " + filename, "product_number: " + str(re.search("\w+", filename)))
            product_number = re.search("\w+", filename)[0]
            with open(os.path.join(os.path.dirname(__file__), "page_screenshot", filename), "wb") as f:
                f.write(body)

            screenshot_page(product_number)
            return

        req_body = self.rfile.read(
            int(self.headers.get('Content-Length'))).decode('utf-8')
        # req_body = self.rfile.read(int(self.headers.get('Content-Length'))).decode('shift_jis')

        if not os.path.exists(os.path.join(os.path.dirname(__file__), "data")):
            os.makedirs(os.path.join(os.path.dirname(__file__), "data"))
            
        filename = os.path.join(os.path.dirname(__file__), "data", self.path.split('/')[-1] + ".json")


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

            open(filename, "w").write(req_body)
            self.rfile.close()

            self.wfile.write(bytes("Data written " + filename, "utf-8"))
            # self.wfile.write(bytes("Data written " + filename,"shift_jis"))
            print(str(datetime.now()) + " Data written " + filename)
            self.wfile.close()



HTTPServer(("localhost", 8888), RequestHandler).serve_forever()