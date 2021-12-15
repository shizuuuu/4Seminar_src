import json

with open('***.json','r',encoding="utf-8") as f_in, open('***.js','w',encoding='utf-8') as f_out:
    jsn_data = json.load(f_in)
    f_out.write("***_data = ")   
    dct = {}
    lst = []
    for x,y in jsn_data.items():
        dct[x] = y
        if x == 'results':
            tmp = {}
            for i,z in enumerate(y):
                url = {'url':'no{0}.com'.format(i)}
                tmp = {**z,**url}
                lst.append(tmp)
            dct[x] = lst
    json.dump(dct, f_out, indent=4, ensure_ascii=False)
