import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()
  const [showAllData,setShowAllData] = useState();

  useEffect(() => {
    fetch(`/api/getData`)
    .then((res) => res.json())
    .then((data) => {
      setShowAllData(data.data)
    })
    .catch((err) => {
      alert("ERORR")
    })
  }, [])

  const handleDelete = (id) => {
    fetch(`/api/delData?id=${id}`, {
      method:"DELETE",
    })
    .then((res) => res.json())
    .then(()=>{
      router.reload()  
    })
    .catch((err) => {
      alert("Erorr ",err.message)
    })
  }
  return (
   <>
      <h2>Aplikasi Pencatatan</h2>
      <button onClick={() => {
        router.push(`/add-data`)
      }}>Add Data</button>
      <div>
          {showAllData && showAllData.map((data,index) => {
            return (
              <div key={index} style={{ margin:"15px 0" }}>
                {data.id}
                {". "}
                {data.title}
                {" "}
                <button onClick={() => router.push(`/detail/${data.id}`)}>Detail</button>
                <button onClick={() => router.push(`/edit/${data.id}`)}>Edit</button>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </div>
            )
          })}
      </div>
   </>
  );
}
