[H: apiLink=macro.args]
[H: path="path=rawdata"]
[H: action="action=read"]
[H: flip="flip=true"]
[H: response=REST.get(apiLink+"?"+path+"&"+action+"&"+flip), 0]
[H: data=json.get(response, "data")]
[H: macro.return=data]