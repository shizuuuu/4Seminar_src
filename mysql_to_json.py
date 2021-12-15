import json
import MySQLdb

config = {
    'host' : '***',
    'user' : '***',
    'passwd' : '***',
    'db' : '***',
    'charset' : 'utf8'
}

cnx = MySQLdb.connect(**config)
cur = cnx.cursor()

def createFile(area):
    cur.execute('SELECT * FROM shop_list WHERE area="{0}"'.format(area))
    rows = cur.fetchall()
    if rows:
        dct = {i:{'id':x[0],'name':x[1],'lat':x[2],'lng':x[3],'price':x[4],'shop':x[5],'url':x[6]} for i,x in enumerate(rows)}
        with open('shop_list/{0}_data.js'.format(area),'w',encoding='utf-8') as f:
            f.write('{0}_data = '.format(area))
            json.dump(dct, f, indent=4, ensure_ascii=False)

val = input()
createFile(val)

cnx.commit()
cnx.close()