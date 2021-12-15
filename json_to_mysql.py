import MySQLdb
import json

area = input('area:')

# JSON
with open('***.json'.format(area),'r',encoding="utf-8") as f:
    jsn_data = json.load(f)

# MySQL

# 設定と接続
config = {
    'host' : '***',
    'user' : '***',
    'passwd' : '***',
    'db' : '***',
    'charset' : 'utf8'
}

cnx = MySQLdb.connect(**config)
cursor = cnx.cursor()

# ---------- ● MySQL内で実行するコード ● ----------
# ------json -> DB------
# テーブルの初期化
cursor.execute("DROP TABLE IF EXISTS shop_list")
cursor.execute("""CREATE TABLE shop_list(id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
    lat DOUBLE,
    lng DOUBLE,
    price TINYINT(4),
    shop VARCHAR(10),
    url TEXT,
    area VARCHAR(20),
    PRIMARY KEY (id))
    DEFAULT CHARACTER SET utf8mb4
    ;""")

# データの追加
add_data = ("INSERT INTO {}(name,lat,lng,price,shop,url,area) VALUES (%s,%s,%s,%s,%s,%s,%s)").format("shop_list")

def input_data(x, area):
    try:
        cursor.execute(add_data, (x['name'],x['geometry']['location']['lat'],x['geometry']['location']['lng'],x['price_level'],x['shop'],x['url'],area))
    except KeyError:
        # price_levelが設定されていない場合
        cursor.execute(add_data, (x['name'],x['geometry']['location']['lat'],x['geometry']['location']['lng'],0,x['shop'],x['url'], area))

for x in jsn_data['results']:
    input_data(x, area)

# 重複削除
cursor.execute("DELETE FROM shop_list WHERE id in (SELECT id FROM (SELECT id FROM shop_list GROUP BY name HAVING COUNT(*) >= 2) AS x)")
cursor.execute("SET @n:=0")
cursor.execute("UPDATE shop_list SET id=@n:=@n+1")
# ------json -> DB------

# データの取得、表示
cursor.execute("SELECT * FROM shop_list")
for row in cursor.fetchall():
    print(row)

# ---------- ● MySQL内で実行するコード ● ----------

# 保存
cnx.commit()

# 終了
cnx.close()