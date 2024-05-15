import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()
  const [showAllData,setShowAllData] = useState();

  useEffect(() => {
    fetch(`/api/getData`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data)
      setShowAllData(data.data)
    })
    .catch((err) => {
      alert("ERORR")
    })
  }, [])
  return (
   <>
      <p>Halaman depan</p>
      <button onClick={() => {
        router.push(`/add-data`)
      }}>Add Data</button>
      <div>
          {showAllData && showAllData.map((data,index) => {
            return (
              <div key={index}>
                {data.id}
                {data.title}
                <button onClick={() => router.push(`/detail/${data.id}`)}>Detail</button>
              </div>
            )
          })}
      </div>
   </>
  );
}
