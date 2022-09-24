from flask import  (
    request,
    Flask
)
import requests


# apiをたたく
def fetch_address(key):
    try:
        address = requests.get(
            f'https://msearch.gsi.go.jp/address-search/AddressSearch?q={key}'
        )
    except:
        raise TypeError()
    print(address.json())
    return address.json()


# ルーティング
#================================================

app = Flask(__name__, static_folder='static', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/foo/api')
def data():
    key = request.args.to_dict()['q']
    data = fetch_address(key)
    return data



# HTMLHTMLサーバ起動
app.run(port=5000)
