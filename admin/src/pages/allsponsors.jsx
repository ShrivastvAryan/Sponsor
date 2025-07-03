import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const AllSponsors = () => {

    const[sponsors,setAllSponsors] = useState([]);
    const[isDeleted,setIsDeleted]=useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/allsponsor');
                if (response.ok) {
                    const data = await response.json();
                    setAllSponsors(data);
                } 
                else {
                    console.error("Error in fetching sponsors")
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleRemove=async (id)=>{
        try {
            const response=await fetch ('http://localhost:4000/removesponsor', {
                method:"POST",
                headers: {   
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }

            ,body:JSON.stringify({id:id})
            });
            if(response.ok){
                setIsDeleted(!isDeleted); 
                toast.success("Sponsor removed successfully", {
                position: "top-center",
                autoClose: 5000,
                });
            }
            else{
                console.error("Error in removing sponsor");
            }
        } catch (error) {
            console.error("Error in removing sponsor:", error);
            
        }
  };


    return (
        <>
        <h1 className="text-5xl text-center py-5">All Sponsors</h1>
        <div className="mx-auto w-[90vw] h-auto my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sponsors.map((sponsor, index) => (
                <div key={index} className="w-auto h-fit bg-yellow-500 rounded-2xl shadow-2xl">
                    <div className="h-[60%] w-auto bg-amber-600 p-2">Image</div>
                    <div className="h-[40%] w-auto bg-amber-900 p-2">
                        <p>{sponsor.name || "Name"}</p>
                        <p>{sponsor.number || "Number"}</p>
                        <p>{sponsor.link1 || "Link1"}</p>
                        <p>{sponsor.link2 || "Link2"}</p>
                        <p>{sponsor.link3 || "Link3"}</p>
                        <p>{sponsor.category || "category"}</p>
                        <button onClick={() => handleRemove(sponsor.id)}>Remove</button>
                    </div>
                </div>
            ))}
             
            
            
        </div>
        </>
    )
}

export default AllSponsors;
