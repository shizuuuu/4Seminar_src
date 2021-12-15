import json

with open('shop_list/shinjuku_data_test.json','r',encoding="utf-8") as f_in, open('shop_list/test.js','w',encoding='utf-8') as f_out:
    jsn_shinjuku = json.load(f_in)
    f_out.write("test_data = ")   
    dct = {}
    lst = []
    for x,y in jsn_shinjuku.items():
        dct[x] = y
        if x == 'results':
            tmp = {}
            for i,z in enumerate(y):
                url = {'url':'no{0}.com'.format(i)}
                tmp = {**z,**url}
                lst.append(tmp)
            dct[x] = lst
    json.dump(dct, f_out, indent=4, ensure_ascii=False)