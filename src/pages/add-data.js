import { useRouter } from "next/router";
import { useState } from "react"

export default function Handler() {
    const [inputValueTitle,setInputValueTitle] = useState('');
    const [inputValueContain,setInputValueContain] = useState('');
    const router = useRouter()

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`/api/insertData`, {
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                title: inputValueTitle,
                contain: inputValueContain
            })
        })
        .then((res) => res.json())
        .then(() => {
            alert("Data berhasil ditambah")
            router.push("/")
        })
        .catch((err) => {
            console.error("Error saat menambah data", err.message)
            alert("EROR")
        })
    }

    const handleChangeTitle = (event) => {
        setInputValueTitle(event.target.value)
    }

    const handleChangeContain = (event) => {
        setInputValueContain(event.target.value)
    }

    return (
       <>
        <h1>Tambah data</h1>

        <form onSubmit={handleSubmit}>
            <div>title:  <input onChange={handleChangeTitle}></input> </div>
            <div>contain:  <input onChange={handleChangeContain}></input> </div>
            <button type="submit">Add Data</button>
        </form>
       </> 
    )
}