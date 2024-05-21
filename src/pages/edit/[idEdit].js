import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditData() {
    const router = useRouter();
    const { idEdit } = router.query;
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                setDataDetail(data.data ? data.data : null);
                console.log(data.data);
            })
            .catch((err) => {
                console.error("Ada eror: ", err);
            });
    }, [idEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const contain = event.target.contain.value;

        fetch(`/api/updateData?id=${idEdit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idEdit,
                title: title,
                contain: contain,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                router.push("/")
            })
            .catch((err) => {
                console.error("Error updating data:", err);
                alert("Error: " + err.message);
            });
    };

    return (
        <>
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail && (
                  <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">title : </label>
                            <input name="title" defaultValue={dataDetail.title}></input>
                        </div>
                        <div>
                            <label htmlFor="contain">contain : </label>
                            <input name="contain" defaultValue={dataDetail.contain}></input>
                        </div>
                        <div>
                            <button type="submit">Update Data</button>
                        </div>
                    </form>
                </div>
            )}

        </>
    );
}
