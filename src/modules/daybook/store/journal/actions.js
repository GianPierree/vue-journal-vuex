import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {
    const response = await journalApi.get("/entries.json")
    
    if(!response.data){
        commit("setEntries", [])
        return
    }

    const entries = []
    // commit("setEntries", response.data)
    for(let id of Object.keys(response.data)){
        entries.push({
            id,
            ...response.data[id]
        })
    }
    // console.log(entries)
    commit("setEntries", entries)
}

export const updateEntry = async ({commit}, entry) => {
    const data = {
        "date": entry.date,
        "text": entry.text,
        "picture": entry.picture
    }

    const response = await journalApi.put(`/entries/${entry.id}.json`, data)
    console.log(response)
    
    commit("updateEntry", { ...entry })
}

export const createEntry = async ({commit}, entry) => {
    const data = {
        "date": entry.date,
        "text": entry.text,
        "picture": entry.picture
    }

    const response = await journalApi.post("/entries.json", data)
    // console.log(response)

    data.id = response.data.name

    // console.log(data);

    commit("addEntry", { ...data })
    
    return response.data.name
}

export const deleteEntry = async ({ commit }, id) => {
    const res = await journalApi.delete(`/entries/${id}.json`)
    commit("deleteEntry", id)
    return res
}