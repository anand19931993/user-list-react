export const dbJson = () => {
    return fetch(`https://fakeapi-assignment.herokuapp.com/userlist`,{
        method:"GET"
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const dbJsonADD = (data) => {
    return fetch(`https://fakeapi-assignment.herokuapp.com/userlist`,{
        method:"post",
        headers:{
            Accept:"application/json",
            "ContentType":"application/json"
        }
        , body:data,
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const getData = (id) => {
    return fetch(`https://fakeapi-assignment.herokuapp.com/userlist/${id}`, {
            method: "get"
        }).then((res)=>{
            return res.json()
        }).catch((err)=>{
            console.log(err)
        })
}

export const editData = (id,data) => {
    return fetch(`https://fakeapi-assignment.herokuapp.com/userlist/${id}`, {
            method: "put",
            headers:{
                Accept:"application/json",
                "content-type":"application/json"
            },body:JSON.stringify({
                "id":id,
                "first_name":data.name,
                "username":data.username,
                "email":data.email
            })
        }).then((res)=>{
            return res.json()
        }).catch((err)=>{
            console.log(err)
        })
}
