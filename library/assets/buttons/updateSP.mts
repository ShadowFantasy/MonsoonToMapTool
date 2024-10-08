[H: libname = "net.shadow.fantasy.lib.monsoon.sheetapi"]
[H: msURI = data.getData("addon:","net.shadow.fantasy.lib.monsoon.sheetapi", "Mastersheet")]
[H: conditions = json.fromStrProp("selected=1;propertyType=Monsoon PC;")]
[H: tokens = getTokens(",",conditions)]
[H: condition = listCount(tokens) > 0]
[H, IF(condition), CODE:{
    [H: characters=""]
    [H, FOREACH(id, tokens), CODE:{
        [H: GMName = getGMName(id)]
        [H: characters = setStrProp(characters,GMName,id)]
    }]
    [H: QUERY = formatStrProp(characters,"?characters=%list","%key",",")]
    [H: fullResponse = REST.get(msURI+QUERY)]
    [H: selectedData = json.get(fullResponse, "data")]
    [H, FOREACH(data, selectedData), CODE:{
        [H: id = getStrProp(characters, json.get(data, "name"))]
        [H: characters = deleteStrProp(characters, json.get(data, "name"))]
        [H: keys = json.fields(data)]
        [H, FOREACH(key, keys): setProperty(key, json.get(data,key),id)]
    }]
    [H: condition = countStrProp(characters)>0]
    [H, IF(condition): broadcast(formatStrProp(characters, "couldn't update characters:<br> %list","%key:%value","<br>"))]
};{}]